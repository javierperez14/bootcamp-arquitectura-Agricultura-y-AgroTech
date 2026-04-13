export class AuditObserver {
  handle(data) {
    console.log(`[AuditObserver]: Registrando auditoría de reserva creada - ID ${data.id} a las ${new Date().toISOString()}`);
  }
}
