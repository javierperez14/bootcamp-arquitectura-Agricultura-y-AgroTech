import { ActualizarReservaUseCasePort } from '../../domain/ports/primary/actualizar-reserva.use-case.port.js';

export class ActualizarReservaUseCase extends ActualizarReservaUseCasePort {
  #reservaRepository;

  constructor({ reservaRepository }) {
    super();
    this.#reservaRepository = reservaRepository;
  }

  async execute(reservaId, nuevoEstado) {
    // 1. Obtener la reserva actual
    const reserva = await this.#reservaRepository.findById(reservaId);
    if (!reserva) {
      throw new Error(`Reserva ${reservaId} no encontrada`);
    }

    // 2. Aplicar el cambio de estado usando los métodos del agregado, si aplican.
    if (nuevoEstado === 'CONFIRMADA') {
      reserva.confirmar();
    } else if (nuevoEstado === 'CANCELADA') {
      reserva.cancelar();
    } else {
      throw new Error(`Estado '${nuevoEstado}' no soportado para actualización directa.`);
    }

    // 3. Guardar el nuevo estado
    await this.#reservaRepository.save(reserva);
    
    return reserva;
  }
}
