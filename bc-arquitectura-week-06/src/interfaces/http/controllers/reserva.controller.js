import { HttpResponse } from '../../../utils/http-response.js';
import { CrearReservaUseCase } from '../../../application/use-cases/crear-reserva.use-case.js';
import { ActualizarReservaUseCase } from '../../../application/use-cases/actualizar-reserva.use-case.js';

import { InMemoryMaquinariaRepository } from '../../../infrastructure/repositories/in-memory-maquinaria.repository.js';
import { InMemoryReservaRepository } from '../../../infrastructure/repositories/in-memory-reserva.repository.js';
import { DomainService } from '../../../domain/services/reserva.domain-service.js';
import { ConsoleNotificationAdapter } from '../../../infrastructure/notifications/console-notification.adapter.js';

// Dependency Injection Bootstrap (Idealmente externalizado en un DI Container)
const maquinariaRepository = new InMemoryMaquinariaRepository();
const reservaRepository = new InMemoryReservaRepository();
const domainService = new DomainService();
const notificationPort = new ConsoleNotificationAdapter();

const crearReservaUseCase = new CrearReservaUseCase({
  maquinariaRepository,
  reservaRepository,
  domainService,
  notificationPort
});

const actualizarReservaUseCase = new ActualizarReservaUseCase({
  reservaRepository
});

export class ReservaController {
  async getAll(req, res, next) {
    try {
      const { maquinariaId, usuarioId, estado, page = 1, limit = 10 } = req.query;
      // Simulando endpoint (en hexagonal puro usaríamos otro UseCase)
      const data = reservaRepository.findAll({ maquinariaId, usuarioId, estado });
      const response = HttpResponse.successWithMeta(data, { pagination: { page, limit, total: data.length } });
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const reserva = await reservaRepository.findById(id);
      const response = HttpResponse.success(reserva);
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const reserva = await crearReservaUseCase.execute(req.body);
      
      const response = HttpResponse.created(reserva);
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  }

  async updateEstado(req, res, next) {
    try {
      const { id } = req.params;
      const { estado } = req.body;
      
      const reserva = await actualizarReservaUseCase.execute(id, estado);
      
      const response = HttpResponse.success(reserva);
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  }
}

export const reservaController = new ReservaController();

