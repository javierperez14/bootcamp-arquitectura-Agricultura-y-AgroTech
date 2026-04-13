import express from 'express';
// Note: en week-07 la API asume rutas del sistema
import maquinariaRoutes from './interfaces/http/routes/maquinaria.routes.js';
import reservaRoutes from './interfaces/http/routes/reserva.routes.js';

export const createApp = () => {
  const app = express();
  app.use(express.json({ limit: "100kb" }));

  // Health check
  app.get("/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Readiness
  app.get("/ready", async (_req, res) => {
    try {
      const { getPool } = await import("./db/pool.js");
      const pool = getPool();
      if (pool) {
        await pool.query("SELECT 1");
        res.json({ status: "ready" });
      } else {
        res.status(503).json({ status: "sin base de datos configurada" });
      }
    } catch {
      res.status(503).json({ status: "base de datos no disponible" });
    }
  });

  app.use("/api/v1/maquinaria", maquinariaRoutes);
  app.use("/api/v1/reservas", reservaRoutes);

  return app;
};
