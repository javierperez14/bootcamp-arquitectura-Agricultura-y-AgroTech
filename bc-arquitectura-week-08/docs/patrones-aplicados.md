# Patrones de Diseño Aplicados - AgroTech

Este documento describe los 5 patrones de diseño incorporados en la arquitectura de la semana 04 para mejorar la reusabilidad, mantenimiento e integración de procesos de AgroTech.

---

## Patrón 1: Singleton (Creacional)

### Problema Original
Las clases de repositorios (`MaquinariaRepository` y `ReservaRepository`) podían ser instanciadas múltiples veces usando `new Repository()`. Si bien se exportaba por defecto una sola instancia en ES Modules, nada prohibía que otro desarrollador la instanciara de nuevo, provocando inconsistencia de las colecciones `Map` mantenidas en memoria.

### Solución
Se incluyó el chequeo estático `#instance` en el constructor y el método `getInstance()` para asegurar una única fuente de verdad en el espacio de la memoria, reforzando el principio de _Single Responsibility_.

---

## Patrón 2: Factory Method (Creacional)

### Problema Original
La creación de entidades de `Maquinaria` insertaba en bruto todos los objetos recibidos desde Express hacia el repositorio, sin contemplar que un tractor puede requerir un tipo de validación o campos automáticos distintos a una sembradora (por ejemplo: si requiere o no operador calificado).

### Solución
Implementación de la clase `MaquinariaFactory.js`, la cual toma la carga y genera parámetros extendidos y automáticos basándose en el campo de entrada genérico `tipo`, estandarizando los objetos dentro del servicio bajo la dinámica del factor.

---

## Patrón 3: Adapter (Estructural)

### Problema Original
AgroTech está desarrollando integraciones de localización. Los tractores vienen con sistemas GPS Legacy antiguos que proveen sus datos en XML crudo o en posiciones de texto no interpretables para el frontend moderno de reservas.

### Solución
Implementación de lógica en `GPSAdapter.js` que toma los datos arrojados por los sistemas heredados y los unifica para nuestra API en un objeto formal JSON `{lat, lng, lastUpdated}` facilitando la extensibilidad.

---

## Patrón 4: Decorator (Estructural)

### Problema Original
Se requería medir el tiempo y registrar información cada vez que se usa el servicio de Maquinarias, idealmente sin tener que inyectar código de logs directamente en cada función dentro de `MaquinariaService`, logrando ensuciar su lógica de dominio puro (Violando Single Responsibility Principio).

### Solución
Creación de `LoggingDecorator.js`, el cual es inyectado desde `maquinaria.controller.js` envolviendo (wrapping) el `maquinariaService` real y añadiendo operaciones anexadas sin alterar la implementación principal de negocio.

---

## Patrón 5: Observer (Comportamiento)

### Problema Original
Cuando una reserva es confirmada, cambiada de estado o actualizada en el repositorio de `ReservaService`, se necesitaba disparar métodos a módulos completamente separados (para envío de emails y para auditoría), provocando acoples altos con importaciones forzadas.

### Solución
Se incluyó `EventBus.js` que funciona como nuestro bus observador global, al cual se han adjuntado `EmailObserver` y `AuditObserver` e inyectado al inicio del sistema `index.js`.
