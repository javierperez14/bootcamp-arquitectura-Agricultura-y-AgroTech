# 🌾 Aplicación de Principios SOLID  
## Proyecto: Agricultura y AgroTech – Semana 02

Este documento explica cómo se aplican los **Principios SOLID** dentro del proyecto, usando el dominio realista de **gestión de maquinaria agrícola compartida, sensores ambientales y drones de monitoreo**.

---

# ⭐ 1. S — Single Responsibility Principle (Responsabilidad Única)

Cada clase del proyecto tiene **una sola razón para cambiar**:

### ✔ Entidades
- **Maquinaria** → solo representa maquinaria agrícola.
- **Sensor** → solo representa un sensor ambiental.
- **Drone** → solo representa un dron agrícola.

### ✔ Services
- `MaquinariaService` → gestiona reglas de maquinaria.
- `DroneService` → gestiona reglas de drones.
- (Pueden existir otros para sensores sin romper nada)

### ✔ Validators
Un validador **solo valida**, nunca guarda ni modifica datos.

Ejemplo:

```js
validate(entity) {
  if (!entity.nombre) throw new Error("La maquinaria debe tener nombre");
}
