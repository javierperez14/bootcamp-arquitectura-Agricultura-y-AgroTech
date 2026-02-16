export class DroneService {
  constructor(repository, validator) {
    this.repository = repository;
    this.validator = validator;
  }

  registrar(drone) {
    this.validator.validate(drone);
    return this.repository.create(drone);
  }

  listar() {
    return this.repository.findAll();
  }
}
