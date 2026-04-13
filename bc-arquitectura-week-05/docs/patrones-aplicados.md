# Patrones de Diseño Aplicados - AgroTech

Este documento describe los 6 patrones de diseño incorporados en la arquitectura de la semana 05 para mejorar la reusabilidad, mantenimiento e integración de procesos de AgroTech.

---

## Patrón 1: Singleton (Creacional)

### Descripción
Aseguramos que las clases de repositorios en memoria mantengan una única fuente de la verdad para toda la ejecución del servidor.

### Diagrama
[Ver diagrama UML de Singleton](./diagramas/singleton-diagram.md)

### Código: Antes y Después
**Antes (Problema Original):**
```javascript
export class ReservaRepository {
  constructor() {
    this.reservas = new Map();
  }
}
export const reservaRepository = new ReservaRepository(); // Podía instanciarse de nuevo por otra clase
```

**Después (Solución con Singleton):**
```javascript
export class ReservaRepository {
  static #instance;

  constructor() {
    if (ReservaRepository.#instance) {
      return ReservaRepository.#instance;
    }
    this.reservas = new Map();
    ReservaRepository.#instance = this;
  }

  static getInstance() {
    if (!ReservaRepository.#instance) {
      ReservaRepository.#instance = new ReservaRepository();
    }
    return ReservaRepository.#instance;
  }
}
export const reservaRepository = ReservaRepository.getInstance();
```

---

## Patrón 2: Factory Method (Creacional)

### Descripción
Encapsula la creación de objetos `Maquinaria` según su `tipo` (tractor, sembradora), permitiendo asignar atributos específicos según las reglas de negocio, sin ensuciar el servicio base.

### Diagrama
[Ver diagrama UML de Factory Method](./diagramas/factory-diagram.md)

### Código: Antes y Después
**Antes (Problema Original):**
```javascript
create(data) {
  this.validateMaquinaria(data);
  return maquinariaRepository.create(data); // Inyección en bruto sin propiedades dinámicas
}
```

**Después (Solución con Factory Method):**
```javascript
// MaquinariaFactory.js
export class MaquinariaFactory {
  static crearMaquinaria(data) {
    if (data.tipo === 'tractor') return { ...data, requiereLicencia: true };
    return data;
  }
}

// maquinaria.service.js
create(data) {
  this.validateMaquinaria(data);
  const nuevaMaquinaria = MaquinariaFactory.crearMaquinaria(data);
  return maquinariaRepository.create(nuevaMaquinaria);
}
```

---

## Patrón 3: Adapter (Estructural)

### Descripción
Adapta la estructura Legacy de los GPS en tractores (XML/arcaico) a formato JSON estandarizado para enriquecer la respuesta del sistema al buscar maquinaria.

### Diagrama
[Ver diagrama UML de Adapter](./diagramas/adapter-diagram.md)

### Código: Antes y Después
**Antes (Problema Original):**
```javascript
findById(id) {
    const maquinaria = maquinariaRepository.findById(id);
    // Sin ubicación GPS estandarizada por ser formato XML del tercero.
    return maquinaria;
}
```

**Después (Solución con Adapter):**
```javascript
// GPSAdapter.js hace parse de XML a JSON
export class GPSAdapter {
  getExactLocation(id) { /* Parsea el XML de LegacyGPS a {lat, lng} */ }
}

// maquinaria.service.js
findById(id) {
    const maquinaria = maquinariaRepository.findById(id);
    const gps = new GPSAdapter();
    maquinaria.coordenadasGps = gps.getExactLocation(id);
    return maquinaria;
}
```

---

## Patrón 4: Decorator (Estructural)

### Descripción
Se requería medir tiempo de ejecución analítica (logs) sobre `MaquinariaService`. En lugar de insertar console.log por todos los métodos, se envuelve la clase dinámicamente.

### Diagrama
[Ver diagrama UML de Decorator](./diagramas/decorator-diagram.md)

### Código: Antes y Después
**Antes (Problema Original):**
`maquinaria.controller.js` llamaba en crudo, y las analíticas demandaban ensuciar el servicio.
```javascript
const result = maquinariaService.findAll(filters);
```

**Después (Solución con Decorator):**
```javascript
// LoggingDecorator.js envuelve todas las llamadas originales
findAll(filters) {
  console.log('Start Log...');
  const res = this.service.findAll(filters);
  console.log('End Log...');
  return res;
}

// maquinaria.controller.js
const decoratedService = new LoggingDecorator(maquinariaService);
const result = decoratedService.findAll(filters);
```

---

## Patrón 5: Observer (Comportamiento)

### Descripción
Desacopla el sistema al momento de crear o actualizar reservas, emitiendo eventos (`RESERVA_CREATED`) para notificar por email o sistema de auditoría.

### Diagrama
[Ver diagrama de secuencia de Observer](./diagramas/observer-diagram.md)

### Código: Antes y Después
**Antes (Problema Original):**
```javascript
create(data) {
    const reserva = reservaRepository.create(data);
    EmailService.enviar(reserva); // Fuerte acoplamiento impidiendo el testing modular
    AuditService.registrar(reserva);
    return reserva;
}
```

**Después (Solución con Observer):**
```javascript
// EventBus.js permite registro dinámico a múltiples Observers
create(data) {
    const reserva = reservaRepository.create(data);
    globalEventBus.emit('RESERVA_CREATED', reserva); // Totalmente desacoplado
    return reserva;
}
```

---

## Patrón 6: Strategy (Comportamiento)

### Descripción
Patrón requerido como segundo patrón de comportamiento para delegar dinámicamente la estrategia de estructuración de cálculo de precios (`precioPorHora` vs `precioPorDia`) de `ReservaService`.

### Diagrama
[Ver diagrama UML de Strategy](./diagramas/strategy-diagram.md)

### Código: Antes y Después
**Antes (Problema Original):**
Múltiples statements o ifs enbebidos dentro del servicio.
```javascript
// reserva.service.js
const precio = data.tipoAlquiler === 'horas' 
  ? maquinaria.precioPorHora 
  : maquinaria.precioPorDia;
const total = precio * data.cantidad;
```

**Después (Solución con Strategy):**
```javascript
// reserva.service.js
const strategy = PricingContext.getStrategy(data.tipoAlquiler);
const total = strategy.calculate(maquinaria, data.cantidad);

// PricingStrategy.js encapsula el comportamiento aislado de cada forma de pago
export class DailyPricingStrategy extends PricingStrategy {
  calculate(maq, cant) { return maq.precioPorDia * cant; }
}
```
