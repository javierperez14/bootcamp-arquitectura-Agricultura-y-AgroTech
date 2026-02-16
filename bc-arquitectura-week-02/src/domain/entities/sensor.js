export class Sensor {
  constructor({ id, tipo, ubicacion, valor }) {
    this.id = id;
    this.tipo = tipo;      // temperatura, humedad, ph
    this.ubicacion = ubicacion;
    this.valor = valor;
  }
}

