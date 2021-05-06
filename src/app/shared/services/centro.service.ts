import { Injectable } from '@angular/core';
import { Centro } from '../models/fisics/Centro';
import { Variables } from '../variables';

@Injectable({
  providedIn: 'root',
})
export class CentroService {
  async obtenerCentro(): Promise<Centro[] | void> {
    let request = fetch(Variables.ipercApis.ObtenerCentro)
      .then((resp) => resp.json())
      .then((resp) => resp.data as any[]);

    let responseData = await request
      .then((data) => {
        let listCentros: Centro[] = [];
        data.forEach((item) => {
          const id: number = item['Id_Centro'];
          const centroValue: string = item['Centro'];
          const estado: string = item['Estado'];
          const usuarioRegistro: string = item['UsuarioRegistro'];
          const fechaRegistro: Date = item['FechaRegistro'];
          const usuarioModifica: string = item['UsuarioModifica'];
          const fechaModifica: Date = item['FechaModifica'];

          const centro = new Centro(
            id,
            centroValue,
            estado,
            usuarioRegistro,
            fechaRegistro,
            usuarioModifica,
            fechaModifica
          );

          listCentros.push(centro);
        });

        return listCentros;
      })
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return responseData;
  }
}
