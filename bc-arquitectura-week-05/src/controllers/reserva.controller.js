import { reservaService } from '../services/reserva.service.js';
import { HttpResponse } from '../utils/http-response.js';

export class ReservaController {
  async getAll(req, res, next) {
    try {
      const { maquinariaId, usuarioId, estado, page = 1, limit = 10 } = req.query;
      
      const filters = {};
      if (maquinariaId) filters.maquinariaId = maquinariaId;
      if (usuarioId) filters.usuarioId = usuarioId;
      if (estado) filters.estado = estado;

      const result = reservaService.findAll(filters, page, limit);
      
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
      const reserva = reservaService.findById(id);
      
      const response = HttpResponse.success(reserva);
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const reserva = reservaService.create(req.body);
      
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
      
      const reserva = reservaService.updateEstado(id, estado);
      
      const response = HttpResponse.success(reserva);
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  }
}

export const reservaController = new ReservaController();
