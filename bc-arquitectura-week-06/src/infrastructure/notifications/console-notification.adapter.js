import { NotificationPort } from '../../domain/ports/secondary/notification.port.js';

export class ConsoleNotificationAdapter extends NotificationPort {
  async sendNotification(message, payload) {
    console.log(`[NOTIFICACIÓN] - ${message}`);
    console.log(`Payload:`, JSON.stringify(payload, null, 2));
    return true;
  }
}
