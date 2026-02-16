export class MaquinariaService {
  constructor(repository, validator) {
    this.repository = repository;
    this.validator = validator;
  }

  crearMaquinaria(data) {
    this.validator.validate(data);
    return this.repository.create(data);
  }

  listar() {
    return this.repository.findAll();
  }
}
