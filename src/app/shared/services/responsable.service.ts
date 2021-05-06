import { Injectable } from '@angular/core';
import { Responsable } from '../models/fisics/Responsable';
import { Variables } from '../variables';

@Injectable({
  providedIn: 'root',
})
export class ResponsableService {
  public async obtenerRespnsable(): Promise<Responsable[] | void> {
    let request = fetch(Variables.ipercApis.ObtenerResponsable)
      .then((resp) => resp.json())
      .then((resp) => resp.data as any[]);

    let responseData = await request
      .then((data) => {
        let listResponsables: Responsable[] = [];
        data.forEach((item) => {
          const idResponsable: number = item['Id_Responsable'];
          const responsableValue: string = item['Responsable'];
          const estado: string = item['Estado'];
          const usuarioRegistro: string = item['UsuarioRegistro'];
          const fechaRegistro: Date = item['FechaRegistro'];
          const usuarioModifica: string = item['UsuarioModifica'];
          const fechaModifica: Date = item['FechaModifica'];

          const responsable = new Responsable(
            idResponsable,
            responsableValue,
            estado,
            usuarioRegistro,
            fechaRegistro,
            usuarioModifica,
            fechaModifica
          );

          listResponsables.push(responsable);
        });

        return listResponsables;
      })
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return responseData;
  }
}
