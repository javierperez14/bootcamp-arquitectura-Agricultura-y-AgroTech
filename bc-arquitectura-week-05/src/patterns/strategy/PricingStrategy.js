// Strategy Base (Interface abstracta)
export class PricingStrategy {
  calculate(maquinaria, cantidad) {
    throw new Error('El método calculate debe ser implementado');
  }
}

// Concrete Strategy: Precio por Hora
export class HourlyPricingStrategy extends PricingStrategy {
  calculate(maquinaria, cantidad) {
    if (!maquinaria.precioPorHora) {
      throw new Error('La maquinaria no tiene precio por hora definido');
    }
    return maquinaria.precioPorHora * cantidad;
  }
}

// Concrete Strategy: Precio por Día
export class DailyPricingStrategy extends PricingStrategy {
  calculate(maquinaria, cantidad) {
    if (!maquinaria.precioPorDia) {
      throw new Error('La maquinaria no tiene precio por día definido');
    }
    return maquinaria.precioPorDia * cantidad;
  }
}

// Contexto u Orquestador de Estrategias
export class PricingContext {
  static getStrategy(tipoAlquiler) {
    switch (tipoAlquiler) {
      case 'horas':
        return new HourlyPricingStrategy();
      case 'dias':
        return new DailyPricingStrategy();
      default:
        throw new Error('Tipo de alquiler no soportado por el motor de precios');
    }
  }
}
