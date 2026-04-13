export class RegisterUserUseCase {
  #userRepository;
  #passwordService;

  constructor({ userRepository, passwordService }) {
    this.#userRepository = userRepository;
    this.#passwordService = passwordService;
  }

  async execute({ email, password, role = 'OPERADOR' }) {
    const existing = await this.#userRepository.findByEmail(email);
    if (existing) throw new Error('Email ya registrado');

    const passwordHash = await this.#passwordService.hash(password);
    const user = await this.#userRepository.save({ email, passwordHash, role });

    return { id: user.id, email: user.email, role: user.role };
  }
}
