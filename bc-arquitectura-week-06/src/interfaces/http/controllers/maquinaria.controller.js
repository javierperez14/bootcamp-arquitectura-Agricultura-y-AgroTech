import { HttpResponse } from '../../../utils/http-response.js';
import { ConsultarMaquinariaUseCase } from '../../../application/use-cases/consultar-maquinaria.use-case.js';
import { InMemoryMaquinariaRepository } from '../../../infrastructure/repositories/in-memory-maquinaria.repository.js';

// Dependency Injection Bootstrap
const maquinariaRepository = new InMemoryMaquinariaRepository();
const consultarMaquinariaUseCase = new ConsultarMaquinariaUseCase({ maquinariaRepository });

export class MaquinariaController {
  async getAll(req, res, next) {
    try {
      const { tipo, disponible, ubicacion, page = 1, limit = 10 } = req.query;
      
      const filters = {};
      if (tipo) filters.tipo = tipo;
      if (disponible !== undefined) filters.disponible = disponible === 'true';

      const result = await consultarMaquinariaUseCase.execute(filters, page, limit);
      
      const response = HttpResponse.successWithMeta(result.data, {
        pagination: { total: result.total, page: result.page, limit: result.limit }
      });
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const maquinaria = await maquinariaRepository.findById(id);
      const response = HttpResponse.success(maquinaria);
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const maquinaria = req.body; // Simulando CreateUseCase
      const result = await maquinariaRepository.save(maquinaria);
      const response = HttpResponse.created(result);
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      res.status(501).send({ message: 'Not implemented logically in this bootcamp scope yet' });
    } catch (error) {
      next(error);
    }
  }

  async partialUpdate(req, res, next) {
    try {
      res.status(501).send();
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export const maquinariaController = new MaquinariaController();
