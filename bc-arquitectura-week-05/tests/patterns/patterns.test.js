import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { EventLogger } from '../../src/patterns/singleton/EventLogger.js';
import { MaquinariaFactory } from '../../src/patterns/factory/MaquinariaFactory.js';
import { GPSAdapter } from '../../src/patterns/adapter/GPSAdapter.js';
import { PricingContext, HourlyPricingStrategy, DailyPricingStrategy } from '../../src/patterns/strategy/PricingStrategy.js';
import { EventBus } from '../../src/patterns/observer/EventBus.js';
import { LoggingDecorator } from '../../src/patterns/decorator/LoggingDecorator.js';

describe('Patrones de Diseño', () => {
  it('✅ Singleton - Retorna siempre la misma instancia', () => {
    const logger1 = EventLogger.getInstance();
    const logger2 = EventLogger.getInstance();
    assert.strictEqual(logger1, logger2);
  });

  it('✅ Factory Method - Inicializa propiedades dependientes del tipo', () => {
    const maq = MaquinariaFactory.crearMaquinaria({ tipo: 'tractor' });
    assert.strictEqual(maq.requiereLicenciaEspecial, true);
  });

  it('✅ Adapter - Adapta XML legacy a JSON LatLng', () => {
    const gps = new GPSAdapter();
    const loc = gps.getExactLocation('maq-123');
    assert.ok(loc.lat);
    assert.ok(loc.lng);
  });

  it('✅ Strategy - Elige la calculadora correcta dinámicamente', () => {
    const stHora = PricingContext.getStrategy('horas');
    const stDia = PricingContext.getStrategy('dias');
    
    assert.ok(stHora instanceof HourlyPricingStrategy);
    assert.ok(stDia instanceof DailyPricingStrategy);

    const total = stHora.calculate({ precioPorHora: 50 }, 2);
    assert.strictEqual(total, 100);
  });

  it('✅ Observer - Permite inyectar múltiples escuchas', () => {
    let triggered = 0;
    const bus = new EventBus();
    bus.on('TEST', { handle: () => triggered++ });
    bus.on('TEST', { handle: () => triggered++ });
    
    bus.emit('TEST', {});
    assert.strictEqual(triggered, 2);
  });

  it('✅ Decorator - Envuelve el servicio y mide tiempo sin modificarlo', () => {
    // Servicio mock mínimo
    const mockService = {
      findAll: (filters) => ({ data: [], pagination: {} }),
      findById: (id) => ({ id }),
      create: (data) => data,
      update: (id, data) => data,
      partialUpdate: (id, data) => data,
      delete: (id) => true,
      validateMaquinaria: (data) => true,
    };

    const decorated = new LoggingDecorator(mockService);

    // El decorator delega correctamente al servicio original
    const result = decorated.findAll({});
    assert.deepStrictEqual(result, { data: [], pagination: {} });

    const found = decorated.findById('abc');
    assert.strictEqual(found.id, 'abc');
  });
});
