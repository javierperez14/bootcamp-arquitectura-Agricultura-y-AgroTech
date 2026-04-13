import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { config } from './config.js';
import authRoutes from './interfaces/http/routes/auth.routes.js';
import maquinariaRoutes from './interfaces/http/routes/maquinaria.routes.js';
import reservaRoutes from './interfaces/http/routes/reserva.routes.js';

// Rate limiters
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiados intentos, intenta en 15 minutos' },
});

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const allowedOrigins = config.allowedOrigins.split(',');

export const createApp = () => {
  const app = express();

  // Headers de seguridad (OWASP A05)
  app.use(helmet());

  // CORS restrictivo
  app.use(cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origen no permitido: ${origin}`));
      }
    },
    credentials: true,
  }));

  // Limitar tamaño del body
  app.use(express.json({ limit: '100kb' }));

  // Health check (sin autenticación, sin rate limit)
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Readiness
  app.get('/ready', async (_req, res) => {
    try {
      const { getPool } = await import('./db/pool.js');
      const pool = getPool();
      if (pool) {
        await pool.query('SELECT 1');
        res.json({ status: 'ready' });
      } else {
        res.status(503).json({ status: 'sin base de datos configurada' });
      }
    } catch {
      res.status(503).json({ status: 'base de datos no disponible' });
    }
  });

  // Rate limit para autenticación
  app.use('/auth', authLimiter, authRoutes);

  // Rate limit general para la API
  app.use('/api', apiLimiter);
  app.use('/api/v1/maquinaria', maquinariaRoutes);
  app.use('/api/v1/reservas', reservaRoutes);

  return app;
};
