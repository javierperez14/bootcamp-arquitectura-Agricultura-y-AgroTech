class MaquinariaRepository {
  static #instance;

  constructor() {
    if (MaquinariaRepository.#instance) {
      return MaquinariaRepository.#instance;
    }
    this.maquinarias = new Map();
    this.initializeData();
    MaquinariaRepository.#instance = this;
  }

  static getInstance() {
    if (!MaquinariaRepository.#instance) {
      MaquinariaRepository.#instance = new MaquinariaRepository();
    }
    return MaquinariaRepository.#instance;
  }

  initializeData() {
    const initialData = [
      {
        id: 'maq-001',
        nombre: 'Tractor John Deere 5075E',
        tipo: 'tractor',
        marca: 'John Deere',
        modelo: '5075E',
        año: 2020,
        potencia: '75 HP',
        ubicacion: 'Cundinamarca, Facatativá',
        precioPorHora: 45000,
        precioPorDia: 320000,
        disponible: true,
        propietarioId: 'user-123',
        imagenes: ['https://example.com/tractor1.jpg'],
        descripcion: 'Tractor en excelente estado, ideal para labores de arado y siembra'
      },
      {
        id: 'maq-002',
        nombre: 'Cosechadora Case IH 2388',
        tipo: 'cosechadora',
        marca: 'Case IH',
        modelo: '2388',
        año: 2018,
        potencia: '285 HP',
        ubicacion: 'Tolima, Ibagué',
        precioPorHora: 120000,
        precioPorDia: 850000,
        disponible: true,
        propietarioId: 'user-456',
        imagenes: ['https://example.com/cosechadora1.jpg'],
        descripcion: 'Cosechadora de alta capacidad para cultivos de arroz y maíz'
      },
      {
        id: 'maq-003',
        nombre: 'Sembradora Semeato PSE 8',
        tipo: 'sembradora',
        marca: 'Semeato',
        modelo: 'PSE 8',
        año: 2021,
        potencia: 'N/A',
        ubicacion: 'Boyacá, Tunja',
        precioPorHora: 35000,
        precioPorDia: 250000,
        disponible: true,
        propietarioId: 'user-789',
        imagenes: ['https://example.com/sembradora1.jpg'],
        descripcion: 'Sembradora de precisión para 8 surcos'
      },
      {
        id: 'maq-004',
        nombre: 'Fumigadora Jacto Arbus 2000',
        tipo: 'fumigadora',
        marca: 'Jacto',
        modelo: 'Arbus 2000',
        año: 2019,
        potencia: 'N/A',
        ubicacion: 'Valle del Cauca, Palmira',
        precioPorHora: 40000,
        precioPorDia: 280000,
        disponible: false,
        propietarioId: 'user-321',
        imagenes: ['https://example.com/fumigadora1.jpg'],
        descripcion: 'Fumigadora autopropulsada con tanque de 2000 litros'
      },
      {
        id: 'maq-005',
        nombre: 'Tractor New Holland TT4.75',
        tipo: 'tractor',
        marca: 'New Holland',
        modelo: 'TT4.75',
        año: 2022,
        potencia: '75 HP',
        ubicacion: 'Antioquia, Medellín',
        precioPorHora: 48000,
        precioPorDia: 340000,
        disponible: true,
        propietarioId: 'user-654',
        imagenes: ['https://example.com/tractor-nh.jpg'],
        descripcion: 'Tractor moderno con cabina climatizada'
      }
    ];

    initialData.forEach(maq => this.maquinarias.set(maq.id, maq));
  }

  findAll(filters = {}) {
    let results = Array.from(this.maquinarias.values());

    // Aplicar filtros
    if (filters.tipo) {
      results = results.filter(m => m.tipo === filters.tipo);
    }

    if (filters.disponible !== undefined) {
      const disponible = filters.disponible === 'true' || filters.disponible === true;
      results = results.filter(m => m.disponible === disponible);
    }

    if (filters.ubicacion) {
      results = results.filter(m => 
        m.ubicacion.toLowerCase().includes(filters.ubicacion.toLowerCase())
      );
    }

    return results;
  }

  findById(id) {
    return this.maquinarias.get(id) || null;
  }

  create(data) {
    const id = `maq-${Date.now()}`;
    const maquinaria = {
      id,
      ...data,
      disponible: data.disponible !== undefined ? data.disponible : true
    };
    
    this.maquinarias.set(id, maquinaria);
    return maquinaria;
  }

  update(id, data) {
    const existing = this.maquinarias.get(id);
    if (!existing) return null;

    const updated = { ...existing, ...data, id };
    this.maquinarias.set(id, updated);
    return updated;
  }

  delete(id) {
    return this.maquinarias.delete(id);
  }

  count(filters = {}) {
    return this.findAll(filters).length;
  }
}

export const maquinariaRepository = MaquinariaRepository.getInstance();
