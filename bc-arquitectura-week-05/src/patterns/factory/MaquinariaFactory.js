export class MaquinariaFactory {
  static crearMaquinaria(data) {
    const defaultFields = {
      disponible: data.disponible !== undefined ? data.disponible : true,
      createdAt: new Date().toISOString()
    };

    switch(data.tipo) {
      case 'tractor':
        return {
          ...data,
          ...defaultFields,
          requiereLicenciaEspecial: true,
          mantenimientoFrecuente: true
        };
      case 'cosechadora':
        return {
          ...data,
          ...defaultFields,
          requiereOperadorCertificado: true,
          seguroAdicional: true
        };
      case 'sembradora':
      case 'fumigadora':
      case 'arado':
          return {
            ...data,
            ...defaultFields,
            requiereLicenciaEspecial: false
          };
      default:
        return {
          ...data,
          ...defaultFields
        };
    }
  }
}
