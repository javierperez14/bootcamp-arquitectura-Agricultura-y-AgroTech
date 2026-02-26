import { maquinariaRepository } from '../repositories/maquinaria.repository.js';
import { ApiError } from '../utils/api-error.js';

class MaquinariaService {
  findAll(filters, page = 1, limit = 10) {
    const allResults = maquinariaRepository.findAll(filters);
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
    const maquinaria = maquinariaRepository.findById(id);
    if (!maquinaria) {
      throw ApiError.notFound('Maquinaria no encontrada');
    }
    return maquinaria;
  }

  create(data) {
    this.validateMaquinaria(data);
    return maquinariaRepository.create(data);
  }

  update(id, data) {
    const existing = maquinariaRepository.findById(id);
    if (!existing) {
      throw ApiError.notFound('Maquinaria no encontrada');
    }

    this.validateMaquinaria(data);
    return maquinariaRepository.update(id, data);
  }

  partialUpdate(id, data) {
    const existing = maquinariaRepository.findById(id);
    if (!existing) {
      throw ApiError.notFound('Maquinaria no encontrada');
    }

    return maquinariaRepository.update(id, data);
  }

  delete(id) {
    const existing = maquinariaRepository.findById(id);
    if (!existing) {
      throw ApiError.notFound('Maquinaria no encontrada');
    }

    maquinariaRepository.delete(id);
  }

  validateMaquinaria(data) {
    const errors = {};

    if (!data.nombre || data.nombre.trim() === '') {
      errors.nombre = 'El nombre es requerido';
    }

    if (!data.tipo) {
      errors.tipo = 'El tipo es requerido';
    } else {
      const tiposValidos = ['tractor', 'sembradora', 'cosechadora', 'fumigadora', 'arado'];
      if (!tiposValidos.includes(data.tipo)) {
        errors.tipo = `El tipo debe ser uno de: ${tiposValidos.join(', ')}`;
      }
    }

    if (!data.marca || data.marca.trim() === '') {
      errors.marca = 'La marca es requerida';
    }

    if (!data.ubicacion || data.ubicacion.trim() === '') {
      errors.ubicacion = 'La ubicación es requerida';
    }

    if (!data.precioPorDia || data.precioPorDia <= 0) {
      errors.precioPorDia = 'El precio por día debe ser mayor a 0';
    }

    if (!data.propietarioId || data.propietarioId.trim() === '') {
      errors.propietarioId = 'El ID del propietario es requerido';
    }

    if (Object.keys(errors).length > 0) {
      throw ApiError.badRequest('Datos de entrada inválidos', errors);
    }
  }
}

export const maquinariaService = new MaquinariaService();
