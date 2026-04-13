import express from 'express';
import maquinariaRoutes from './routes/maquinaria.routes.js';
import reservaRoutes from './routes/reserva.routes.js';
import { errorHandler } from './middleware/error-handler.js';
import { setupSwagger } from './swagger.js';

// Importar patrones Observer
import { globalEventBus } from './patterns/observer/EventBus.js';
import { EmailObserver } from './patterns/observer/EmailObserver.js';
import { AuditObserver } from './patterns/observer/AuditObserver.js';

// Suscribir los Observers
const emailObserver = new EmailObserver();
const auditObserver = new AuditObserver();

globalEventBus.on('RESERVA_CREATED', emailObserver);
globalEventBus.on('RESERVA_CREATED', auditObserver);
globalEventBus.on('RESERVA_STATUS_CHANGED', auditObserver);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    message: '🌾 Bienvenido a AgroTech API',
    version: '1.0.0',
    documentation: '/api-docs',
    endpoints: {
      maquinaria: '/api/v1/maquinaria',
      reservas: '/api/v1/reservas'
    }
  });
});

// Rutas de la API
app.use('/api/v1/maquinaria', maquinariaRoutes);
app.use('/api/v1/reservas', reservaRoutes);

// Configurar Swagger
setupSwagger(app);

// Manejador de errores (debe ir al final)
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📖 API Base: http://localhost:${PORT}/api/v1`);
  console.log(`📚 Documentación: http://localhost:${PORT}/api-docs`);
});
