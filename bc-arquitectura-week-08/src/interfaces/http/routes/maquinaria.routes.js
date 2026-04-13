import { Router } from 'express';
import { maquinariaController } from '../controllers/maquinaria.controller.js';
import { authenticate } from '../middlewares/authenticate.js';
import { authorize } from '../middlewares/authorize.js';

const router = Router();

// Lectura: cualquier usuario autenticado
router.get('/', authenticate, (req, res, next) => maquinariaController.getAll(req, res, next));
router.get('/:id', authenticate, (req, res, next) => maquinariaController.getById(req, res, next));

// Escritura: solo ADMIN u OPERADOR
router.post('/', authenticate, authorize('ADMIN', 'OPERADOR'), (req, res, next) => maquinariaController.create(req, res, next));

export default router;
