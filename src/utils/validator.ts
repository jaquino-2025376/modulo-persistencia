import { Cliente } from "../models/cliente";
import { Producto } from "../models/producto";

export class Validator {

    static validarProducto(producto: Producto): boolean {

        if (!producto.nombre || producto.nombre.trim() === "") {

            console.log("Nombre inválido.");

            return false;

        }

        if (producto.precio <= 0) {

            console.log("Precio inválido.");

            return false;

        }

        if (producto.stock < 0) {

            console.log("Stock inválido.");

            return false;

        }

        return true;

    }

    static validarCliente(cliente: Cliente): boolean {

        if (!cliente.nombre || cliente.nombre.trim() === "") {

            console.log("Nombre inválido.");

            return false;

        }

        if (!cliente.correo.includes("@")) {

            console.log("Correo inválido.");

            return false;

        }

        if (!cliente.telefono || cliente.telefono.trim() === "") {

            console.log("Teléfono inválido.");

            return false;

        }

        return true;

    }

}