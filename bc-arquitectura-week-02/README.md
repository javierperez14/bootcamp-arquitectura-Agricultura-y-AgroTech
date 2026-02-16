# 🌾 Agricultura y AgroTech – Proyecto Semana 02

Este proyecto implementa una arquitectura modular aplicando principios **SOLID** sobre un dominio realista:  
**Gestión de maquinaria agrícola compartida**, sensores climáticos y drones.

## ✔️ Funcionalidades base

- Crear y administrar maquinaria agrícola
- Registrar sensores ambientales
- Gestionar drones para monitoreo
- Validaciones por entidad
- Repositorio en memoria
- Servicios especializados por tipo de recurso

## ✔️ Arquitectura Aplicada

- **Domain** → Entidades + Interfaces
- **Repositories** → Implementación en memoria
- **Services** → Reglas de negocio
- **Validators** → Validación de entidades
- **Tests** → Pruebas simples sin frameworks externos

## ✔️ Ejecutar proyecto

```bash
node src/index.js
