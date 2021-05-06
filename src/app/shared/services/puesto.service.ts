import { Injectable } from '@angular/core';
import { Funciones } from '../funciones';
import { Puesto } from '../models/fisics/Puesto';
import { PuestoBody } from '../Types';
import { Variables } from '../variables';

@Injectable({ providedIn: 'root' })
export class PuestoService {
  public async obtenerPuesto(): Promise<Puesto[] | void> {
    let request = fetch(Variables.ipercApis.ObtenerPuesto)
      .then((resp) => resp.json())
      .then((resp) => resp.data as any[]);

    let responseData = await request
      .then((data) => {
        let listPuestos: Puesto[] = [];
        data.forEach((item) => {
          const idPuesto: number = item['Id_Puesto'];
          const idArea: number = item['Id_Area'];
          const puestoValue: string = item['Puesto'];
          const estado: string = item['Estado'];
          const usuarioRegistro: string = item['UsuarioRegistro'];
          const fechaRegistro: Date = item['FechaRegistro'];
          const usuarioModifica: string = item['UsuarioModifica'];
          const fechaModifica: Date = item['FechaModifica'];

          const puesto: Puesto = new Puesto();
          puesto.idPuesto = idPuesto;
          puesto.idArea = idArea;
          puesto.puesto = puestoValue;
          puesto.estado = estado;
          puesto.usuarioRegistro = usuarioRegistro;
          puesto.fechaRegistro = fechaRegistro;
          puesto.usuarioModifica = usuarioModifica;
          puesto.fechaModifica = fechaModifica;

          listPuestos.push(puesto);
        });

        return listPuestos;
      })
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return responseData;
  }

  public async obtenerMatrizPuestoTestByIdMatriz(
    idMatriz: string
  ): Promise<Puesto[] | void> {
    let request = fetch(
      `${Variables.ipercApis.ObtenerPuesto}?Id_Matriz=${idMatriz}&PAGE=0&ROWS=0`
    )
      .then((resp) => resp.json())
      .then((resp) => resp.data as any[]);

    let responseData = await request
      .then((data) => {
        let listPuestos: Puesto[] = [];
        data.forEach((item) => {
          const idMatrizPuesto: number = item['Id_Matriz_Puesto'];
          const idMatriz: string = item['Id_Matriz'];
          const idPuesto: number = item['Id_Puesto'];
          const idArea: number = item['Id_Area'];
          const observacion: string = item['Observacion'];
          const puestoValue: string = item['Puesto'];
          const usuarioRegistro: string = item['UsuarioRegistro'];
          const fechaRegistro: Date = item['FechaRegistro'];
          const usuarioModifica: string = item['UsuarioModifica'];
          const fechaModifica: Date = item['FechaModifica'];

          const puesto: Puesto = new Puesto();
          puesto.idMatrizPuesto = idMatrizPuesto;
          puesto.idMatriz = idMatriz;
          puesto.idPuesto = idPuesto;
          puesto.idArea = idArea;
          puesto.observacion = observacion;
          puesto.puesto = puestoValue;
          puesto.usuarioRegistro = usuarioRegistro;
          puesto.fechaRegistro = fechaRegistro;
          puesto.usuarioModifica = usuarioModifica;
          puesto.fechaModifica = fechaModifica;

          listPuestos.push(puesto);
        });

        return listPuestos;
      })
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return responseData;
  }

  public async eliminarPuesto(puesto: Puesto) {
    const body = {
      Id_Matriz: puesto.idMatriz,
      Id_Puesto: puesto.idPuesto,
      Id_Area: puesto.idArea,
      UsuarioRegistro: puesto.usuarioRegistro,
      FechaRegistro: Funciones.dateFormatDDMMYY(new Date(puesto.fechaRegistro)),
      // Puesto: puesto.puesto,
      // Observacion: puesto.observacion,
      // Estado: puesto.estado,
      // UsuarioModifica: puesto.usuarioModifica,
      // FechaModifica: Funciones.dateFormatDDMMYY(puesto.fechaModifica),
    };

    let request = fetch(Variables.ipercApis.EliminarPuesto, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());

    let response = await request
      .then((resp) => resp.data as number)
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return response;
  }
  // Id_Puesto: puesto.idPuesto.toString(),
  // Id_Area: puesto.idArea.toString(),
  public async guardarPuesto(puesto: Puesto) {
    const body: PuestoBody = {
      Id_Matriz: puesto.idMatriz,
      Id_Puesto: puesto.idPuesto,
      Id_Area: puesto.idArea,
      Puesto: puesto.puesto,
      Observacion: puesto.observacion,
      UsuarioRegistro: puesto.usuarioRegistro,
      FechaRegistro: Funciones.dateFormatMMDDYY(puesto.fechaRegistro),
      UsuarioModifica: puesto.usuarioModifica,
      FechaModifica: Funciones.dateFormatMMDDYY(puesto.fechaModifica),
    };

    let request = fetch(Variables.ipercApis.GuardarPuesto, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());

    let response = await request
      .then((resp) => resp.data as number)
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return response;
  }
}
