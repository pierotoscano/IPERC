import { Injectable } from '@angular/core';
import { Empresa } from '../models/fisics/Empresa';
import { Ubicacion } from '../models/fisics/Ubicacion';
import { Variables } from '../variables';

@Injectable({
  providedIn: 'root',
})
export class UbicacionService {
  public async obtenerUbicaciones(
    idSolicitudMatriz?: string
  ): Promise<Ubicacion[] | void> {
    let urlWS = idSolicitudMatriz === undefined
      ? `${Variables.ipercApis.ObtenerUbicacion}?Id_Solicitud_Matriz=X`
      : `${Variables.ipercApis.ObtenerUbicacion}?Id_Solicitud_Matriz=${idSolicitudMatriz}`;
    let request = fetch(urlWS)
      .then((resp) => resp.json())
      .then((resp) => resp.data as any[]);

    let responseData = await request
      .then((data) => {
        let listUbicaciones: Ubicacion[] = [];
        data.forEach((item) => {
          const idGroup: number = item['Id_Group'];
          const idUbicacion: number = item['Id_Ubicacion'];
          const idEmpresa: number = item['Id_Empresa'];
          const idCentro: number = item['Id_Centro'];
          const idArea: number = item['Id_Area'];
          const idAlcance: number = item['Id_Alcance'];
          const idProceso: number = item['Id_Proceso'];
          const empresa: string = item['Empresa'];
          const centro: string = item['Centro'];
          const area: string = item['Area'];
          const alcance: string = item['Alcance'];
          const proceso: string = item['Proceso'];

          let ubicacion: Ubicacion = new Ubicacion(
            idGroup,
            idUbicacion,
            idEmpresa,
            idCentro,
            idArea,
            idAlcance,
            idProceso,
            empresa,
            centro,
            area,
            alcance,
            proceso
          );

          listUbicaciones.push(ubicacion);
        });

        return listUbicaciones;
      })
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return responseData;
  }

  public async obtenerEmpresasFromUbicaciones(
    idSolicitudMatriz?: string
  ): Promise<Empresa[] | void> {
    let callService = await this.obtenerUbicaciones(idSolicitudMatriz)
      .then((ubicaciones) => {
        const listUbicaciones = ubicaciones ? ubicaciones : [];
        let listEmpresas: Empresa[] = [];
        listUbicaciones.forEach((ubicacion) => {
          let empresa = new Empresa(ubicacion.idEmpresa, ubicacion.empresa);
          listEmpresas.push(empresa);
        });
        let listEmpresasDistinct = listEmpresas.filter(
          (empresa, index, array) =>
            array.findIndex((e) => e.idEmpresa === empresa.idEmpresa) === index
        );
        return listEmpresasDistinct;
      })
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return callService;
  }
}
