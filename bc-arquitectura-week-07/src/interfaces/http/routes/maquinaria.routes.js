import { Router } from 'express';
import { maquinariaController } from '../controllers/maquinaria.controller.js';

const router = Router();

router.get('/', (req, res, next) => maquinariaController.getAll(req, res, next));
router.get('/:id', (req, res, next) => maquinariaController.getById(req, res, next));
router.post('/', (req, res, next) => maquinariaController.create(req, res, next));
router.delete('/:id', (req, res, next) => maquinariaController.delete(req, res, next));

export default router;
