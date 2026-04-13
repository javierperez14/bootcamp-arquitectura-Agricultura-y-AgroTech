import { randomUUID } from 'crypto';
import { FechaReservaVO } from '../value-objects/fecha-reserva.vo.js';

export class ReservaAggregate {
  #id;
  #maquinariaId;
  #usuarioId;
  #estado;
  #fechaReserva;
  #events = [];

  constructor({ id = randomUUID(), maquinariaId, usuarioId, fechaInicio, fechaFin, estado = 'PENDIENTE' }) {
    this.#id = id;
    this.#maquinariaId = maquinariaId;
    this.#usuarioId = usuarioId;
    this.#estado = estado;
    this.#fechaReserva = new FechaReservaVO(fechaInicio, fechaFin);
  }

  confirmar() {
    if (this.#estado !== 'PENDIENTE') {
      throw new Error('Solo se pueden confirmar reservas pendientes.');
    }
    this.#estado = 'CONFIRMADA';
    this.#events.push({
      type: 'ReservaConfirmada',
      aggregateId: this.#id,
      maquinariaId: this.#maquinariaId
    });
  }

  cancelar() {
    this.#estado = 'CANCELADA';
    this.#events.push({
      type: 'ReservaCancelada',
      aggregateId: this.#id,
      maquinariaId: this.#maquinariaId
    });
  }

  pullEvents() {
    const events = [...this.#events];
    this.#events = [];
    return events;
  }

  get id() { return this.#id; }
  get maquinariaId() { return this.#maquinariaId; }
  get usuarioId() { return this.#usuarioId; }
  get estado() { return this.#estado; }
  get fechaInicio() { return this.#fechaReserva.inicio; }
  get fechaFin() { return this.#fechaReserva.fin; }
}
