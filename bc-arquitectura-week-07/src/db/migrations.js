import { getPool } from "./pool.js";

const migrations = [
  {
    name: "001_create_maquinaria",
    sql: `
      CREATE TABLE IF NOT EXISTS maquinaria (
        id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        nombre     VARCHAR(200) NOT NULL,
        tipo       VARCHAR(50) NOT NULL,
        marca      VARCHAR(100) NOT NULL,
        precio_por_dia NUMERIC(10,2) NOT NULL,
        precio_por_hora NUMERIC(10,2) NOT NULL,
        disponible BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `,
  },
  {
    name: "002_create_reserva",
    sql: `
      CREATE TABLE IF NOT EXISTS reserva (
        id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        maquinaria_id UUID NOT NULL REFERENCES maquinaria(id),
        usuario_id VARCHAR(50) NOT NULL,
        estado     VARCHAR(50) NOT NULL DEFAULT 'PENDIENTE',
        fecha_inicio TIMESTAMPTZ NOT NULL,
        fecha_fin TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `,
  }
];

const runMigrations = async () => {
  const pool = getPool();
  if (!pool) {
    console.log("⚠️  Sin base de datos configurada, saltando migraciones");
    return;
  }

  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS _migrations (
        name       VARCHAR(100) PRIMARY KEY,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    for (const migration of migrations) {
      const { rows } = await client.query(
        "SELECT name FROM _migrations WHERE name = $1",
        [migration.name],
      );

      if (rows.length === 0) {
        await client.query(migration.sql);
        await client.query("INSERT INTO _migrations (name) VALUES ($1)", [
          migration.name,
        ]);
        console.log(`✅ Migración aplicada: ${migration.name}`);
      } else {
        console.log(`⏭️  Migración ya aplicada: ${migration.name}`);
      }
    }

    console.log("🗄️  Migraciones completadas");
  } finally {
    client.release();
  }
};

runMigrations()
  .then(() => {
    console.log("✅ Script de migración finalizado");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Error en migraciones:", err);
    process.exit(1);
  });
