export class FechaReservaVO {
  #inicio;
  #fin;

  constructor(inicio, fin) {
    const dInicio = new Date(inicio);
    const dFin = new Date(fin);

    if (isNaN(dInicio.getTime()) || isNaN(dFin.getTime())) {
      throw new Error('Formato de fecha inválido');
    }

    if (dInicio >= dFin) {
      throw new Error('La fecha de inicio debe ser estrictamente anterior a la fecha de fin');
    }

    if (dInicio < new Date()) {
        throw new Error('Las reservas no pueden hacerse en el pasado');
    }

    this.#inicio = dInicio;
    this.#fin = dFin;
    Object.freeze(this);
  }

  get inicio() { return this.#inicio; }
  get fin() { return this.#fin; }
}
