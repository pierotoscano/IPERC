import { Injectable } from '@angular/core';
import { Proceso } from '../models/fisics/Proceso';
import { SubProceso } from '../models/fisics/SubProceso';
import { Variables } from '../variables';

@Injectable({ providedIn: 'root' })
export class ProcesoService {
  public async obtenerProceso() {
    let request = fetch(Variables.ipercApis.ObtenerProceso)
      .then((resp) => resp.json())
      .then((resp) => resp.data as any[]);

    let responseData = await request
      .then((data) => {
        let listProcesos: Proceso[] = [];
        data.forEach((item) => {
          const idProceso: number = item['Id_Proceso'];
          const procesoValue: string = item['Proceso'];
          const estado: string = item['Estado'];
          const usuarioRegistro: string = item['UsuarioRegistro'];
          const fechaRegistro: Date = item['FechaRegistro'];
          const usuarioModifica: string = item['UsuarioModifica'];
          const fechaModifica: Date = item['FechaModifica'];

          const proceso: Proceso = new Proceso(
            idProceso,
            procesoValue,
            estado,
            usuarioRegistro,
            fechaRegistro,
            usuarioModifica,
            fechaModifica
          );

          listProcesos.push(proceso);
        });

        return listProcesos;
      })
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return responseData;
  }

  public async obtenerSubProceso(): Promise<SubProceso[] | void> {
    let request = fetch(Variables.ipercApis.ObtenerSubProceso)
      .then((resp) => resp.json())
      .then((resp) => resp.data as any[]);

    let responseData = await request
      .then((data) => {
        let listSubProcesos: SubProceso[] = [];
        data.forEach((item) => {
          const idSubProceso: number = item['Id_SubProceso'];
          const subProcesoValue: string = item['SubProceso'];
          const estado: string = item['Estado'];
          const usuarioRegistro: string = item['UsuarioRegistro'];
          const fechaRegistro: Date = item['FechaRegistro'];
          const usuarioModifica: string = item['UsuarioModifica'];
          const fechaModifica: Date = item['FechaModifica'];

          const subProceso = new SubProceso(
            idSubProceso,
            subProcesoValue,
            estado,
            usuarioRegistro,
            fechaRegistro,
            usuarioModifica,
            fechaModifica
          );

          listSubProcesos.push(subProceso);
        });

        return listSubProcesos;
      })
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return responseData;
  }
}
