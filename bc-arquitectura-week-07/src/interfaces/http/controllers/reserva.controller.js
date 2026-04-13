import { HttpResponse } from '../../../utils/http-response.js';
import { CrearReservaUseCase } from '../../../application/use-cases/crear-reserva.use-case.js';
import { InMemoryMaquinariaRepository } from '../../../infrastructure/repositories/in-memory-maquinaria.repository.js';
import { InMemoryReservaRepository } from '../../../infrastructure/repositories/in-memory-reserva.repository.js';
import { DomainService } from '../../../domain/services/reserva.domain-service.js';

// Dependency Injection Bootstrap
const maquinariaRepository = new InMemoryMaquinariaRepository();
const reservaRepository = new InMemoryReservaRepository();
const domainService = new DomainService();

const crearReservaUseCase = new CrearReservaUseCase({
  maquinariaRepository,
  reservaRepository,
  domainService,
});

export class ReservaController {
  async getAll(req, res, next) {
    try {
      const data = await reservaRepository.findAll?.() ?? [];
      const response = HttpResponse.successWithMeta(data, {
        pagination: { total: data.length, page: 1, limit: data.length }
      });
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const reserva = await reservaRepository.findById?.(id);
      if (!reserva) return res.status(404).json({ error: 'Reserva no encontrada' });
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
}

export const reservaController = new ReservaController();
