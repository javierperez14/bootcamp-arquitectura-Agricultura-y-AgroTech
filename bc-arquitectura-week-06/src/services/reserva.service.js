import { reservaRepository } from '../repositories/reserva.repository.js';
import { maquinariaRepository } from '../repositories/maquinaria.repository.js';
import { ApiError } from '../utils/api-error.js';
import { globalEventBus } from '../patterns/observer/EventBus.js';

class ReservaService {
  findAll(filters, page = 1, limit = 10) {
    const allResults = reservaRepository.findAll(filters);
    const total = allResults.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    
    const data = allResults.slice(offset, offset + limit);

    return {
      data,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    };
  }

  findById(id) {
    const reserva = reservaRepository.findById(id);
    if (!reserva) {
      throw ApiError.notFound('Reserva no encontrada');
    }
    return reserva;
  }

  create(data) {
    this.validateReserva(data);

    // Verificar que la maquinaria existe y está disponible
    const maquinaria = maquinariaRepository.findById(data.maquinariaId);
    if (!maquinaria) {
      throw ApiError.notFound('Maquinaria no encontrada');
    }

    if (!maquinaria.disponible) {
      throw ApiError.conflict('La maquinaria no está disponible');
    }

    // Calcular el total
    const precio = data.tipoAlquiler === 'horas' 
      ? maquinaria.precioPorHora 
      : maquinaria.precioPorDia;
    
    const total = precio * data.cantidad;

    const reserva = reservaRepository.create({
      ...data,
      total
    });

    globalEventBus.emit('RESERVA_CREATED', reserva);

    return reserva;
  }

  updateEstado(id, estado) {
    const reserva = reservaRepository.findById(id);
    if (!reserva) {
      throw ApiError.notFound('Reserva no encontrada');
    }

    const estadosValidos = ['pendiente', 'confirmada', 'en_uso', 'completada', 'cancelada'];
    if (!estadosValidos.includes(estado)) {
      throw ApiError.badRequest(`El estado debe ser uno de: ${estadosValidos.join(', ')}`);
    }

    const updated = reservaRepository.update(id, { estado });
    globalEventBus.emit('RESERVA_STATUS_CHANGED', updated);
    return updated;
  }

  validateReserva(data) {
    const errors = {};

    if (!data.maquinariaId) {
      errors.maquinariaId = 'El ID de la maquinaria es requerido';
    }

    if (!data.usuarioId) {
      errors.usuarioId = 'El ID del usuario es requerido';
    }

    if (!data.fechaInicio) {
      errors.fechaInicio = 'La fecha de inicio es requerida';
    }

    if (!data.fechaFin) {
      errors.fechaFin = 'La fecha de fin es requerida';
    }

    if (data.fechaInicio && data.fechaFin) {
      const inicio = new Date(data.fechaInicio);
      const fin = new Date(data.fechaFin);
      
      if (inicio >= fin) {
        errors.fechas = 'La fecha de inicio debe ser anterior a la fecha de fin';
      }
    }

    if (!data.tipoAlquiler) {
      errors.tipoAlquiler = 'El tipo de alquiler es requerido';
    } else if (!['horas', 'dias'].includes(data.tipoAlquiler)) {
      errors.tipoAlquiler = 'El tipo de alquiler debe ser "horas" o "dias"';
    }

    if (!data.cantidad || data.cantidad <= 0) {
      errors.cantidad = 'La cantidad debe ser mayor a 0';
    }

    if (Object.keys(errors).length > 0) {
      throw ApiError.badRequest('Datos de entrada inválidos', errors);
    }
  }
}

export const reservaService = new ReservaService();
