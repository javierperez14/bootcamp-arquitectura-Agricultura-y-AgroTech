```mermaid
classDiagram
    class MaquinariaFactory {
        +static crearMaquinaria(data) Object
    }
    class MaquinariaService {
        +create(data)
    }
    MaquinariaService ..> MaquinariaFactory : usa para crear
```
