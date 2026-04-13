import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { authorize } from '../middlewares/authorize.js';

const router = Router();

// Placeholder — las reservas requieren autenticación
router.get('/', authenticate, (req, res) => res.json({ data: [] }));
router.post('/', authenticate, authorize('ADMIN', 'OPERADOR', 'CLIENTE'), (req, res) => {
  res.status(201).json({ message: 'Reserva creada' });
});

export default router;
