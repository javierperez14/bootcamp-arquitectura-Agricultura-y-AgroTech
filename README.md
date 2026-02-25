# 🌾 Bootcamp de Arquitectura de Software - SENA
## Proyecto Integrador: Sistema AgroTech

Este repositorio contiene el trabajo realizado durante el bootcamp de Arquitectura de Software del tecnólogo ADSO en el SENA Bogotá. El proyecto se centra en el desarrollo de un sistema de gestión de maquinaria agrícola compartida con integración IoT.

---

## 📂 Estructura del Proyecto

```
bc-arquitectura-week-01/  → Semana 1: Definición del dominio y planificación
bc-arquitectura-week-02/  → Semana 2: Implementación con principios SOLID
bc-arquitectura-week-03/  → Semana 3: Selección de patrón arquitectónico
```

---

## 📅 Resumen por Semana

### 🗓️ Semana 01: Definición del Dominio y Planificación Inicial

**Carpeta**: `bc-arquitectura-week-01/`

**¿Qué hice?**

En esta primera semana definí el problema que resuelve el proyecto y establecí las bases del sistema:

- **Problema identificado**: Pequeños y medianos agricultores no tienen acceso a maquinaria agrícola por los altos costos, lo que reduce su productividad.

- **Solución propuesta**: Plataforma digital para alquilar y compartir maquinaria agrícola (tractores, sembradoras, fumigadoras, cosechadoras).

- **Usuarios principales**:
  - Propietarios de maquinaria (publican y alquilan)
  - Agricultores arrendatarios (buscan y solicitan)
  - Administradores del sistema (supervisan y gestionan)

- **Funcionalidades clave**:
  - Registro de usuarios y maquinaria
  - Búsqueda por zona, precio y tipo
  - Sistema de solicitudes y confirmación de alquiler
  - Pagos y calificaciones
  - Panel de administración

- **Decisiones técnicas**:
  - **Metodología**: Scrum (sprints semanales)
  - **Arquitectura inicial**: Monolito modular (simple y rápido)
  - **Stack tecnológico**: Node.js + PostgreSQL + React + Git

**Entregables**:
- README.md con análisis del problema
- Diagrama conceptual del sistema
- Definición de usuarios y funcionalidades

---

### 🗓️ Semana 02: Implementación con Principios SOLID

**Carpeta**: `bc-arquitectura-week-02/`

**¿Qué hice?**

En la segunda semana implementé una arquitectura modular aplicando los 5 principios SOLID sobre el dominio AgroTech:

- **Arquitectura implementada**:
  - **Domain**: Entidades (Maquinaria, Sensor, Drone) + Interfaces
  - **Repositories**: Implementación en memoria para persistencia
  - **Services**: Lógica de negocio especializada por recurso
  - **Validators**: Validación de entidades
  - **Tests**: Pruebas unitarias sin frameworks externos

- **Principios SOLID aplicados**:
  - **S** - Single Responsibility: Cada clase tiene una única responsabilidad
  - **O** - Open/Closed: Extensible sin modificar código existente
  - **L** - Liskov Substitution: Interfaces intercambiables
  - **I** - Interface Segregation: Interfaces específicas y pequeñas
  - **D** - Dependency Inversion: Dependencias hacia abstracciones

- **Funcionalidades base**:
  - Crear y administrar maquinaria agrícola
  - Registrar sensores ambientales
  - Gestionar drones para monitoreo
  - Validaciones por entidad
  - Repositorio en memoria

**Entregables**:
- Código fuente con arquitectura modular
- SOLID-APLICADO.md explicando cada principio
- Tests básicos
- README.md con instrucciones de ejecución

**Ejecutar el proyecto**:
```bash
cd bc-arquitectura-week-02
node src/index.js
```

---

### 🗓️ Semana 03: Selección de Patrón Arquitectónico

**Carpeta**: `bc-arquitectura-week-03/`

**¿Qué hice?**

En la tercera semana analicé y seleccioné el patrón arquitectónico más adecuado para el sistema AgroTech:

- **Patrón seleccionado**: **Arquitectura Hexagonal (Ports & Adapters)** ✅

- **Proceso de decisión**:
  - Análisis de requisitos no funcionales (escalabilidad, performance, mantenibilidad)
  - Evaluación de 3 opciones arquitectónicas:
    1. Arquitectura en Capas (290 puntos)
    2. **Arquitectura Hexagonal (450 puntos)** ← Ganadora
    3. Arquitectura Basada en Eventos (320 puntos)
  - Matriz de decisión con 6 criterios ponderados
  - ADR (Architecture Decision Record) completo

- **¿Por qué Arquitectura Hexagonal?**:
  - Dominio puro e independiente de tecnologías
  - Fácil testing con mocks
  - Flexibilidad para cambiar bases de datos y protocolos IoT
  - Múltiples interfaces (API REST, CLI, WebSocket)
  - Excelente mantenibilidad a largo plazo

- **Componentes de la arquitectura**:
  - **Núcleo**: Entidades de dominio (Maquinaria, Sensor, Estación)
  - **Puertos de entrada**: Services que exponen lógica de negocio
  - **Puertos de salida**: Interfaces para persistencia, notificaciones, IoT
  - **Adaptadores primarios**: API REST, CLI, WebSocket
  - **Adaptadores secundarios**: MongoDB, MQTT, Email, SMS

**Entregables**:
- PATRON-SELECCIONADO.md (ADR completo con matriz de decisión)
- diagrama-arquitectura.md (diagramas Mermaid detallados)
- README.md con resumen ejecutivo

---

## 🎯 Evolución del Proyecto

| Semana | Enfoque                  | Resultado                                                |
| :----: | ------------------------ | -------------------------------------------------------- |
|   01   | Análisis y Planificación | Dominio definido + Stack tecnológico + Metodología      |
|   02   | Implementación SOLID     | Código modular + Separación de responsabilidades        |
|   03   | Arquitectura             | Patrón hexagonal seleccionado + Diagramas + ADR          |
|   04   | *(Próxima)*              | Diseño de API REST + Adaptador MQTT + Casos de uso      |

---

## 🛠️ Stack Tecnológico

- **Lenguaje**: JavaScript ES2023
- **Runtime**: Node.js
- **Patrón**: Arquitectura Hexagonal (Ports & Adapters)
- **Base de Datos**: PostgreSQL (planificado), MongoDB (alternativa)
- **Frontend**: React (planificado)
- **Protocolos IoT**: MQTT, HTTP, WebSockets
- **Control de versiones**: Git + GitHub
- **Diagramas**: Mermaid
- **Metodología**: Scrum

---

## 📊 Requisitos No Funcionales Priorizados

| Requisito      | Nivel      | Justificación                                        |
| -------------- | ---------- | ---------------------------------------------------- |
| Escalabilidad  | Alto ⭐⭐⭐⭐⭐ | Crecimiento de 100 a 10,000+ dispositivos IoT       |
| Performance    | Alto ⭐⭐⭐⭐⭐ | Procesamiento en tiempo real (<2s respuesta)         |
| Mantenibilidad | Alto ⭐⭐⭐⭐⭐ | Equipo pequeño necesita código claro y organizado   |
| Disponibilidad | Medio ⭐⭐⭐  | 99% disponibilidad, tolerancia a breves interrupciones |
| Seguridad      | Medio-Alto ⭐⭐⭐⭐ | Protección de datos y control de acceso          |

---

## 🎓 Aprendizajes Clave

1. **Semana 01**: Importancia de definir bien el problema antes de programar
2. **Semana 02**: Los principios SOLID hacen el código más mantenible y testeable
3. **Semana 03**: La arquitectura correcta facilita la evolución del sistema sin reescribir todo

---

## 👨‍💻 Autor

**Javier Pérez**  
Tecnólogo en Análisis y Desarrollo de Software  
SENA - Centro de Servicios Financieros, Bogotá  
Tercer Trimestre - Competencia: Arquitectura de Software

---

## 📚 Referencias Consultadas

- "Clean Architecture" - Robert C. Martin
- "Hexagonal Architecture Explained" - Juan Manuel Garrido de Paz
- [Hexagonal Architecture by Alistair Cockburn](https://alistair.cockburn.us/hexagonal-architecture/)
- [Ports and Adapters Pattern](https://herbertograca.com/2017/09/14/ports-adapters-architecture/)
- Principios SOLID - Robert C. Martin

---

## 📅 Información del Proyecto

- **Proyecto**: Sistema de Gestión AgroTech
- **Dominio**: Agricultura y Tecnología IoT
- **Período**: Febrero 2026
- **Metodología**: Proyecto Integrador SENA
- **Duración**: 6 meses (MVP)

---

**Nota**: Este proyecto es parte del proceso formativo del tecnólogo ADSO en el SENA. La arquitectura definida se implementará progresivamente en las siguientes semanas del proyecto integrador.
