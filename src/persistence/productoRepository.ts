import { Producto } from "../models/producto";
import { JsonRepository } from "./jsonRepository";
import { Validator } from "../utils/validator";

export class ProductoRepository {

    private repository: JsonRepository<Producto>;

    constructor() {
        this.repository = new JsonRepository<Producto>("data/productos.json");
    }

    async obtenerTodos(): Promise<Producto[]> {
        return await this.repository.leer();
    }

    async buscarPorId(id: number): Promise<Producto | undefined> {

        const productos = await this.repository.leer();

        return productos.find(p => p.id === id);

    }

    async guardar(producto: Producto): Promise<boolean> {

        if (!Validator.validarProducto(producto)) {
            return false;
        }

        const productos = await this.repository.leer();

        const existe = productos.some(p => p.id === producto.id);

        if (existe) {

            console.log("Ya existe un producto con ese ID.");

            return false;

        }

        productos.push(producto);

        await this.repository.escribir(productos);

        return true;

    }

    async eliminar(id: number): Promise<boolean> {

        const productos = await this.repository.leer();

        const nuevos = productos.filter(p => p.id !== id);

        if (productos.length === nuevos.length) {

            console.log("Producto no encontrado.");

            return false;

        }

        await this.repository.escribir(nuevos);

        return true;

    }

}