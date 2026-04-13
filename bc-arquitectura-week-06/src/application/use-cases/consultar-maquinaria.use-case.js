import { ConsultarMaquinariaUseCasePort } from '../../domain/ports/primary/consultar-maquinaria.use-case.port.js';

export class ConsultarMaquinariaUseCase extends ConsultarMaquinariaUseCasePort {
  #maquinariaRepository;

  constructor({ maquinariaRepository }) {
    super();
    this.#maquinariaRepository = maquinariaRepository;
  }

  async execute(filters = {}, page = 1, limit = 10) {
    const maquinarias = await this.#maquinariaRepository.findAll();
    
    // Filtro simulado
    const filtradas = maquinarias.filter(maq => {
      let match = true;
      if (filters.tipo && maq.tipo !== filters.tipo) match = false;
      if (filters.disponible !== undefined && maq.disponible !== filters.disponible) match = false;
      return match;
    });

    const offset = (page - 1) * limit;
    const paginadas = filtradas.slice(offset, offset + limit);

    return {
      data: paginadas,
      total: filtradas.length,
      page,
      limit
    };
  }
}
