export class LoggingDecorator {
  constructor(service) {
    this.service = service;
  }

  findAll(filters, page = 1, limit = 10) {
    console.log(`[LoggingDecorator]: Ejecutando findAll maquinaria con filtros:`, filters);
    const start = Date.now();
    const result = this.service.findAll(filters, page, limit);
    console.log(`[LoggingDecorator]: findAll completado en ${Date.now() - start}ms`);
    return result;
  }

  findById(id) {
    console.log(`[LoggingDecorator]: Buscando maquinaria por ID: ${id}`);
    return this.service.findById(id);
  }

  create(data) {
    console.log(`[LoggingDecorator]: Solicitud para crear nueva maquinaria de tipo: ${data.tipo}`);
    return this.service.create(data);
  }

  update(id, data) {
    console.log(`[LoggingDecorator]: Solicitud para actualizar maquinaria ID: ${id}`);
    return this.service.update(id, data);
  }

  partialUpdate(id, data) {
    return this.service.partialUpdate(id, data);
  }

  delete(id) {
    console.log(`[LoggingDecorator]: Solicitud para eliminar maquinaria ID: ${id}`);
    return this.service.delete(id);
  }

  validateMaquinaria(data) {
    return this.service.validateMaquinaria(data);
  }
}
