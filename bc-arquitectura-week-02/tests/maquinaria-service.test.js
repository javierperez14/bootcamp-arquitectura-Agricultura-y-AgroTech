import { MemoryRepository } from "../src/repositories/memory-repository.js";
import { MaquinariaValidator } from "../src/validators/maquinaria-validator.js";
import { MaquinariaService } from "../src/services/maquinaria-service.js";
import { Maquinaria } from "../src/domain/entities/maquinaria.js";

const repo = new MemoryRepository();
const validator = new MaquinariaValidator();
const service = new MaquinariaService(repo, validator);

const testMaquinaria = new Maquinaria({
  id: "T01",
  nombre: "Tractor Test",
  tipo: "tractor",
  estado: "disponible",
});

service.crearMaquinaria(testMaquinaria);

console.log("TEST → debe crear maquinaria:");
console.log(service.listar().length === 1 ? "OK" : "FAIL");
