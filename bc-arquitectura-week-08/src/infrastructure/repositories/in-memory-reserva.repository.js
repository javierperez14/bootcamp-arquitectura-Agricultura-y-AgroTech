import { ReservaRepositoryPort } from "../../domain/ports/secondary/reserva.repository.port.js";

export class InMemoryReservaRepository extends ReservaRepositoryPort {
  constructor() {
    super();
    this.data = new Map();
  }

  async save(reserva) {
    this.data.set(reserva.id, reserva);
  }

  async findById(id) {
    return this.data.get(id) || null;
  }

  async findActivasByMaquinaria(maquinariaId) {
    return Array.from(this.data.values()).filter(r => r.maquinariaId === maquinariaId && r.estado !== 'CANCELADA');
  }
}
