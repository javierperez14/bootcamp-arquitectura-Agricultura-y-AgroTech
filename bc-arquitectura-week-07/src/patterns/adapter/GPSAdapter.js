// Simulación de un sistema GPS obsoleto o de tercero que devuelve formato XML o distinto.
class LegacyGPS {
  getCoordenadas(idMaquina) {
    // Simula una respuesta Legacy
    return `<coordenadas><lat>4.6097</lat><lng>-74.0817</lng><maquina>${idMaquina}</maquina></coordenadas>`;
  }
}

// Interfaz esperada por nuestra aplicación
export class GPSAdapter {
  constructor() {
    this.legacyGps = new LegacyGPS();
  }

  getExactLocation(idMaquina) {
    const xml = this.legacyGps.getCoordenadas(idMaquina);
    
    // Parseo muy básico para simular la adaptación
    const latMatch = xml.match(/<lat>(.*?)<\/lat>/);
    const lngMatch = xml.match(/<lng>(.*?)<\/lng>/);

    if (latMatch && lngMatch) {
      return {
        lat: parseFloat(latMatch[1]),
        lng: parseFloat(lngMatch[1]),
        lastUpdated: new Date().toISOString()
      };
    }
    
    return null;
  }
}
