export class PrecioVO {
  #value;

  constructor(value) {
    const num = Number(value);
    if (isNaN(num) || num <= 0) {
      throw new Error(`Precio inválido: ${value}. Debe ser un número mayor a 0.`);
    }
    this.#value = num;
    Object.freeze(this);
  }

  get value() { return this.#value; }

  equals(other) {
    return other instanceof PrecioVO && this.#value === other.value;
  }
}
