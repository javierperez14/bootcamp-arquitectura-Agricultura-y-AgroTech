# 🌾 Bootcamp de Arquitectura de Software - SENA
## Proyecto Integrador: Sistema AgroTech

Este repositorio contiene el trabajo realizado durante el bootcamp de Arquitectura de Software del tecnólogo ADSO en el SENA Bogotá. El proyecto se centra en el desarrollo de un sistema de gestión de maquinaria agrícola compartida con integración IoT.

---

## 📂 Estructura del Proyecto

```
bc-arquitectura-week-01/  → Semana 1: Definición del dominio y planificación
bc-arquitectura-week-02/  → Semana 2: Implementación con principios SOLID
bc-arquitectura-week-03/  → Semana 3: Selección de patrón arquitectónico
bc-arquitectura-week-04/  → Semana 4: API REST con OpenAPI y Swagger
bc-arquitectura-week-05/  → Semana 5: Patrones de diseño GoF
bc-arquitectura-week-06/  → Semana 6: Arquitectura Hexagonal (Ports & Adapters)
bc-arquitectura-week-07/  → Semana 7: Persistencia real con PostgreSQL y Docker
bc-arquitectura-week-08/  → Semana 8: Autenticación y seguridad con JWT
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

### 🗓️ Semana 04: API REST con OpenAPI y Swagger

**Carpeta**: `bc-arquitectura-week-04/`

**¿Qué hice?**

En la cuarta semana diseñé e implementé una API REST completa con documentación OpenAPI/Swagger para el dominio AgroTech:

- **API REST funcional**:
  - CRUD completo de maquinaria agrícola
  - Sistema de reservas y alquileres
  - Filtros avanzados (tipo, ubicación, disponibilidad)
  - Paginación en todos los listados
  - Manejo centralizado de errores
  - Respuestas HTTP estandarizadas

- **Arquitectura en capas**:
  - **Routes**: Enrutamiento HTTP
  - **Controllers**: Manejo de peticiones
  - **Services**: Lógica de negocio y validaciones
  - **Repositories**: Acceso a datos (in-memory)
  - **Middleware**: Error handler global
  - **Utils**: HTTP Response y API Error

- **Documentación OpenAPI 3.0**:
  - Especificación completa en `openapi.yaml`
  - 2 recursos principales (Maquinaria y Reservas)
  - Schemas reutilizables
  - Ejemplos realistas
  - Respuestas de error documentadas (400, 404, 409, 500)

- **Swagger UI integrado**:
  - Documentación interactiva en `/api-docs`
  - Pruebas directas desde el navegador
  - Visualización de schemas y ejemplos

- **Endpoints implementados**:
  - `GET /api/v1/maquinaria` - Listar con filtros y paginación
  - `GET /api/v1/maquinaria/:id` - Obtener por ID
  - `POST /api/v1/maquinaria` - Crear maquinaria
  - `PUT /api/v1/maquinaria/:id` - Actualizar completo
  - `PATCH /api/v1/maquinaria/:id` - Actualizar parcial
  - `DELETE /api/v1/maquinaria/:id` - Eliminar
  - `GET /api/v1/reservas` - Listar reservas
  - `POST /api/v1/reservas` - Crear reserva
  - `PATCH /api/v1/reservas/:id` - Actualizar estado

- **Validaciones de negocio**:
  - Validación de campos requeridos y tipos de datos
  - Verificación de disponibilidad de maquinaria
  - Cálculo automático de costos de reserva
  - Validación de fechas

**Entregables**:
- openapi.yaml (especificación OpenAPI 3.0 completa)
- Código fuente con arquitectura en capas
- diagrama-componentes.md (diagrama Mermaid detallado)
- tests/api.http (35 casos de prueba)
- README-PROYECTO.md con documentación completa

**Ejecutar el proyecto**:
```bash
cd bc-arquitectura-week-04
npm install
npm run dev
# Abrir http://localhost:3000/api-docs
```

---

### 🗓️ Semana 05: Patrones de Diseño GoF

**Carpeta**: `bc-arquitectura-week-05/`

**¿Qué hice?**

En la quinta semana integré 6 patrones de diseño del catálogo GoF sobre la API de la semana anterior, mejorando la reusabilidad, el desacoplamiento y la extensibilidad del sistema:

- **Patrones creacionales**:
  - **Singleton**: Los repositorios en memoria (`MaquinariaRepository`, `ReservaRepository`) garantizan una única instancia con `#instance` estático, evitando inconsistencias en los `Map` de datos
  - **Factory Method**: `MaquinariaFactory.js` encapsula la creación de objetos según el `tipo` (tractor, sembradora, etc.), asignando atributos automáticos como `requiereLicencia`

- **Patrones estructurales**:
  - **Adapter**: `GPSAdapter.js` traduce datos de GPS Legacy en formato XML a JSON estándar `{lat, lng, lastUpdated}` para el frontend
  - **Decorator**: `LoggingDecorator.js` envuelve `MaquinariaService` para medir tiempos de ejecución sin modificar la lógica de negocio

- **Patrones de comportamiento**:
  - **Observer**: `EventBus.js` desacopla la emisión de eventos (`RESERVA_CREATED`) de los observadores (`EmailObserver`, `AuditObserver`)
  - **Strategy**: `PricingStrategy.js` permite cambiar dinámicamente el cálculo de precios entre `HourlyPricingStrategy` y `DailyPricingStrategy`

- **Cohesión de patrones**: Los 6 patrones trabajan en conjunto en el flujo de una reserva: Decorator mide → Factory crea → Singleton persiste → Strategy calcula → Observer notifica

**Entregables**:
- Código fuente con 6 patrones implementados en `src/patterns/`
- docs/patrones-aplicados.md con análisis antes/después de cada patrón
- Diagramas UML por patrón en `docs/diagramas/`
- `src/patterns/demo.js` para ejecutar todos los patrones

**Ejecutar el proyecto**:
```bash
cd bc-arquitectura-week-05
npm install
npm run dev
# Demo de patrones:
node src/patterns/demo.js
```

---

### 🗓️ Semana 06: Arquitectura Hexagonal (Ports & Adapters)

**Carpeta**: `bc-arquitectura-week-06/`

**¿Qué hice?**

En la sexta semana migré la API a una **Arquitectura Hexagonal real**, separando el dominio de la infraestructura mediante puertos y adaptadores:

- **Estructura hexagonal implementada**:
  - **`domain/`**: Núcleo puro del negocio, sin dependencias externas
    - `entities/`: Entidades de dominio (`Maquinaria`, `Reserva`)
    - `aggregates/`: Agregados con lógica de consistencia (`ReservaAggregate`)
    - `value-objects/`: Objetos de valor inmutables (`Precio`, `FechaReserva`)
    - `services/`: Servicios de dominio (`ReservaDomainService`)
    - `ports/primary/`: Interfaces de entrada (casos de uso)
    - `ports/secondary/`: Interfaces de salida (repositorios, notificaciones)
  - **`application/`**: Orquestación de casos de uso
    - `use-cases/`: `ConsultarMaquinariaUseCase`, `CrearReservaUseCase`, `ActualizarReservaUseCase`
  - **`infrastructure/`**: Adaptadores secundarios (implementaciones concretas)
    - `repositories/`: Repositorios en memoria que implementan los puertos
    - `notifications/`: Adaptadores de notificación
  - **`interfaces/`**: Adaptadores primarios (HTTP)
    - `http/controllers/`, `http/routes/`, `http/middlewares/`

- **Patrones de diseño mantenidos**: Singleton, Factory Method, Adapter (GPS), Decorator (Logging), Observer (EventBus)

- **Beneficios logrados**:
  - Dominio completamente aislado y testeable sin Express ni base de datos
  - Fácil sustitución de adaptadores (cambiar repositorio en memoria por PostgreSQL sin tocar el dominio)
  - Separación clara entre lógica de negocio e infraestructura

**Entregables**:
- Código fuente con arquitectura hexagonal completa
- docs/diagrama-componentes.md actualizado
- docs/patrones-aplicados.md
- tests/api.http con casos de prueba

**Ejecutar el proyecto**:
```bash
cd bc-arquitectura-week-06
npm install
npm run dev
# Abrir http://localhost:3000/api-docs
```

---

### 🗓️ Semana 07: Persistencia Real con PostgreSQL y Docker

**Carpeta**: `bc-arquitectura-week-07/`

**¿Qué hice?**

En la séptima semana reemplacé el almacenamiento en memoria por **PostgreSQL real**, integrando Docker para el entorno de base de datos:

- **Integración de PostgreSQL**:
  - `src/db/pool.js`: Pool de conexiones con `pg` (node-postgres)
  - `src/db/migrations.js`: Migraciones automáticas al iniciar el servidor (creación de tablas)
  - `src/config.js`: Configuración centralizada de variables de entorno
  - `.env.example`: Plantilla de variables de entorno (`DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`)

- **Repositorios duales**:
  - `src/infrastructure/repositories/`: Repositorios PostgreSQL que implementan los puertos del dominio
  - `src/repositories/`: Repositorios en memoria mantenidos como fallback/testing

- **Dockerización**:
  - `Dockerfile`: Imagen de la aplicación Node.js
  - `docker-compose.yml`: Orquestación de app + PostgreSQL para desarrollo
  - `docker-compose.prod.yml`: Configuración para producción

- **Arquitectura hexagonal preservada**: El dominio no cambió; solo se sustituyeron los adaptadores de repositorio, demostrando la flexibilidad del patrón

- **Casos de uso implementados**:
  - `ConsultarMaquinariaUseCase`
  - `CrearReservaUseCase`
  - `ActualizarReservaUseCase`

**Entregables**:
- Código fuente con repositorios PostgreSQL
- Dockerfile y docker-compose.yml
- src/db/migrations.js con esquema de base de datos
- .env.example con variables requeridas

**Ejecutar el proyecto**:
```bash
cd bc-arquitectura-week-07
# Con Docker (recomendado):
docker-compose up
# Sin Docker (requiere PostgreSQL local):
cp .env.example .env  # Configurar variables
npm install
npm run dev
```

---

### 🗓️ Semana 08: Autenticación y Seguridad con JWT

**Carpeta**: `bc-arquitectura-week-08/`

**¿Qué hice?**

En la octava semana implementé un sistema completo de **autenticación y seguridad** sobre la arquitectura hexagonal con PostgreSQL:

- **Autenticación JWT**:
  - `src/infrastructure/security/token.service.js`: Generación y verificación de tokens JWT con `jsonwebtoken`
  - `src/infrastructure/security/password.service.js`: Hash y verificación de contraseñas con `bcrypt`
  - `src/infrastructure/repositories/in-memory-user.repository.js`: Repositorio de usuarios

- **Casos de uso de autenticación**:
  - `src/application/use-cases/register-user.use-case.js`: Registro de nuevos usuarios con hash de contraseña
  - `src/application/use-cases/login-user.use-case.js`: Login con validación de credenciales y emisión de JWT

- **Seguridad de la API**:
  - **`helmet`**: Headers HTTP de seguridad (XSS, CSRF, clickjacking)
  - **`express-rate-limit`**: Limitación de peticiones por IP para prevenir ataques de fuerza bruta
  - **`cors`**: Control de orígenes permitidos
  - Middleware de autenticación para proteger rutas privadas

- **Arquitectura hexagonal preservada**:
  - Los servicios de seguridad viven en `infrastructure/security/` como adaptadores secundarios
  - El dominio no tiene dependencias de JWT ni bcrypt
  - Los casos de uso de auth orquestan los puertos de seguridad

- **Estructura de seguridad**:
  ```
  src/infrastructure/security/
  ├── password.service.js   # bcrypt hash/verify
  └── token.service.js      # JWT sign/verify
  ```

**Entregables**:
- Sistema de autenticación JWT completo
- Middleware de seguridad (helmet, rate-limit, cors)
- Casos de uso de registro y login
- Repositorio de usuarios
- Dockerfile y docker-compose actualizados

**Ejecutar el proyecto**:
```bash
cd bc-arquitectura-week-08
# Con Docker (recomendado):
docker-compose up
# Sin Docker:
cp .env.example .env  # Configurar JWT_SECRET, DB_* y demás variables
npm install
npm run dev
# Abrir http://localhost:3000/api-docs
```

---

## 🎯 Evolución del Proyecto

| Semana | Enfoque                        | Resultado                                                        |
| :----: | ------------------------------ | ---------------------------------------------------------------- |
|   01   | Análisis y Planificación       | Dominio definido + Stack tecnológico + Metodología              |
|   02   | Implementación SOLID           | Código modular + Separación de responsabilidades                |
|   03   | Arquitectura                   | Patrón hexagonal seleccionado + Diagramas + ADR                  |
|   04   | API REST + OpenAPI             | API funcional + Swagger UI + Documentación completa              |
|   05   | Patrones de Diseño GoF         | 6 patrones integrados + Desacoplamiento + Extensibilidad        |
|   06   | Arquitectura Hexagonal         | Domain/Application/Infrastructure/Interfaces + Ports & Adapters |
|   07   | PostgreSQL + Docker            | Persistencia real + Migraciones + Dockerización                  |
|   08   | Autenticación y Seguridad      | JWT + bcrypt + helmet + rate-limit + Rutas protegidas           |

---

## 🛠️ Stack Tecnológico

- **Lenguaje**: JavaScript ES2023 (ES Modules)
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Base de Datos**: PostgreSQL (semanas 7-8), In-Memory Map (semanas 4-6)
- **Autenticación**: JWT + bcrypt
- **Seguridad**: helmet, express-rate-limit, cors
- **Documentación**: OpenAPI 3.0 + Swagger UI
- **Contenedores**: Docker + Docker Compose
- **Patrón**: Arquitectura Hexagonal (Ports & Adapters)
- **Control de versiones**: Git + GitHub
- **Diagramas**: Mermaid
- **Metodología**: Scrum

---

## 📊 Requisitos No Funcionales Priorizados

| Requisito      | Nivel           | Justificación                                        |
| -------------- | --------------- | ---------------------------------------------------- |
| Escalabilidad  | Alto ⭐⭐⭐⭐⭐     | Crecimiento de 100 a 10,000+ dispositivos IoT       |
| Performance    | Alto ⭐⭐⭐⭐⭐     | Procesamiento en tiempo real (<2s respuesta)         |
| Mantenibilidad | Alto ⭐⭐⭐⭐⭐     | Equipo pequeño necesita código claro y organizado   |
| Disponibilidad | Medio ⭐⭐⭐       | 99% disponibilidad, tolerancia a breves interrupciones |
| Seguridad      | Medio-Alto ⭐⭐⭐⭐ | Protección de datos y control de acceso             |

---

## 🎓 Aprendizajes Clave

1. **Semana 01**: Importancia de definir bien el problema antes de programar
2. **Semana 02**: Los principios SOLID hacen el código más mantenible y testeable
3. **Semana 03**: La arquitectura correcta facilita la evolución del sistema sin reescribir todo
4. **Semana 04**: Una API bien documentada con OpenAPI facilita la integración y el trabajo en equipo
5. **Semana 05**: Los patrones de diseño resuelven problemas recurrentes con soluciones probadas y desacoplan responsabilidades
6. **Semana 06**: La arquitectura hexagonal permite que el dominio sea independiente de frameworks y bases de datos
7. **Semana 07**: Docker simplifica la gestión de entornos y PostgreSQL aporta persistencia real sin cambiar el dominio
8. **Semana 08**: La seguridad debe diseñarse como parte de la arquitectura, no añadirse al final

---

## 📅 Información del Proyecto

- **Proyecto**: Sistema de Gestión AgroTech
- **Dominio**: Agricultura y Tecnología IoT
- **Período**: Febrero - Abril 2026
- **Metodología**: Proyecto Integrador SENA
- **Autor**: Javier Pérez — Tecnólogo ADSO, SENA Bogotá
