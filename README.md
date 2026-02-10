# 🌾 Plataforma de Maquinaria Agrícola Compartida – Proyecto Bootcamp

## 1️⃣ ¿Qué Problema Resuelve?

En muchas zonas rurales los pequeños y medianos agricultores no cuentan con maquinaria agrícola propia debido a los altos costos de compra, mantenimiento y almacenamiento. Esto genera baja eficiencia en sus cultivos y dependencia de terceros que, en muchos casos, no están disponibles cuando se necesitan.

Este sistema busca resolver esa problemática ofreciendo una **plataforma digital donde los agricultores puedan alquilar, compartir o solicitar maquinaria agrícola** como tractores, sembradoras, fumigadoras o cosechadoras de forma segura y organizada.

El sistema será utilizado tanto por los propietarios de la maquinaria que desean generar ingresos alquilándola, como por agricultores que la necesitan por horas o días. Es importante porque permite optimizar recursos, reducir costos y aumentar la productividad agrícola sin necesidad de grandes inversiones.

---

## 2️⃣ Usuarios Principales

1. **Propietario de Maquinaria**  
   - Registra su maquinaria  
   - Define disponibilidad, precios y ubicación  
   - Acepta o rechaza solicitudes de alquiler  
   - Administra mantenimientos e historial de uso  

2. **Agricultor Arrendatario**  
   - Busca maquinaria disponible  
   - Solicita alquiler por día u hora  
   - Realiza pagos y deja calificaciones  
   - Consulta historial de alquileres  

3. **Administrador del Sistema**  
   - Supervisa registros y usuarios  
   - Valida documentación  
   - Gestiona reportes o disputas  
   - Monitorea estadísticas del sistema  

---

## 3️⃣ Funcionalidades Principales

- [ ] Registro e inicio de sesión
- [ ] Publicación de maquinaria con fotos, precio y disponibilidad
- [ ] Buscador de maquinaria por zona, precio o tipo
- [ ] Sistema de solicitudes de alquiler y confirmación
- [ ] Pagos en línea o pagos registrados
- [ ] Historial de alquileres y calificaciones
- [ ] Panel de administración para gestionar usuarios y validaciones

---

## 4️⃣ Decisiones Iniciales

### 📌 Metodología de Desarrollo  
**Elegí: Scrum**  

**¿Por qué?**  
Porque trabajaré por semanas y Scrum permite definir sprints cortos, revisar avances constantemente y ajustar el proyecto según las necesidades del bootcamp.

---

### 🧱 Arquitectura Inicial  
**Elegí: Monolito Modular**  

**¿Por qué?**  
Necesito empezar con una arquitectura simple, rápida de implementar y fácil de mantener. Más adelante (semana 6) evaluaré si migrar a microservicios.

---

### 🧰 Tecnologías Seleccionadas

- **Backend:** Node.js  
- **Base de Datos:** PostgreSQL  
- **Frontend:** React  
- **Control de versiones:** Git + GitHub  

---

**Autor:** Javier Pérez  
**Fecha:** Febrero 2026  
**Bootcamp:** Arquitectura de Software – SENA  

---

## 🖼️ Diagrama del Sistema

El diagrama conceptual se encuentra en este archivo:

**👉 diagrama.png**

Puedes visualizarlo así:

   ┌────────────────────┐
   │ Agricultor         │
   │ (Arrendatario)     │
   └───────┬────────────┘
           │  Busca y alquila
           ▼
   ┌──────────────────────────┐
   │ Plataforma de            │
   │ Maquinaria Agrícola      │
   │ Compartida               │
   └───────┬─────────┬────────┘
           │          │
 Registra │          │ Supervisa
           ▼          ▼
 ┌────────────────┐   ┌───────────────────┐
 │ Propietario    │   │ Administrador     │
 │ de Maquinaria  │   │ del Sistema       │
 └────────────────┘   └───────────────────┘


