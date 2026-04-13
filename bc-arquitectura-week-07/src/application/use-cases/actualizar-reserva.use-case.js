export class ActualizarReservaUseCase {
  #reservaRepository;

  constructor({ reservaRepository }) {
    this.#reservaRepository = reservaRepository;
  }

  async execute(reservaId, nuevoEstado) {
    const reserva = await this.#reservaRepository.findById(reservaId);
    if (!reserva) throw new Error(`Reserva ${reservaId} no encontrada`);

    if (nuevoEstado === 'CONFIRMADA') {
      reserva.confirmar();
    } else if (nuevoEstado === 'CANCELADA') {
      reserva.cancelar();
    } else {
      throw new Error(`Estado '${nuevoEstado}' no soportado para actualización directa.`);
    }

    await this.#reservaRepository.save(reserva);
    return reserva;
  }
}
