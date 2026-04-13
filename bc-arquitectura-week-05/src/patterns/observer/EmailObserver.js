export class EmailObserver {
  handle(data) {
    console.log(`[EmailObserver]: Simulemos envío de email para la nueva reserva ${data.id}. Usuario: ${data.usuarioId}, Total: $${data.total}`);
  }
}
