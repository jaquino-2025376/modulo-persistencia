import { Cliente } from "../models/cliente";
import { JsonRepository } from "./jsonRepository";
import { Validator } from "../utils/validator";

export class ClienteRepository {

    private repository: JsonRepository<Cliente>;

    constructor() {
        this.repository = new JsonRepository<Cliente>("data/clientes.json");
    }

    async obtenerTodos(): Promise<Cliente[]> {
        return await this.repository.leer();
    }

    async buscarPorId(id: number): Promise<Cliente | undefined> {

        const clientes = await this.repository.leer();

        return clientes.find(c => c.id === id);

    }

    async guardar(cliente: Cliente): Promise<boolean> {

        if (!Validator.validarCliente(cliente)) {

            return false;

        }

        const clientes = await this.repository.leer();

        const existe = clientes.some(c => c.id === cliente.id);

        if (existe) {

            console.log("Ya existe un cliente con ese ID.");

            return false;

        }

        clientes.push(cliente);

        await this.repository.escribir(clientes);

        return true;

    }

    async eliminar(id: number): Promise<boolean> {

        const clientes = await this.repository.leer();

        const nuevos = clientes.filter(c => c.id !== id);

        if (clientes.length === nuevos.length) {

            console.log("Cliente no encontrado.");

            return false;

        }

        await this.repository.escribir(nuevos);

        return true;

    }

}