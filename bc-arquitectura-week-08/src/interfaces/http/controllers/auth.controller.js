import { RegisterUserUseCase } from '../../../application/use-cases/register-user.use-case.js';
import { LoginUserUseCase } from '../../../application/use-cases/login-user.use-case.js';
import { PasswordService } from '../../../infrastructure/security/password.service.js';
import { TokenService } from '../../../infrastructure/security/token.service.js';
import { InMemoryUserRepository } from '../../../infrastructure/repositories/in-memory-user.repository.js';

// Dependency Injection Bootstrap
const userRepository = new InMemoryUserRepository();
const passwordService = new PasswordService();
const tokenService = new TokenService();

const registerUseCase = new RegisterUserUseCase({ userRepository, passwordService });
const loginUseCase = new LoginUserUseCase({ userRepository, passwordService, tokenService });

export class AuthController {
  async register(req, res, next) {
    try {
      const { email, password, role } = req.body;
      const user = await registerUseCase.execute({ email, password, role });
      res.status(201).json({ data: user });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await loginUseCase.execute({ email, password });
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
