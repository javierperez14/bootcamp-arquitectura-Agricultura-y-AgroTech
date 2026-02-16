import { IRepository } from "../domain/interfaces/repository.js";

export class MemoryRepository extends IRepository {
  constructor() {
    super();
    this.items = new Map();
  }

  create(entity) {
    this.items.set(entity.id, entity);
    return entity;
  }

  findAll() {
    return Array.from(this.items.values());
  }

  findById(id) {
    return this.items.get(id);
  }

  update(id, data) {
    if (!this.items.has(id)) return null;
    const updated = { ...this.items.get(id), ...data };
    this.items.set(id, updated);
    return updated;
  }

  delete(id) {
    return this.items.delete(id);
  }
}
