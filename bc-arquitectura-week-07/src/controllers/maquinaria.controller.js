import { maquinariaService } from '../services/maquinaria.service.js';
import { HttpResponse } from '../utils/http-response.js';
import { LoggingDecorator } from '../patterns/decorator/LoggingDecorator.js';

const decoratedService = new LoggingDecorator(maquinariaService);

export class MaquinariaController {
  async getAll(req, res, next) {
    try {
      const { tipo, disponible, ubicacion, page = 1, limit = 10 } = req.query;
      
      const filters = {};
      if (tipo) filters.tipo = tipo;
      if (disponible !== undefined) filters.disponible = disponible;
      if (ubicacion) filters.ubicacion = ubicacion;

      const result = decoratedService.findAll(filters, page, limit);
      
      const response = HttpResponse.successWithMeta(result.data, {
        pagination: result.pagination
      });
      
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const maquinaria = decoratedService.findById(id);
      
      const response = HttpResponse.success(maquinaria);
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const maquinaria = decoratedService.create(req.body);
      
      const response = HttpResponse.created(maquinaria);
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const maquinaria = decoratedService.update(id, req.body);
      
      const response = HttpResponse.success(maquinaria);
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  }

  async partialUpdate(req, res, next) {
    try {
      const { id } = req.params;
      const maquinaria = decoratedService.partialUpdate(id, req.body);
      
      const response = HttpResponse.success(maquinaria);
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      decoratedService.delete(id);
      
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export const maquinariaController = new MaquinariaController();
