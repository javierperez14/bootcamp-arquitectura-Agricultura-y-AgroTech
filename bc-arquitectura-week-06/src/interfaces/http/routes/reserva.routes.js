import { Router } from 'express';
import { reservaController } from '../controllers/reserva.controller.js';

const router = Router();

router.get('/', (req, res, next) => reservaController.getAll(req, res, next));
router.get('/:id', (req, res, next) => reservaController.getById(req, res, next));
router.post('/', (req, res, next) => reservaController.create(req, res, next));
router.patch('/:id', (req, res, next) => reservaController.updateEstado(req, res, next));

export default router;
