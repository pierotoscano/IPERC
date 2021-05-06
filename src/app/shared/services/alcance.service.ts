import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { Alcance } from '../models/fisics/Alcance';
import { Variables } from '../variables';

@Injectable({
  providedIn: 'root',
})
export class AlcanceService {
  async obtenerAlcance(): Promise<Alcance[] | void> {
    let request = fetch(Variables.ipercApis.ObtenerAlcance)
      .then((resp) => resp.json())
      .then((resp) => resp.data)
      .then((data) => data as any[]);

    let responseData = await request
      .then((data) => {
        let listAlcances: Alcance[] = [];
        data.forEach((item) => {
          const idAlcance: number = item['Id_Alcance'];
          const alcanceValue: string = item['Alcance'];
          const estado: string = item['Estado'];
          const usuarioRegistro: string = item['UsuarioRegistro'];
          const fechaRegistro: Date = item['FechaRegistro'];
          const usuarioModifica: string = item['UsuarioModifica'];
          const fechaModifica: Date = item['FechaModifica'];

          const alcance: Alcance = new Alcance(
            idAlcance,
            alcanceValue,
            estado,
            usuarioRegistro,
            fechaRegistro,
            usuarioModifica,
            fechaModifica
          );

          listAlcances.push(alcance);
        });

        return listAlcances;
      })
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return responseData;
  }
}
