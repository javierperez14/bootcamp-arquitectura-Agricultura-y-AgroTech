import { ReservaAggregate } from '../../domain/aggregates/reserva.aggregate.js';

export class CrearReservaUseCase {
  #maquinariaRepository;
  #reservaRepository;
  #domainService;

  constructor({ maquinariaRepository, reservaRepository, domainService }) {
    this.#maquinariaRepository = maquinariaRepository;
    this.#reservaRepository = reservaRepository;
    this.#domainService = domainService;
  }

  async execute({ maquinariaId, usuarioId, fechaInicio, fechaFin }) {
    const maquinaria = await this.#maquinariaRepository.findById(maquinariaId);
    if (!maquinaria) throw new Error(`Maquinaria ${maquinariaId} no encontrada`);

    const activas = await this.#reservaRepository.findActivasByMaquinaria(maquinariaId);
    
    // Reglas de negocio desde el servicio de dominio
    this.#domainService.validarCrearReserva(maquinaria, activas);

    // Si pasa, crear y guardar el agregado
    const reserva = new ReservaAggregate({ maquinariaId, usuarioId, fechaInicio, fechaFin });
    await this.#reservaRepository.save(reserva);

    return reserva;
  }
}
