# 🌾 Semana 03 - Definición de Patrón Arquitectónico

## 📋 Descripción

En esta semana del proyecto integrador, he definido y justificado el **patrón arquitectónico** que utilizaré para el desarrollo del Sistema AgroTech. Este trabajo es parte de la competencia de Arquitectura de Software del tecnólogo ADSO en el SENA Bogotá.

## 🎯 Objetivo de la Semana

Seleccionar el patrón arquitectónico más adecuado para el dominio de Agricultura y AgroTech, documentando la decisión mediante:
- Análisis de requisitos no funcionales
- Matriz de decisión comparativa
- ADR (Architecture Decision Record)
- Diagramas de arquitectura

## 🏗️ Patrón Seleccionado

**Arquitectura Hexagonal (Ports & Adapters)**

### Justificación en una línea
La arquitectura hexagonal permite aislar la lógica de negocio agrícola de detalles técnicos, facilitando la integración de múltiples dispositivos IoT y la evolución tecnológica sin afectar el dominio.

## 📁 Estructura de Entrega

```
bc-arquitectura-week-03/
├── PATRON-SELECCIONADO.md      # ADR completo con decisión arquitectónica
├── diagrama-arquitectura.md    # Diagramas detallados con Mermaid
└── README.md                   # Este archivo - Resumen ejecutivo
```

## 📊 Contenido de los Documentos

### 1. PATRON-SELECCIONADO.md
Documento ADR (Architecture Decision Record) que incluye:
- **Contexto del dominio**: Sistema AgroTech para gestión de maquinaria y sensores IoT
- **Requisitos identificados**: Funcionales y no funcionales
- **Opciones evaluadas**: 3 patrones arquitectónicos comparados
  - Arquitectura en Capas
  - Arquitectura Hexagonal ✅ (Seleccionada)
  - Arquitectura Basada en Eventos
- **Matriz de decisión**: Evaluación cuantitativa con 6 criterios ponderados
- **Consecuencias**: Positivas, negativas y riesgos
- **Diagrama Mermaid**: Visualización de la arquitectura

### 2. diagrama-arquitectura.md
Diagramas y explicaciones detalladas:
- **Vista de alto nivel**: Diagrama Mermaid con colores
- **Componentes principales**: Entidades, servicios, adaptadores
- **Capas del patrón**: Adaptadores primarios, núcleo, adaptadores secundarios
- **Flujo de datos**: Ejemplo completo de creación de maquinaria
- **Integraciones externas**: BD, APIs y servicios
- **Estructura de directorios**: Organización del código

### 3. README.md
Este documento con el resumen ejecutivo del trabajo realizado.

## 🎨 Diagrama de Alto Nivel

```
┌─────────────────────────────────────────────────────────┐
│                  ADAPTADORES PRIMARIOS                  │
│         (API REST, CLI, WebSocket)                      │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   NÚCLEO HEXAGONAL                      │
│  ┌─────────────────────────────────────────────────┐   │
│  │         Puertos de Entrada (Services)           │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │    Entidades: Maquinaria, Sensor, Estación      │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Puertos de Salida (Repository, Notifications)  │   │
│  └─────────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                ADAPTADORES SECUNDARIOS                  │
│    (MongoDB, MQTT, Email, SMS)                          │
└─────────────────────────────────────────────────────────┘
```

## 📈 Resultado de la Matriz de Decisión

| Patrón Arquitectónico        | Puntuación | Resultado |
| ---------------------------- | :--------: | :-------: |
| Arquitectura en Capas        |    290     |           |
| **Arquitectura Hexagonal**   |  **450**   |    ✅     |
| Arquitectura Basada en Eventos |    320     |           |

**Ganador**: Arquitectura Hexagonal con 450 puntos

## ✨ Características Principales

- **Dominio Puro**: Lógica de negocio independiente de frameworks y tecnologías
- **Múltiples Interfaces**: API REST, CLI, WebSocket para diferentes clientes
- **Flexibilidad IoT**: Adaptadores para MQTT, HTTP y otros protocolos de sensores
- **Testeable**: Dominio testeable sin dependencias externas
- **Evolutivo**: Cambiar tecnologías sin afectar el core del sistema

## 🎯 Requisitos No Funcionales Priorizados

| Requisito      | Nivel      | Justificación                                                    |
| -------------- | ---------- | ---------------------------------------------------------------- |
| Escalabilidad  | Alto ⭐⭐⭐⭐⭐ | Crecimiento de 100 a 10,000+ dispositivos IoT                   |
| Performance    | Alto ⭐⭐⭐⭐⭐ | Procesamiento en tiempo real (<2s respuesta)                     |
| Mantenibilidad | Alto ⭐⭐⭐⭐⭐ | Equipo pequeño necesita código claro y organizado               |
| Disponibilidad | Medio ⭐⭐⭐  | Tolerancia a breves interrupciones, 99% disponibilidad          |
| Seguridad      | Medio-Alto ⭐⭐⭐⭐ | Protección de datos y control de acceso a maquinaria costosa |

## 🔄 Continuidad del Proyecto

Este trabajo se construye sobre las semanas anteriores:

- **Semana 01**: Selección del dominio AgroTech y modelado inicial
- **Semana 02**: Aplicación de principios SOLID e implementación base
- **Semana 03**: Definición de patrón arquitectónico ← **ESTÁS AQUÍ**

### Próximos Pasos (Semana 04)
1. Diseñar contratos de API REST
2. Implementar adaptador MQTT para sensores
3. Crear casos de uso complejos (reservas, alertas)
4. Agregar validaciones avanzadas en dominio

## 🛠️ Tecnologías

- **Lenguaje**: JavaScript ES2023
- **Runtime**: Node.js
- **Patrón**: Arquitectura Hexagonal (Ports & Adapters)
- **Diagramas**: Mermaid
- **Testing**: Pruebas unitarias con mocks

## 📚 Referencias Consultadas

- "Clean Architecture" - Robert C. Martin
- "Hexagonal Architecture Explained" - Juan Manuel Garrido de Paz
- [Hexagonal Architecture by Alistair Cockburn](https://alistair.cockburn.us/hexagonal-architecture/)
- [Ports and Adapters Pattern](https://herbertograca.com/2017/09/14/ports-adapters-architecture/)

## 👨‍💻 Autor

**Javier Pérez**  
Tecnólogo en Análisis y Desarrollo de Software  
SENA - Centro de Servicios Financieros, Bogotá  
Tercer Trimestre - Competencia: Arquitectura de Software

## 📅 Información del Proyecto

- **Proyecto**: Sistema de Gestión AgroTech
- **Dominio**: Agricultura y Tecnología IoT
- **Semana**: 03 - Definición de Patrón Arquitectónico
- **Metodología**: Proyecto Integrador SENA

---

## 🔗 Enlaces a Documentos

- [📄 PATRON-SELECCIONADO.md](./PATRON-SELECCIONADO.md) - ADR completo con matriz de decisión
- [📊 diagrama-arquitectura.md](./diagrama-arquitectura.md) - Diagramas detallados y flujos de datos

---

**Nota**: Este proyecto es parte del proceso formativo del tecnólogo ADSO en el SENA. La arquitectura definida se implementará progresivamente en las siguientes semanas del proyecto integrador.
