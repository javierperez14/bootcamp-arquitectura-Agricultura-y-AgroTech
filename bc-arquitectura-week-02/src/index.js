import { MemoryRepository } from "./repositories/memory-repository.js";
import { Maquinaria } from "./domain/entities/maquinaria.js";
import { MaquinariaValidator } from "./validators/maquinaria-validator.js";
import { MaquinariaService } from "./services/maquinaria-service.js";


const repo = new MemoryRepository();
const validator = new MaquinariaValidator();
const maquinariaService = new MaquinariaService(repo, validator);


console.log("\n=== Plataforma Agricultura & AgroTech ===");

const tractor = new Maquinaria({
  id: "M01",
  nombre: "Tractor John Deere",
  tipo: "tractor",
  estado: "disponible",
});

maquinariaService.crearMaquinaria(tractor);

console.log("Maquinarias registradas:");
console.log(maquinariaService.listar());
