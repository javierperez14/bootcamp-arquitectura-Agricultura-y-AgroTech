import { IValidator } from "../domain/interfaces/validator.js";

export class MaquinariaValidator extends IValidator {
  validate(entity) {
    if (!entity.id) throw new Error("La maquinaria debe tener un ID");
    if (!entity.nombre) throw new Error("La maquinaria debe tener nombre");
    if (!entity.tipo) throw new Error("La maquinaria debe tener tipo");
  }
}
