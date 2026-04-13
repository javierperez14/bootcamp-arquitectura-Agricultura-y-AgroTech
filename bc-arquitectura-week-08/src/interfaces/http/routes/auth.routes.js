import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.js';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  role: z.enum(['ADMIN', 'OPERADOR', 'CLIENTE']).default('OPERADOR'),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const router = Router();

router.post('/register', validate(registerSchema), (req, res, next) => authController.register(req, res, next));
router.post('/login', validate(loginSchema), (req, res, next) => authController.login(req, res, next));

export default router;
