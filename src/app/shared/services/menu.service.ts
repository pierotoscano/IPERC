import { Injectable } from '@angular/core';
import { Menu } from '../models/fisics/Menu';
import { MenuAcceso } from '../models/fisics/MenuAcceso';
import { Variables } from '../variables';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  public async obtenerMenuAcceso(): Promise<MenuAcceso[] | void> {
    let request = fetch(Variables.ipercApis.ObtenerMenuAcceso)
      .then((resp) => resp.json())
      .then((resp) => resp.data as any[]);

    let responseData = request
      .then((data) => {
        let listMenuAcceso: MenuAcceso[] = [];
        data.forEach((item) => {
          const idRol: string = item['Id_Rol'];
          const idMenu: number = item['Id_Menu'];
          const estado: string = item['Estado'];
          const usuarioRegistro: string = item['UsuarioRegistro'];
          const fechaRegistro: Date = item['FechaRegistro'];
          const usuarioModifica: string = item['UsuarioModifica'];
          const fechaModifica: Date = item['FechaModifica'];

          const menuAcceso = new MenuAcceso(
            idRol,
            idMenu,
            estado,
            usuarioRegistro,
            fechaRegistro,
            usuarioModifica,
            fechaModifica
          );

          listMenuAcceso.push(menuAcceso);
        });

        return listMenuAcceso;
      })
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return responseData;
  }

  public async obtenerMenu() {
    let request = fetch(Variables.ipercApis.ObtenerMenu)
      .then((resp) => resp.json())
      .then((resp) => resp.data as any[]);

    let responseData = await request
      .then((data) => {
        let listMenu: Menu[] = [];
        data.forEach((item) => {
          const idMenu: number = item['Id_Menu'];
          const menuValue: string = item['Menu'];
          const estado: string = item['Estado'];
          const usuarioRegistro: string = item['UsuarioRegistro'];
          const fechaRegistro: Date = item['FechaRegistro'];
          const usuarioModifica: string = item['UsuarioModifica'];
          const fechaModifica: Date = item['FechaModifica'];

          const menu = new Menu(
            idMenu,
            menuValue,
            estado,
            usuarioRegistro,
            fechaRegistro,
            usuarioModifica,
            fechaModifica
          );

          listMenu.push(menu);
        });

        return listMenu;
      })
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return responseData;
  }
}
