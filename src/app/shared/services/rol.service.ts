import { Injectable } from '@angular/core';
import { Variables } from '../variables';
import { Rol } from '../models/fisics/Rol';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  public async obtenerRol(): Promise<Rol[] | void> {
    let request = fetch(Variables.ipercApis.ObtenerRol)
      .then((resp) => resp.json())
      .then((resp) => resp.data as any[]);

    let responseData = await request
      .then((data) => {
        let listRoles: Rol[] = [];
        data.forEach((item) => {
          const idRol: string = item['Id_Rol'];
          const rolValue: string = item['Rol'];
          const estado: string = item['Estado'];
          const usuarioRegistro: string = item['UsuarioRegistro'];
          const fechaRegistro: Date = item['FechaRegistro'];
          const usuarioModifica: string = item['UsuarioModifica'];
          const fechaModifica: Date = item['FechaModifica'];

          const rol: Rol = new Rol(
            idRol,
            rolValue,
            estado,
            usuarioRegistro,
            fechaRegistro,
            usuarioModifica,
            fechaModifica
          );

          listRoles.push(rol);
        });

        return listRoles;
      })
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return responseData;
  }
}
