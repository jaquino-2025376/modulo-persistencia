import { Menu } from "./menu/menu";

async function main(){

    const menu = new Menu();

    await menu.iniciar();

}

main();