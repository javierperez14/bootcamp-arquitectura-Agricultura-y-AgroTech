import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { Maquinaria } from '../../src/domain/entities/maquinaria.entity.js';
import { ReservaAggregate } from '../../src/domain/aggregates/reserva.aggregate.js';
import { DomainService } from '../../src/domain/services/reserva.domain-service.js';
import { InMemoryMaquinariaRepository } from '../../src/infrastructure/repositories/in-memory-maquinaria.repository.js';
import { InMemoryReservaRepository } from '../../src/infrastructure/repositories/in-memory-reserva.repository.js';

import { CrearReservaUseCase } from '../../src/application/use-cases/crear-reserva.use-case.js';
import { ConsultarMaquinariaUseCase } from '../../src/application/use-cases/consultar-maquinaria.use-case.js';
import { ActualizarReservaUseCase } from '../../src/application/use-cases/actualizar-reserva.use-case.js';
import { ReservaRepositoryPort } from '../../src/domain/ports/secondary/reserva.repository.port.js';

// Extendemos InMemory para el test porque faltaba un método para el caso de uso
class TestReservaRepository extends InMemoryReservaRepository {
  async findById(id) {
    return this.data.get(id) || null;
  }
}

describe('Application Layer: Use Cases', () => {
  let maqRepo;
  let resRepo;
  let domainService;

  beforeEach(() => {
    maqRepo = new InMemoryMaquinariaRepository();
    resRepo = new TestReservaRepository();
    domainService = new DomainService();
  });

  describe('ConsultarMaquinariaUseCase', () => {
    it('1️⃣ ✅ Debe retornar listado de maquinarias con páginado (Test 1)', async () => {
      const uC = new ConsultarMaquinariaUseCase({ maquinariaRepository: maqRepo });
      await maqRepo.save(new Maquinaria({ id: 'm1', nombre: 'Tractor A', tipo: 'tractor', marca: 'M1', precioPorDia: 100, precioPorHora: 10 }));
      
      const result = await uC.execute({}, 1, 10);
      assert.strictEqual(result.total, 1);
      assert.strictEqual(result.data.length, 1);
    });

    it('2️⃣ ✅ Debe filtrar maquinaria por disponible (Test 2)', async () => {
      const uC = new ConsultarMaquinariaUseCase({ maquinariaRepository: maqRepo });
      const maq = new Maquinaria({ id: 'm1', nombre: 'Tractor A', tipo: 'tractor', marca: 'M1', precioPorDia: 100, precioPorHora: 10 });
      maq.marcarNoDisponible();
      await maqRepo.save(maq);
      
      const disp = await uC.execute({ disponible: true }, 1, 10);
      assert.strictEqual(disp.total, 0);

      const nodisp = await uC.execute({ disponible: false }, 1, 10);
      assert.strictEqual(nodisp.total, 1);
    });

    it('3️⃣ ✅ Debe filtrar maquinaria por tipo (Test 3)', async () => {
      const uC = new ConsultarMaquinariaUseCase({ maquinariaRepository: maqRepo });
      await maqRepo.save(new Maquinaria({ id: 'm1', nombre: 'Tractor', tipo: 'tractor', marca: 'M', precioPorDia: 1, precioPorHora: 1 }));
      await maqRepo.save(new Maquinaria({ id: 'm2', nombre: 'Arado', tipo: 'arado', marca: 'M', precioPorDia: 1, precioPorHora: 1 }));
      
      const res = await uC.execute({ tipo: 'tractor' }, 1, 10);
      assert.strictEqual(res.total, 1);
      assert.strictEqual(res.data[0].tipo, 'tractor');
    });

    it('4️⃣ ✅ Respeta límites de paginación (Test 4)', async () => {
      const uC = new ConsultarMaquinariaUseCase({ maquinariaRepository: maqRepo });
      for (let i = 0; i < 5; i++) {
        await maqRepo.save(new Maquinaria({ id: `m${i}`, nombre: `Maq ${i}`, tipo: 'tractor', marca: 'M', precioPorDia: 1, precioPorHora: 1 }));
      }
      
      const res = await uC.execute({}, 1, 2);
      assert.strictEqual(res.total, 5);
      assert.strictEqual(res.data.length, 2);
      assert.strictEqual(res.page, 1);
      assert.strictEqual(res.limit, 2);
    });
  });

  describe('CrearReservaUseCase', () => {
    it('5️⃣ ✅ Permite reservar maquinaria disponible (Test 5)', async () => {
      const uC = new CrearReservaUseCase({ maquinariaRepository: maqRepo, reservaRepository: resRepo, domainService });
      await maqRepo.save(new Maquinaria({ id: 'm1', nombre: 'Tractor', tipo: 'tractor', marca: 'M', precioPorDia: 1, precioPorHora: 1 }));
      
      const d1 = new Date(); d1.setDate(d1.getDate() + 1);
      const d2 = new Date(); d2.setDate(d2.getDate() + 2);
      
      const res = await uC.execute({ maquinariaId: 'm1', usuarioId: 'u1', fechaInicio: d1.toISOString(), fechaFin: d2.toISOString() });
      assert.strictEqual(res.estado, 'PENDIENTE');
      const all = await resRepo.findActivasByMaquinaria('m1');
      assert.strictEqual(all.length, 1);
    });

    it('6️⃣ ✅ Arroja error si no existe la máquina (Test 6)', async () => {
      const uC = new CrearReservaUseCase({ maquinariaRepository: maqRepo, reservaRepository: resRepo, domainService });
      const d1 = new Date(); d1.setDate(d1.getDate() + 1);
      const d2 = new Date(); d2.setDate(d2.getDate() + 2);
      
      await assert.rejects(
        async () => await uC.execute({ maquinariaId: 'fake', usuarioId: 'u1', fechaInicio: d1, fechaFin: d2 }),
        /no encontrada/
      );
    });
  });

  describe('ActualizarReservaUseCase', () => {
    it('7️⃣ ✅ Lanza error si no existe reserva (Test 7)', async () => {
      const uC = new ActualizarReservaUseCase({ reservaRepository: resRepo });
      await assert.rejects(async () => await uC.execute('fake', 'CONFIRMADA'), /no encontrada/);
    });

    it('8️⃣ ✅ Permite confirmar una reserva pendiente (Test 8)', async () => {
      const uC = new ActualizarReservaUseCase({ reservaRepository: resRepo });
      
      const d1 = new Date(); d1.setDate(d1.getDate() + 1);
      const d2 = new Date(); d2.setDate(d2.getDate() + 2);
      const res = new ReservaAggregate({ id: 'r1', maquinariaId: 'm1', usuarioId: 'u1', fechaInicio: d1.toISOString(), fechaFin: d2.toISOString() });
      await resRepo.save(res);

      const actualizada = await uC.execute('r1', 'CONFIRMADA');
      assert.strictEqual(actualizada.estado, 'CONFIRMADA');
    });

    it('9️⃣ ✅ Dispara evento ReservaConfirmada tras confirmación exitosa (Test 9)', async () => {
      const uC = new ActualizarReservaUseCase({ reservaRepository: resRepo });
      const d1 = new Date(); d1.setDate(d1.getDate() + 1);
      const d2 = new Date(); d2.setDate(d2.getDate() + 2);
      const res = new ReservaAggregate({ id: 'r1', maquinariaId: 'm1', usuarioId: 'u1', fechaInicio: d1.toISOString(), fechaFin: d2.toISOString() });
      await resRepo.save(res);

      const actualizada = await uC.execute('r1', 'CONFIRMADA');
      const events = actualizada.pullEvents();
      assert.strictEqual(events[0].type, 'ReservaConfirmada');
    });

    it('🔟 ✅ Impide confirmar una reserva ya cancelada (Test 10)', async () => {
      const uC = new ActualizarReservaUseCase({ reservaRepository: resRepo });
      const d1 = new Date(); d1.setDate(d1.getDate() + 1);
      const d2 = new Date(); d2.setDate(d2.getDate() + 2);
      const res = new ReservaAggregate({ id: 'r1', maquinariaId: 'm1', usuarioId: 'u1', fechaInicio: d1.toISOString(), fechaFin: d2.toISOString(), estado: 'CANCELADA' });
      await resRepo.save(res);

      await assert.rejects(async () => await uC.execute('r1', 'CONFIRMADA'), /Solo se pueden confirmar reservas pendientes/);
    });
  });
});
