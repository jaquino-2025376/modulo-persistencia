import { readFile, writeFile, access } from "fs/promises";
import { constants } from "fs";

export class JsonRepository<T> {

    constructor(private rutaArchivo: string) { }

    async leer(): Promise<T[]> {

        try {

            await access(this.rutaArchivo, constants.F_OK);

            const contenido = await readFile(this.rutaArchivo, "utf-8");

            if (contenido.trim() === "") {
                return [];
            }

            return JSON.parse(contenido);

        } catch (error: any) {

            if (error.code === "ENOENT") {

                console.error("El archivo no existe.");

                return [];

            }

            if (error instanceof SyntaxError) {

                console.error("El archivo JSON está corrupto.");

                return [];

            }

            console.error("Error al leer el archivo:", error.message);

            return [];

        }

    }

    async escribir(datos: T[]): Promise<void> {

        try {

            const json = JSON.stringify(datos, null, 4);

            await writeFile(this.rutaArchivo, json);

        } catch (error: any) {

            if (error.code === "EACCES") {

                console.error("No tiene permisos para escribir el archivo.");

                return;

            }

            console.error("Error al escribir:", error.message);

        }

    }

}