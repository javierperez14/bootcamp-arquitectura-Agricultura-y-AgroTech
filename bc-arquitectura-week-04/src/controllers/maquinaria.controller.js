import { maquinariaService } from '../services/maquinaria.service.js';
import { HttpResponse } from '../utils/http-response.js';

export class MaquinariaController {
  async getAll(req, res, next) {
    try {
      const { tipo, disponible, ubicacion, page = 1, limit = 10 } = req.query;
      
      const filters = {};
      if (tipo) filters.tipo = tipo;
      if (disponible !== undefined) filters.disponible = disponible;
      if (ubicacion) filters.ubicacion = ubicacion;

      const result = maquinariaService.findAll(filters, page, limit);
      
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
      const maquinaria = maquinariaService.findById(id);
      
      const response = HttpResponse.success(maquinaria);
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const maquinaria = maquinariaService.create(req.body);
      
      const response = HttpResponse.created(maquinaria);
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const maquinaria = maquinariaService.update(id, req.body);
      
      const response = HttpResponse.success(maquinaria);
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  }

  async partialUpdate(req, res, next) {
    try {
      const { id } = req.params;
      const maquinaria = maquinariaService.partialUpdate(id, req.body);
      
      const response = HttpResponse.success(maquinaria);
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      maquinariaService.delete(id);
      
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export const maquinariaController = new MaquinariaController();
