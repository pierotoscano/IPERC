import { Injectable } from '@angular/core';
import { Area } from '../models/fisics/Area';
import { Variables } from '../variables';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  async obtenerArea(): Promise<Area[] | void> {
    let request = fetch(Variables.ipercApis.ObtenerArea)
      .then((resp) => resp.json())
      .then((resp) => resp.data as any[]);

    let responseData = await request
      .then((data) => {
        let listAreas: Area[] = [];
        data.forEach((item) => {
          const idArea: number = item['Id_Area'];
          const idCentro: number = item['Id_Centro'];
          const idAlcance: number = item['Id_Alcance'];
          const areaValue: string = item['Area'];
          const estado: string = item['Estado'];
          const usuarioRegistro: string = item['UsuarioRegistro'];
          const fechaRegistro: Date = item['FechaRegistro'];
          const usuarioModifica: string = item['UsuarioModifica'];
          const fechaModifica: Date = item['FechaModifica'];

          const area = new Area(
            idArea,
            idCentro,
            idAlcance,
            areaValue,
            estado,
            usuarioRegistro,
            fechaRegistro,
            usuarioModifica,
            fechaModifica
          );
          listAreas.push(area);
        });
        return listAreas;
      })
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return responseData;
  }
}
