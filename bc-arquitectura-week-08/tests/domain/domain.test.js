import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { PrecioVO } from '../../src/domain/value-objects/precio.vo.js';
import { FechaReservaVO } from '../../src/domain/value-objects/fecha-reserva.vo.js';
import { Maquinaria } from '../../src/domain/entities/maquinaria.entity.js';
import { ReservaAggregate } from '../../src/domain/aggregates/reserva.aggregate.js';
import { DomainService } from '../../src/domain/services/reserva.domain-service.js';

describe('Domain: Value Objects', () => {
  it('✅ PrecioVO - acepta valor mayor a 0', () => {
    const precio = new PrecioVO(1500);
    assert.strictEqual(precio.value, 1500);
  });

  it('✅ PrecioVO - rechaza valor negativo o cero', () => {
    assert.throws(() => new PrecioVO(0), /Precio inválido/);
    assert.throws(() => new PrecioVO(-50), /Precio inválido/);
  });

  it('✅ FechaReservaVO - acepta fechas válidas', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);
    
    const fechas = new FechaReservaVO(tomorrow.toISOString(), dayAfter.toISOString());
    assert.ok(fechas.inicio < fechas.fin);
  });

  it('✅ FechaReservaVO - rechaza fechas en el pasado', () => {
    const ayer = new Date();
    ayer.setDate(ayer.getDate() - 1);
    const manana = new Date();
    manana.setDate(manana.getDate() + 1);
    
    assert.throws(() => new FechaReservaVO(ayer.toISOString(), manana.toISOString()), /en el pasado/);
  });
});

describe('Domain: Entities & Aggregates', () => {
  it('✅ Maquinaria entity - creación válida', () => {
    const tractor = new Maquinaria({
      nombre: 'Tractor Test',
      tipo: 'tractor',
      marca: 'TestMark',
      precioPorDia: 1000,
      precioPorHora: 100
    });
    assert.strictEqual(tractor.disponible, true);
    assert.strictEqual(tractor.tipo, 'tractor');
  });

  it('✅ Maquinaria entity - rechaza tipo inválido', () => {
    assert.throws(() => new Maquinaria({
      nombre: 'Test',
      tipo: 'auto',
      marca: 'Test',
      precioPorDia: 100,
      precioPorHora: 10
    }), /Tipo inválido/);
  });

  it('✅ ReservaAggregate - registrar operación y disparar evento', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);

    const reserva = new ReservaAggregate({
      maquinariaId: 'maq-1',
      usuarioId: 'user-1',
      fechaInicio: tomorrow.toISOString(),
      fechaFin: dayAfter.toISOString()
    });

    reserva.confirmar();
    assert.strictEqual(reserva.estado, 'CONFIRMADA');
    
    const events = reserva.pullEvents();
    assert.strictEqual(events.length, 1);
    assert.strictEqual(events[0].type, 'ReservaConfirmada');
  });
});

describe('Domain: Services', () => {
  it('✅ DomainService - Validación Exitosa', () => {
    const service = new DomainService();
    const maq = { id: 'm1', disponible: true };
    const activas = [{}, {}]; // 2 previas
    
    assert.doesNotThrow(() => service.validarCrearReserva(maq, activas));
  });

  it('✅ DomainService - Rechaza si maquinaria inhabilitada', () => {
    const service = new DomainService();
    const maq = { id: 'm1', disponible: false };
    
    assert.throws(() => service.validarCrearReserva(maq, []), /inhabilitada y no disponible/);
  });

  it('✅ DomainService - Rechaza exceso de reservas', () => {
    const service = new DomainService();
    const maq = { id: 'm1', disponible: true };
    const activas = [{}, {}, {}]; // 3 previas
    
    assert.throws(() => service.validarCrearReserva(maq, activas), /máximo número de reservas activas/);
  });
});
