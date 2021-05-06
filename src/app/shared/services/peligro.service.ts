import { Injectable } from '@angular/core';
import { Variables } from '../variables';
import { PeligroMatriz } from '../models/fisics/PeligroMatriz';
import { Funciones } from '../funciones';
import { PeligroMatrizBody } from '../Types';

@Injectable({
  providedIn: 'root',
})
export class PeligroService {
  public async obtenerPeligro(): Promise<PeligroMatriz[] | void> {
    let request = fetch(Variables.ipercApis.ObtenerPeligro)
      .then((resp) => resp.json())
      .then((resp) => resp.data as any[]);

    let responseData = request
      .then((data) => {
        let listPeligrosMatriz: PeligroMatriz[] = [];
        data.forEach((item) => {
          const idMatriz: string = item['Id_Matriz'];
          const idPeligro: number = item['Id_Peligro'];
          const idActividad: number = item['Id_Actividad'];
          const idArea: number = item['Id_Area'];
          const peligroData: string = item['Peligro'];
          const estado: string = item['Estado'];
          const usuarioRegistro: string = item['UsuarioRegistro'];
          const fechaRegistro: Date = item['FechaRegistro'];
          const usuarioModifica: string = item['UsuarioModifica'];
          const fechaModifica: Date = item['FechaModifica'];

          const peligroMatriz: PeligroMatriz = new PeligroMatriz();
          peligroMatriz.idMatriz = idMatriz;
          peligroMatriz.idPeligro = idPeligro;
          peligroMatriz.idArea = idArea;
          peligroMatriz.idActividad = idActividad;
          peligroMatriz.peligro = peligroData;
          peligroMatriz.estado = estado;
          peligroMatriz.usuarioRegistro = usuarioRegistro;
          peligroMatriz.fechaRegistro = fechaRegistro;
          peligroMatriz.usuarioModifica = usuarioModifica;
          peligroMatriz.fechaModifica = fechaModifica;

          listPeligrosMatriz.push(peligroMatriz);
        });

        return listPeligrosMatriz;
      })
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return responseData;
  }

  public async obtenerMatrizPeligroByIdMatriz(idMatriz: string) {
    let request = fetch(
      `${Variables.ipercApis.ObtenerMatrizPeligroByIdMatriz}?Id_Matriz=${idMatriz}&PAGE=0&ROWS=0`
    )
      .then((resp) => resp.json())
      .then((resp) => resp.data as any[]);

    let responseData = request
      .then((data) => {
        let listPeligrosMatriz: PeligroMatriz[] = [];
        data.forEach((item) => {
          const idMatrizPeligro: number = item['Id_Matriz_Peligro'];
          const idMatriz: string = item['Id_Matriz'];
          const idPeligro: number = item['Id_Peligro'];
          const idActividad: number = item['Id_Actividad'];
          const actividad: string = item['Actividad'];
          const idArea: number = item['Id_Area'];
          const peligroData: string = item['Peligro'];
          const observacion: string = item['Observacion'];
          const usuarioRegistro: string = item['UsuarioRegistro'];
          const fechaRegistro: Date = item['FechaRegistro'];
          const usuarioModifica: string = item['UsuarioModifica'];
          const fechaModifica: Date = item['FechaModifica'];

          const peligroMatriz: PeligroMatriz = new PeligroMatriz();
          peligroMatriz.idMatrizPeligro = idMatrizPeligro;
          peligroMatriz.idMatriz = idMatriz;
          peligroMatriz.idPeligro = idPeligro;
          peligroMatriz.idArea = idArea;
          peligroMatriz.idActividad = idActividad;
          peligroMatriz.actividad = actividad;
          peligroMatriz.peligro = peligroData;
          peligroMatriz.observacion = observacion;
          peligroMatriz.usuarioRegistro = usuarioRegistro;
          peligroMatriz.fechaRegistro = fechaRegistro;
          peligroMatriz.usuarioModifica = usuarioModifica;
          peligroMatriz.fechaModifica = fechaModifica;

          listPeligrosMatriz.push(peligroMatriz);
        });

        return listPeligrosMatriz;
      })
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return responseData;
  }

  public async guardarPeligroMatriz(peligroMatriz: PeligroMatriz) {
    const body: PeligroMatrizBody = {
      Id_Matriz_Peligro: peligroMatriz.idPeligro,
      Id_Matriz: peligroMatriz.idMatriz,
      Id_Area: peligroMatriz.idArea,
      Id_Actividad: peligroMatriz.idActividad,
      Peligro: peligroMatriz.peligro,
      Observacion: peligroMatriz.observacion,
      UsuarioRegistro: peligroMatriz.usuarioRegistro,
      FechaRegistro: Funciones.dateFormatMMDDYY(peligroMatriz.fechaRegistro),
    };

    let request = fetch(Variables.ipercApis.GuardarPeligroMatriz, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());

    let response = await request
      .then((resp) => resp.data)
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return response;
  }

  public async eliminarPeligro(peligro: PeligroMatriz): Promise<any | void> {
    const body = {
      Id_Matriz: peligro.idMatriz,
      Id_Actividad: peligro.idActividad,
      Id_Peligro: peligro.idPeligro,
      UsuarioRegistro: peligro.usuarioRegistro,
      FechaRegistro: Funciones.dateFormatMMDDYY(peligro.fechaRegistro),
    };
    let request = fetch(Variables.ipercApis.EliminarPeligro, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());

    let response = await request
      .then((resp) => resp.data)
      .catch((error) => {
        console.error('Error found: ' + error);
      });
    return response;
  }
}
