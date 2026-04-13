export class DomainService {
  validarCrearReserva(maquinaria, reservasActivas) {
    if (!maquinaria.disponible) {
      throw new Error(`La maquinaria ${maquinaria.id} está inhabilitada y no disponible para reservas.`);
    }

    if (reservasActivas.length >= 3) {
      throw new Error(`La maquinaria tiene el máximo número de reservas activas (3). No se permiten más simultáneas.`);
    }
  }
}
