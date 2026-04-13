import { EventLogger } from '../singleton/EventLogger.js';

export class LoggingDecorator {
  constructor(service) {
    this.service = service;
    this.logger = EventLogger.getInstance();
  }

  findAll(filters, page = 1, limit = 10) {
    const start = performance.now();
    const result = this.service.findAll(filters, page, limit);
    const end = performance.now();
    this.logger.log('INFO', 'findAll operacion terminada', { latencyMs: (end - start).toFixed(2), records: result.data.length });
    return result;
  }

  findById(id) {
    const start = performance.now();
    const result = this.service.findById(id);
    const end = performance.now();
    this.logger.log('INFO', 'findById operacion terminada', { id, latencyMs: (end - start).toFixed(2) });
    return result;
  }

  create(data) {
    const start = performance.now();
    const result = this.service.create(data);
    const end = performance.now();
    this.logger.log('INFO', 'Maquinaria creada', { tipo: data.tipo, latencyMs: (end - start).toFixed(2) });
    return result;
  }

  update(id, data) {
    return this.service.update(id, data);
  }

  partialUpdate(id, data) {
    return this.service.partialUpdate(id, data);
  }

  delete(id) {
    const start = performance.now();
    const result = this.service.delete(id);
    const end = performance.now();
    this.logger.log('WARN', 'Maquinaria eliminada', { id, latencyMs: (end - start).toFixed(2) });
    return result;
  }

  validateMaquinaria(data) {
    return this.service.validateMaquinaria(data);
  }
}
