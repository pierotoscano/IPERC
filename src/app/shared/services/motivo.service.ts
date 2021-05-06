import { Injectable } from '@angular/core';
import { TipoMotivo } from '../models/fisics/TipoMotivo';
import { Variables } from '../variables';

@Injectable({
  providedIn: 'root',
})
export class MotivoService {
  public async obtenerTipoMotivo(): Promise<TipoMotivo[] | void> {
    let request = fetch(Variables.ipercApis.ObtenerTipoMotivo)
      .then((resp) => resp.json())
      .then((resp) => resp.data as any[]);

    let responseData = await request
      .then((data) => {
        let listTiposMotivo: TipoMotivo[] = [];
        data.forEach((item) => {
          const idTipoMotivo: number = item['Id_Tipo_Motivo'];
          const tipoMotivoValue: string = item['Tipo_Motivo'];
          const estado: string = item['Estado'];
          const usuarioRegistro: string = item['UsuarioRegistro'];
          const fechaRegistro: Date = item['FechaRegistro'];
          const usuarioModifica: string = item['UsuarioModifica'];
          const fechaModifica: Date = item['FechaModifica'];

          const tipoMotivo: TipoMotivo = new TipoMotivo(
            idTipoMotivo,
            tipoMotivoValue,
            estado,
            usuarioRegistro,
            fechaRegistro,
            usuarioModifica,
            fechaModifica
          );

          listTiposMotivo.push(tipoMotivo);
        });

        return listTiposMotivo;
      })
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return responseData;
  }
}
