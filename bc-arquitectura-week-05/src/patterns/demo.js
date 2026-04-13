import { EventLogger } from './singleton/EventLogger.js';
import { MaquinariaFactory } from './factory/MaquinariaFactory.js';
import { GPSAdapter } from './adapter/GPSAdapter.js';
import { PricingContext } from './strategy/PricingStrategy.js';
import { globalEventBus } from './observer/EventBus.js';
import { EmailObserver } from './observer/EmailObserver.js';

console.log("=== DEMO DE PATRONES DE DISEÑO ===");

// 1. Singleton: Obtenemos el Logger global
const logger = EventLogger.getInstance();
logger.log('INFO', 'Iniciando demostración de patrones extesibles.');

// 2. Observer: Extensibilidad agregando nuevos observadores sin tocar código anterior
class NotificacionSMSObserver {
  handle(data) {
    logger.log('INFO', `[SMS Observer] Enviando SMS al cliente para la reserva: ${data.id}`);
  }
}
globalEventBus.on('RESERVA_CREATED', new EmailObserver());
globalEventBus.on('RESERVA_CREATED', new NotificacionSMSObserver()); // Añadimos funcionalidad nueva limpiamente

// 3. Factory Method: Creando distintos tipos de maquinaria
const tractor = MaquinariaFactory.crearMaquinaria({ tipo: 'tractor', nombre: 'Tractor Demo' });
logger.log('INFO', 'Maquinaria generada por Factory:', tractor);

// 4. Strategy: Agregando un nuevo modelo de tarifas dinámicamente
class SemanalPricingStrategy {
  calculate(maquinaria, cantidadSemanas) {
    return (maquinaria.precioPorDia * 7) * cantidadSemanas;
  }
}

// Sobrecargamos o usamos directamente la nueva estrategia (Extensibilidad)
const nuevaEstrategiaSecreta = new SemanalPricingStrategy();
const precioSimulado = nuevaEstrategiaSecreta.calculate({ precioPorDia: 100 }, 2); 
logger.log('INFO', `Calculo de nueva estrategia semanal: $${precioSimulado}`);

// 5. Adapter: Simulando hardware externo
const gps = new GPSAdapter();
const pos = gps.getExactLocation('TRACTOR-X');
logger.log('INFO', 'Posición del GPS Adaptado:', pos);

console.log("\n=== HISTORIAL GLOBAL DEL SINGLETON (LOGGER) ===");
console.log(logger.getHistory());
