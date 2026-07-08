import * as readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

import { Producto } from "../models/producto";
import { Cliente } from "../models/cliente";

import { ProductoRepository } from "../persistence/productoRepository";
import { ClienteRepository } from "../persistence/clienteRepository";

export class Menu {

    private rl = readline.createInterface({
        input,
        output
    });

    private productoRepo = new ProductoRepository();
    private clienteRepo = new ClienteRepository();

    async iniciar() {

        let opcion = "";

        do {

            console.clear();

            console.log(" MODULO DE PERSISTENCIA");
            console.log("1. Agregar producto");
            console.log("2. Listar productos");
            console.log("3. Eliminar producto");
            console.log("4. Agregar cliente");
            console.log("5. Listar clientes");
            console.log("6. Eliminar cliente");
            console.log("7. Salir");

            opcion = await this.rl.question("\nSeleccione una opción: ");

            switch(opcion){

                case "1":
                    await this.agregarProducto();
                    break;

                case "2":
                    await this.listarProductos();
                    break;

                case "3":
                    await this.eliminarProducto();
                    break;

                case "4":
                    await this.agregarCliente();
                    break;

                case "5":
                    await this.listarClientes();
                    break;

                case "6":
                    await this.eliminarCliente();
                    break;

            }

            if(opcion!="7"){
                await this.rl.question("\nPresione ENTER para continuar...");
            }

        }while(opcion!="7");

        this.rl.close();

    }

    private async agregarProducto(){

        const id = Number(await this.rl.question("ID: "));
        const nombre = await this.rl.question("Nombre: ");
        const precio = Number(await this.rl.question("Precio: "));
        const stock = Number(await this.rl.question("Stock: "));

        const producto = new Producto(
            id,
            nombre,
            precio,
            stock
        );

        const resultado = await this.productoRepo.guardar(producto);

        console.log(resultado
            ? "Producto guardado."
            : "No se pudo guardar.");
    }

    private async listarProductos(){

        const productos = await this.productoRepo.obtenerTodos();

        console.table(productos);

    }

    private async eliminarProducto(){

        const id = Number(await this.rl.question("ID: "));

        const eliminado = await this.productoRepo.eliminar(id);

        console.log(eliminado
            ? "Producto eliminado."
            : "No existe.");

    }

    private async agregarCliente(){

        const id = Number(await this.rl.question("ID: "));
        const nombre = await this.rl.question("Nombre: ");
        const correo = await this.rl.question("Correo: ");
        const telefono = await this.rl.question("Telefono: ");

        const cliente = new Cliente(
            id,
            nombre,
            correo,
            telefono
        );

        const resultado = await this.clienteRepo.guardar(cliente);

        console.log(resultado
            ? "Cliente guardado."
            : "No se pudo guardar.");

    }

    private async listarClientes(){

        const clientes = await this.clienteRepo.obtenerTodos();

        console.table(clientes);

    }

    private async eliminarCliente(){

        const id = Number(await this.rl.question("ID: "));

        const eliminado = await this.clienteRepo.eliminar(id);

        console.log(eliminado
            ? "Cliente eliminado."
            : "No existe.");

    }

}