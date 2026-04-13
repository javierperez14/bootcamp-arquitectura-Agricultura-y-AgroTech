import { HttpResponse } from '../../../utils/http-response.js';
import { ConsultarMaquinariaUseCase } from '../../../application/use-cases/consultar-maquinaria.use-case.js';
import { InMemoryMaquinariaRepository } from '../../../infrastructure/repositories/in-memory-maquinaria.repository.js';

const maquinariaRepository = new InMemoryMaquinariaRepository();
const consultarMaquinariaUseCase = new ConsultarMaquinariaUseCase({ maquinariaRepository });

export class MaquinariaController {
  async getAll(req, res, next) {
    try {
      const { tipo, disponible, page = 1, limit = 10 } = req.query;
      const filters = {};
      if (tipo) filters.tipo = tipo;
      if (disponible !== undefined) filters.disponible = disponible === 'true';

      const result = await consultarMaquinariaUseCase.execute(filters, Number(page), Number(limit));
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
      if (!maquinaria) return res.status(404).json({ error: 'Maquinaria no encontrada' });
      const response = HttpResponse.success(maquinaria);
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const result = await maquinariaRepository.save(req.body);
      const response = HttpResponse.created(result);
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  }
}

export const maquinariaController = new MaquinariaController();
