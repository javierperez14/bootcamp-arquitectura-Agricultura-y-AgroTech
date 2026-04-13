# 🌾 AgroTech API - Sistema de Gestión de Maquinaria Agrícola

## 📋 Información del Proyecto

| Campo              | Valor                                                      |
| ------------------ | ---------------------------------------------------------- |
| **Proyecto**       | API REST para gestión de maquinaria agrícola compartida   |
| **Dominio**        | Agricultura y Tecnología (AgroTech)                        |
| **Semana**         | 04 - Diseño de Componentes y Comunicación                 |
| **Autor**          | Javier Pérez                                               |
| **Tecnología**     | Node.js + Express + OpenAPI 3.0                            |
| **Arquitectura**   | API REST con arquitectura en capas                         |

---

## 🎯 Descripción

API REST completa para la gestión de maquinaria agrícola compartida, permitiendo a propietarios publicar su maquinaria y a agricultores alquilarla de forma eficiente. El sistema incluye gestión de reservas, filtros avanzados, paginación y documentación interactiva con Swagger.

---

## ✨ Características Principales

- ✅ CRUD completo de maquinaria agrícola
- ✅ Sistema de reservas y alquileres
- ✅ Filtrado por tipo, ubicación y disponibilidad
- ✅ Paginación en todos los listados
- ✅ Validaciones de negocio robustas
- ✅ Manejo centralizado de errores
- ✅ Documentación OpenAPI 3.0 completa
- ✅ Swagger UI integrado
- ✅ Respuestas HTTP estandarizadas
- ✅ Arquitectura en capas (Routes → Controllers → Services → Repositories)

---

## 🚀 Cómo Ejecutar

### Prerrequisitos

- Node.js 18+ instalado
- npm o pnpm

### Instalación

```bash
# Clonar el repositorio
cd bc-arquitectura-week-04

# Instalar dependencias
npm install
# o
pnpm install
```

### Ejecutar en Desarrollo

```bash
# Modo desarrollo con auto-reload
npm run dev

# Modo producción
npm start
```

### Acceder a la API

Una vez iniciado el servidor:

- **API Base**: http://localhost:3000/api/v1
- **Documentación Swagger**: http://localhost:3000/api-docs
- **Endpoint raíz**: http://localhost:3000/

---

## 📚 Endpoints Implementados

### Maquinaria

| Método | Endpoint                    | Descripción                  |
| ------ | --------------------------- | ---------------------------- |
| GET    | `/api/v1/maquinaria`        | Listar maquinaria (paginado) |
| GET    | `/api/v1/maquinaria/:id`    | Obtener por ID               |
| POST   | `/api/v1/maquinaria`        | Crear nueva maquinaria       |
| PUT    | `/api/v1/maquinaria/:id`    | Actualizar completo          |
| PATCH  | `/api/v1/maquinaria/:id`    | Actualizar parcial           |
| DELETE | `/api/v1/maquinaria/:id`    | Eliminar maquinaria          |

#### Filtros Disponibles (GET)

- `tipo`: tractor, sembradora, cosechadora, fumigadora, arado
- `disponible`: true/false
- `ubicacion`: texto de búsqueda
- `page`: número de página (default: 1)
- `limit`: resultados por página (default: 10)

#### Ejemplo de Uso

```bash
# Listar tractores disponibles en Cundinamarca
GET /api/v1/maquinaria?tipo=tractor&disponible=true&ubicacion=Cundinamarca&page=1&limit=5
```

### Reservas

| Método | Endpoint                 | Descripción                |
| ------ | ------------------------ | -------------------------- |
| GET    | `/api/v1/reservas`       | Listar reservas (paginado) |
| GET    | `/api/v1/reservas/:id`   | Obtener por ID             |
| POST   | `/api/v1/reservas`       | Crear nueva reserva        |
| PATCH  | `/api/v1/reservas/:id`   | Actualizar estado          |

#### Filtros Disponibles (GET)

- `maquinariaId`: filtrar por maquinaria
- `usuarioId`: filtrar por usuario
- `estado`: pendiente, confirmada, en_uso, completada, cancelada
- `page`: número de página
- `limit`: resultados por página

---

## 📊 Formato de Respuestas

### Respuesta Exitosa

```json
{
  "success": true,
  "data": {
    "id": "maq-001",
    "nombre": "Tractor John Deere 5075E",
    "tipo": "tractor",
    "disponible": true
  },
  "timestamp": "2026-02-25T10:30:00.000Z"
}
```

### Respuesta con Paginación

```json
{
  "success": true,
  "data": [ /* array de resultados */ ],
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "totalPages": 3,
      "hasNext": true,
      "hasPrev": false
    }
  },
  "timestamp": "2026-02-25T10:30:00.000Z"
}
```

### Respuesta de Error

```json
{
  "success": false,
  "error": {
    "message": "Datos de entrada inválidos",
    "details": {
      "nombre": "El nombre es requerido",
      "tipo": "El tipo debe ser uno de: tractor, sembradora, cosechadora, fumigadora, arado"
    },
    "statusCode": 400
  },
  "timestamp": "2026-02-25T10:30:00.000Z"
}
```

---

## 🔧 Códigos de Estado HTTP

| Código | Uso                          |
| ------ | ---------------------------- |
| `200`  | Éxito en GET, PUT, PATCH     |
| `201`  | Recurso creado (POST)        |
| `204`  | Eliminación exitosa (DELETE) |
| `400`  | Error de validación          |
| `404`  | Recurso no encontrado        |
| `409`  | Conflicto (ej: duplicado)    |
| `500`  | Error interno del servidor   |

---

## 🏗️ Arquitectura del Proyecto

```
bc-arquitectura-week-04/
├── openapi.yaml                 # Especificación OpenAPI 3.0
├── package.json
├── docs/
│   └── diagrama-componentes.md  # Diagrama de arquitectura
├── src/
│   ├── index.js                 # Entry point + configuración Express
│   ├── swagger.js               # Configuración Swagger UI
│   ├── routes/
│   │   ├── maquinaria.routes.js
│   │   └── reserva.routes.js
│   ├── controllers/
│   │   ├── maquinaria.controller.js
│   │   └── reserva.controller.js
│   ├── services/
│   │   ├── maquinaria.service.js
│   │   └── reserva.service.js
│   ├── repositories/
│   │   ├── maquinaria.repository.js
│   │   └── reserva.repository.js
│   ├── middleware/
│   │   └── error-handler.js
│   └── utils/
│       ├── http-response.js
│       └── api-error.js
└── tests/
    └── api.http                 # Colección de pruebas (35 casos)
```

### Capas de la Arquitectura

```
┌─────────────────────────────────────┐
│   Routes (Enrutamiento HTTP)       │
├─────────────────────────────────────┤
│   Controllers (Manejo de Request)  │
├─────────────────────────────────────┤
│   Services (Lógica de Negocio)     │
├─────────────────────────────────────┤
│   Repositories (Acceso a Datos)    │
├─────────────────────────────────────┤
│   In-Memory Storage (Datos)        │
└─────────────────────────────────────┘
```

---

## 🧪 Pruebas

El archivo `tests/api.http` contiene **35 casos de prueba** que cubren:

- ✅ CRUD completo de maquinaria (éxito y errores)
- ✅ Filtros y paginación
- ✅ CRUD de reservas (éxito y errores)
- ✅ Validaciones de negocio
- ✅ Manejo de errores (400, 404, 409, 500)

### Ejecutar Pruebas

Puedes usar:
- **VS Code REST Client**: Instalar extensión y abrir `tests/api.http`
- **Postman**: Importar las peticiones manualmente
- **curl**: Copiar los comandos del archivo

---

## 💡 Decisiones de Diseño

### 1. Arquitectura en Capas

**Decisión**: Separar la aplicación en Routes → Controllers → Services → Repositories

**Razón**:
- Separación clara de responsabilidades
- Fácil testing de cada capa
- Mantenibilidad a largo plazo
- Escalabilidad (fácil migrar a BD real)

### 2. Respuestas HTTP Estandarizadas

**Decisión**: Usar formato consistente con `success`, `data`, `timestamp`

**Razón**:
- Clientes pueden parsear respuestas de forma predecible
- Facilita debugging
- Incluye metadata útil (paginación, timestamps)

### 3. Manejo Centralizado de Errores

**Decisión**: Middleware global de error handling

**Razón**:
- Evita duplicación de código
- Formato consistente de errores
- Logging centralizado
- Fácil agregar monitoreo

### 4. Validaciones en Capa de Servicio

**Decisión**: Validar datos en services, no en controllers

**Razón**:
- Lógica de negocio centralizada
- Reutilizable desde diferentes interfaces (API, CLI, etc.)
- Controllers solo manejan HTTP

### 5. Repositorio en Memoria

**Decisión**: Usar Map de JavaScript en lugar de BD real

**Razón**:
- Simplicidad para el MVP
- No requiere configuración externa
- Fácil migración a BD real (solo cambiar repositorio)
- Datos de prueba precargados

### 6. OpenAPI como Fuente de Verdad

**Decisión**: Documentar primero en OpenAPI, luego implementar

**Razón**:
- Contrato claro antes de codificar
- Swagger UI generado automáticamente
- Facilita comunicación con frontend
- Versionamiento de API

---

## 🔄 Continuidad con Semanas Anteriores

Este proyecto se construye sobre el trabajo de semanas previas:

| Semana | Concepto Aplicado                                    |
| ------ | ---------------------------------------------------- |
| 01     | Dominio AgroTech definido                            |
| 02     | Principios SOLID en la estructura de código          |
| 03     | Arquitectura Hexagonal como base conceptual          |
| 04     | API REST + OpenAPI + Arquitectura en capas           |

---

## 📈 Próximos Pasos (Semana 05)

1. Implementar autenticación y autorización (JWT)
2. Agregar base de datos real (PostgreSQL o MongoDB)
3. Implementar adaptador MQTT para sensores IoT
4. Agregar tests automatizados (Jest/Vitest)
5. Implementar caché con Redis
6. Agregar rate limiting y seguridad

---

## 📚 Documentación Adicional

- **OpenAPI Spec**: Ver `openapi.yaml` para especificación completa
- **Diagrama de Componentes**: Ver `docs/diagrama-componentes.md`
- **Colección de Pruebas**: Ver `tests/api.http`

---

## 🛠️ Tecnologías Utilizadas

- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.18
- **Documentación**: OpenAPI 3.0 + Swagger UI
- **Formato de Datos**: JSON
- **Persistencia**: In-Memory (Map)
- **Módulos**: ES Modules (type: "module")

---

## 👨‍💻 Autor

**Javier Pérez**  
Tecnólogo en Análisis y Desarrollo de Software  
SENA - Centro de Servicios Financieros, Bogotá  
Competencia: Arquitectura de Software

---

## 📅 Información de Entrega

- **Semana**: 04 - Diseño de Componentes y Comunicación
- **Fecha**: Febrero 2026
- **Evaluación**: 30% del total de la semana
- **Modalidad**: Individual

---

## 📝 Notas Finales

Este proyecto cumple con todos los requisitos de la actividad:

✅ Diagrama de componentes profesional (Mermaid)  
✅ Especificación OpenAPI 3.0 completa  
✅ API REST funcional con CRUD completo  
✅ Swagger UI integrado y accesible  
✅ Colección de pruebas exhaustiva (35 casos)  
✅ Arquitectura en capas bien definida  
✅ Manejo de errores centralizado  
✅ Respuestas HTTP estandarizadas  
✅ Filtros y paginación implementados  
✅ Código limpio y organizado  

---

**¡Gracias por revisar este proyecto! 🌾**
## Cohesión y Cooperación de Patrones (Arquitectura)
En la semana 5 se integraron patrones que no trabajan aisladamente, sino que arman un flujo orgánico:
1. Al recibir una solicitud, el **Decorator** intercepta e inicia el conteo de tiempo (midiendo rendimiento).
2. El **Factory Method** toma el JSON genérico del conductor y arma un objeto especializado de Maquinaria (`Tractor`, `Arado`).
3. Al almacenar en memoria interviene el **Singleton** (`EventLogger.js` y Repositorios) dictando integridad a los datos e impidiendo pérdida de estado.
4. Si se calcula la tarifa interviene el **Strategy**, orquestando costos por hora vs día en pleno vuelo.
5. Finalmente, al confirmarse, se usa el **Observer** para gatillar el registro sin acoplar la clase principal al servicio de e-mailing de la compañía.

## Extensibilidad a Futuro
Dado nuestro uso acoplado débilmente:
- Para agregar una nueva forma de Notificación (ej., `SMSObserver`), basta con instanciarlo y decir `EventBus.on('R_CREATED', new SMSObserver())`.
- Para agregar nuevo precio (`Semanas`), creas la subclase extendida de `PricingStrategy` y la añades al contexto, ahorrando refactors frágiles inmensos que romperían principios SOLID.

Puedes probar todos ellos ejecutando `node src/patterns/demo.js` o bien ejecutando con `node --test tests/patterns/`
