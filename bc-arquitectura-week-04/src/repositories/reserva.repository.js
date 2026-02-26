class ReservaRepository {
  constructor() {
    this.reservas = new Map();
    this.initializeData();
  }

  initializeData() {
    const initialData = [
      {
        id: 'res-001',
        maquinariaId: 'maq-001',
        usuarioId: 'user-999',
        fechaInicio: '2026-03-01T08:00:00.000Z',
        fechaFin: '2026-03-01T18:00:00.000Z',
        tipoAlquiler: 'horas',
        cantidad: 10,
        total: 450000,
        estado: 'confirmada',
        ubicacionEntrega: 'Finca El Rosal, Vereda La Esperanza',
        observaciones: 'Necesito el tractor para arado de 5 hectáreas'
      },
      {
        id: 'res-002',
        maquinariaId: 'maq-002',
        usuarioId: 'user-888',
        fechaInicio: '2026-03-05T06:00:00.000Z',
        fechaFin: '2026-03-07T18:00:00.000Z',
        tipoAlquiler: 'dias',
        cantidad: 2,
        total: 1700000,
        estado: 'pendiente',
        ubicacionEntrega: 'Hacienda San José, Km 15 vía Ibagué',
        observaciones: 'Cosecha de arroz, 20 hectáreas'
      }
    ];

    initialData.forEach(res => this.reservas.set(res.id, res));
  }

  findAll(filters = {}) {
    let results = Array.from(this.reservas.values());

    if (filters.maquinariaId) {
      results = results.filter(r => r.maquinariaId === filters.maquinariaId);
    }

    if (filters.usuarioId) {
      results = results.filter(r => r.usuarioId === filters.usuarioId);
    }

    if (filters.estado) {
      results = results.filter(r => r.estado === filters.estado);
    }

    return results;
  }

  findById(id) {
    return this.reservas.get(id) || null;
  }

  create(data) {
    const id = `res-${Date.now()}`;
    const reserva = {
      id,
      ...data,
      estado: 'pendiente'
    };
    
    this.reservas.set(id, reserva);
    return reserva;
  }

  update(id, data) {
    const existing = this.reservas.get(id);
    if (!existing) return null;

    const updated = { ...existing, ...data, id };
    this.reservas.set(id, updated);
    return updated;
  }

  delete(id) {
    return this.reservas.delete(id);
  }

  count(filters = {}) {
    return this.findAll(filters).length;
  }
}

export const reservaRepository = new ReservaRepository();
