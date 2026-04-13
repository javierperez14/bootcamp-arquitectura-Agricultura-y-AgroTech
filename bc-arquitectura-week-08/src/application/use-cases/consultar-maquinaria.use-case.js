export class ConsultarMaquinariaUseCase {
  #maquinariaRepository;

  constructor({ maquinariaRepository }) {
    this.#maquinariaRepository = maquinariaRepository;
  }

  async execute(filters = {}, page = 1, limit = 10) {
    const maquinarias = await this.#maquinariaRepository.findAll();

    const filtradas = maquinarias.filter(maq => {
      let match = true;
      if (filters.tipo && maq.tipo !== filters.tipo) match = false;
      if (filters.disponible !== undefined && maq.disponible !== filters.disponible) match = false;
      return match;
    });

    const offset = (Number(page) - 1) * Number(limit);
    const paginadas = filtradas.slice(offset, offset + Number(limit));

    return { data: paginadas, total: filtradas.length, page: Number(page), limit: Number(limit) };
  }
}
