import { Injectable } from '@angular/core';
import { TipoMC } from '../models/fisics/TipoMC';
import { Variables } from '../variables';

@Injectable({
  providedIn: 'root',
})
export class MCService {
  public async obtenerTipoMC(): Promise<TipoMC[] | void> {
    let request = fetch(Variables.ipercApis.ObtenerTipoMC)
      .then((resp) => resp.json())
      .then((resp) => resp.data as any[]);

    let responseData = await request
      .then((data) => {
        let listTiposMC: TipoMC[] = [];
        data.forEach((item) => {
          const idTipoMC: number = item['Id_Tipo_MC'];
          const tipoMCValue: string = item['Tipo_MC'];
          const estado: string = item['Estado'];
          const usuarioRegistro: string = item['UsuarioRegistro'];
          const fechaRegistro: Date = item['FechaRegistro'];
          const usuarioModifica: string = item['UsuarioModifica'];
          const fechaModifica: Date = item['FechaModifica'];

          const tipoMC: TipoMC = new TipoMC(
            idTipoMC,
            tipoMCValue,
            estado,
            usuarioRegistro,
            fechaRegistro,
            usuarioModifica,
            fechaModifica
          );

          listTiposMC.push(tipoMC);
        });

        return listTiposMC;
      })
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return responseData;
  }
}
