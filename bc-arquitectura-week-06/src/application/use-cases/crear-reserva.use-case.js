import { ReservaAggregate } from '../../domain/aggregates/reserva.aggregate.js';
import { CrearReservaUseCasePort } from '../../domain/ports/primary/crear-reserva.use-case.port.js';

export class CrearReservaUseCase extends CrearReservaUseCasePort {
  #maquinariaRepository;
  #reservaRepository;
  #domainService;
  #notificationPort;

  constructor({ maquinariaRepository, reservaRepository, domainService, notificationPort }) {
    super();
    this.#maquinariaRepository = maquinariaRepository;
    this.#reservaRepository = reservaRepository;
    this.#domainService = domainService;
    this.#notificationPort = notificationPort;
  }

  async execute({ maquinariaId, usuarioId, fechaInicio, fechaFin }) {
    const maquinaria = await this.#maquinariaRepository.findById(maquinariaId);
    if (!maquinaria) throw new Error(`Maquinaria ${maquinariaId} no encontrada`);

    const activas = await this.#reservaRepository.findActivasByMaquinaria(maquinariaId);
    
    // Reglas de negocio desde el servicio de dominio
    this.#domainService.validarCrearReserva(maquinaria, activas);

    // Si pasa, crear y guardar el agregado
    const reserva = new ReservaAggregate({ maquinariaId, usuarioId, fechaInicio, fechaFin });
    await this.#reservaRepository.save(reserva);

    // Enviar notificación a través del puerto secundario
    if (this.#notificationPort) {
      await this.#notificationPort.sendNotification('Nueva reserva creada exitosamente', { reservaId: reserva.id, maquinariaId: maquinaria.id });
    }

    return reserva;
  }
}
