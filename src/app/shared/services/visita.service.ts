import { Injectable } from '@angular/core';
import { Funciones } from '../funciones';
import { Visita } from '../models/fisics/Visita';
import { VisitaBody } from '../Types';
import { Variables } from '../variables';

@Injectable({
  providedIn: 'root',
})
export class VisitaService {
  public async obtenerVisita(idSolicitudMatriz: string  = ""): Promise<Visita[] | void> {
    let headers: string = "";
    if(idSolicitudMatriz !== ""){
      headers = `?Id_Solicitud_Matriz=${idSolicitudMatriz}`;
    }
    let request = fetch(`${Variables.ipercApis.ObtenerVisita}${headers}`)
      .then((resp) => resp.json())
      .then((resp) => resp.data as any[]);

    let responseData = await request
      .then((data) => {
        let listVisitas: Visita[] = [];
        data.forEach((item) => {
          const idVisita: string = item['Id_Visita'];
          const idSolicitudMatriz: string = item['Id_Solicitud_Matriz'];
          const idArea: number = item['Id_Area'];
          const idCentro: number = item['Id_Centro'];
          const inicioVisita: Date = item['InicioVisita'];
          const finVisita: Date = item['FinVisita'];
          const centro: string = item['Centro'];
          const area: string = item['Area'];
          const estadoDesc: string = item['EstadoDesc'];
          const estado: string = item['Estado'];
          const usuarioRegistro: string = item['UsuarioRegistro'];
          const fechaRegistro: Date = item['FechaRegistro'];
          const usuarioModifica: string = item['UsuarioModifica'];
          const fechaModifica: Date = item['FechaModifica'];

          const visita: Visita = new Visita(
            idVisita,
            idSolicitudMatriz,
            idArea,
            idCentro,
            inicioVisita,
            finVisita,
            centro,
            area,
            estadoDesc,
            estado,
            usuarioRegistro,
            fechaRegistro,
            usuarioModifica,
            fechaModifica
          );

          listVisitas.push(visita);
        });

        return listVisitas;
      })
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return responseData;
  }

  public async guardarVisita(visita: Visita) {
    const body: VisitaBody = {
      Id_Visita: visita.idVisita,
      Id_Solicitud_Matriz: visita.idSolicitudMatriz,
      Id_Area: visita.idArea,
      Id_Centro: visita.idCentro,
      InicioVisita: Funciones.dateFormatMMDDYY(visita.inicioVisita),
      FinVisita: Funciones.dateFormatMMDDYY(visita.finVisita),
      Estado: visita.estado,
      UsuarioRegistro: visita.usuarioRegistro,
      FechaRegistro: Funciones.dateFormatMMDDYY(visita.fechaRegistro),
      UsuarioModifica: visita.usuarioModifica,
      FechaModifica: Funciones.dateFormatMMDDYY(visita.fechaModifica),
    };
    let request = fetch(Variables.ipercApis.GuardarVisita, {
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

  public async guardarListVisitas(listVisitas: Visita[]) {
    let listRequests = [];
    listVisitas.forEach((v) => {
      const body: VisitaBody = {
        Id_Visita: v.idVisita,
        Id_Solicitud_Matriz: v.idSolicitudMatriz,
        Id_Area: v.idArea,
        Id_Centro: v.idCentro,
        InicioVisita: Funciones.dateFormatMMDDYY(v.inicioVisita),
        FinVisita: Funciones.dateFormatMMDDYY(v.finVisita),
        Estado: v.estado,
        UsuarioRegistro: v.usuarioRegistro,
        FechaRegistro: Funciones.dateFormatMMDDYY(v.fechaRegistro),
        UsuarioModifica: v.usuarioModifica,
        FechaModifica: Funciones.dateFormatMMDDYY(v.fechaModifica),
      };

      listRequests.push(
        fetch(Variables.ipercApis.GuardarVisita, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body)
        })
      );
    });

    let responses = Promise.all(listRequests)
      .then((responses) => {
        let listResponsesJson = [];

        responses.forEach((resp) => {
          listResponsesJson.push(resp.json());
        });

        return listResponsesJson;
      })
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return responses;
  }
}
