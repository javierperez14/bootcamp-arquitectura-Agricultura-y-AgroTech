import { randomUUID } from 'crypto';

export class InMemoryUserRepository {
  constructor() {
    this.data = new Map();
  }

  async save({ email, passwordHash, role }) {
    const id = randomUUID();
    const user = { id, email, passwordHash, role };
    this.data.set(email, user);
    return user;
  }

  async findByEmail(email) {
    return this.data.get(email) || null;
  }

  async findById(id) {
    return Array.from(this.data.values()).find(u => u.id === id) || null;
  }
}
