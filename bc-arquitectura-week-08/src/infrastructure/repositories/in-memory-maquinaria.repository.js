import { MaquinariaRepositoryPort } from "../../domain/ports/secondary/maquinaria.repository.port.js";

export class InMemoryMaquinariaRepository extends MaquinariaRepositoryPort {
  constructor() {
    super();
    this.data = new Map();
  }

  async save(maquinaria) {
    this.data.set(maquinaria.id, maquinaria);
  }

  async findById(id) {
    return this.data.get(id) || null;
  }

  async findAll() {
    return Array.from(this.data.values());
  }
}
