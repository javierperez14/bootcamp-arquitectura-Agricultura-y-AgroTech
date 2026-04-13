import { randomUUID } from 'crypto';
import { PrecioVO } from '../value-objects/precio.vo.js';

export class Maquinaria {
  #id;
  #nombre;
  #tipo;
  #marca;
  #precioPorDia;
  #precioPorHora;
  #disponible;

  constructor({ id = randomUUID(), nombre, tipo, marca, precioPorDia, precioPorHora, disponible = true }) {
    if (!nombre || nombre.trim().length < 3) {
      throw new Error('El nombre de la maquinaria debe tener al menos 3 caracteres');
    }
    
    const tipos = ['tractor', 'sembradora', 'cosechadora', 'fumigadora', 'arado'];
    if (!tipos.includes(tipo)) {
      throw new Error(`Tipo inválido. Debe ser: ${tipos.join(', ')}`);
    }

    this.#id = id;
    this.#nombre = nombre.trim();
    this.#tipo = tipo;
    this.#marca = marca;
    this.#precioPorDia = new PrecioVO(precioPorDia);
    this.#precioPorHora = new PrecioVO(precioPorHora);
    this.#disponible = disponible;
  }

  marcarNoDisponible() {
    this.#disponible = false;
  }

  marcarDisponible() {
    this.#disponible = true;
  }

  get id() { return this.#id; }
  get nombre() { return this.#nombre; }
  get tipo() { return this.#tipo; }
  get marca() { return this.#marca; }
  get precioPorDia() { return this.#precioPorDia.value; }
  get precioPorHora() { return this.#precioPorHora.value; }
  get disponible() { return this.#disponible; }
}
