import { Injectable } from '@angular/core';
import { Variables } from '../variables';
import { SolicitudMatriz } from '../models/fisics/SolicitudMatriz';
import { SolicitudMatrizBody } from '../Types';
import { Funciones } from '../funciones';

@Injectable({
  providedIn: 'root',
})
export class SolicitudMatrizService {
  public async obtenerSolicitudMatriz(
    setParams: boolean = false,
    fechaInicio?: Date,
    fechaFin?: Date,
    idSolicitudMatriz: string = 'X',
    idMatriz: string = 'X',
    area: string = 'X',
    idTipoMotivo: number = 0,
    solicitante: string = 'X',
    supervisor: string = 'X',
    estadoSolicitud: string = 'X',
    estadoMatriz: string = 'X',
    page: number = 0,
    rows: number = 0
  ): Promise<SolicitudMatriz[] | void> {
    let url: string = Variables.ipercApis.ObtenerSolicitudMatriz;
    if (setParams) {
      url += `?Id_Solicitud_Matriz=${idSolicitudMatriz}&Id_Matriz=${idMatriz}&Area=${area}&Id_Tipo_Motivo=${idTipoMotivo}&Solicitante=${solicitante}&Supervisor=${supervisor}&Estado_Solicitud=${estadoSolicitud}&Estado_Matriz=${estadoMatriz}&FechaInicio=${Funciones.dateFormatMMDDYY(
        fechaInicio
      )}&FechaFin=${Funciones.dateFormatMMDDYY(
        fechaFin
      )}&PAGE=${page}&ROWS=${rows}`;
    }
    let request = fetch(url)
      .then((resp) => resp.json())
      .then((resp) => resp.data as any[]);

    let responseData = await request
      .then((data) => {
        let listSolicitudesMatriz: SolicitudMatriz[] = [];
        data.forEach((item) => {
          const id: string = item['Id_Solicitud_Matriz'];
          const idMatriz: string = item['Id_Matriz'];
          const idArea: number = item['Id_Area'];
          const idSolicitante: string = item['Id_Solicitante'];
          const idSupervisor: string = item['Id_Supervisor'];
          const idTipoMotivo: number = item['Id_Tipo_Motivo'];
          const idMessage: number = item['Id_Message'];
          const motivo: string = item['Motivo'];
          const usuarioRegistro: string = item['UsuarioRegistro'];
          const usuarioModifica: string = item['UsuarioModifica'];
          const fechaRegistro: Date = item['FechaRegistro'];
          const fechaModifica: Date = item['FechaModifica'];
          const estado: string = item['Estado'];
          const estadoMatriz: string = item['Estado_Matriz'];
          const tipo: string = item['Tipo'];
          const tipoMotivo: string = item['Tipo_Motivo'];
          const solicitante: string = item['Solicitante'];
          const supervisor: string = item['Supervisor'];
          const emailSolicitante: string = item['Email_Solicitante'];
          const emailSupervisor: string = item['Email_Supervisor'];
          const area: string = item['Area'];
          const idCentro: number = item['Id_Centro'];
          const centro: string = item['Centro'];
          const descEstado: string = item['DescEstado'];
          const etapa: string = item['Etapa'];
          const visita: string = item['Visita'];
          const totalRows: number = item['TotalRows'];

          const solicitudMatriz: SolicitudMatriz = new SolicitudMatriz();
          solicitudMatriz.id = id;
          solicitudMatriz.idMatriz = idMatriz;
          solicitudMatriz.idArea = idArea;
          solicitudMatriz.idSolicitante = idSolicitante;
          solicitudMatriz.idSupervisor = idSupervisor;
          solicitudMatriz.idTipoMotivo = idTipoMotivo;
          solicitudMatriz.idMessage = idMessage;
          solicitudMatriz.motivo = motivo;
          solicitudMatriz.usuarioRegistro = usuarioRegistro;
          solicitudMatriz.usuarioModifica = usuarioModifica;
          solicitudMatriz.fechaRegistro = fechaRegistro;
          solicitudMatriz.fechaModifica = fechaModifica;
          solicitudMatriz.estado = estado;
          solicitudMatriz.estadoMatriz = estadoMatriz;
          solicitudMatriz.tipo = tipo;
          solicitudMatriz.tipoMotivo = tipoMotivo;
          solicitudMatriz.solicitante = solicitante;
          solicitudMatriz.supervisor = supervisor;
          solicitudMatriz.emailSolicitante = emailSolicitante;
          solicitudMatriz.emailSupervisor = emailSupervisor;
          solicitudMatriz.area = area;
          solicitudMatriz.idCentro = idCentro;
          solicitudMatriz.centro = centro;
          solicitudMatriz.descEstado = descEstado;
          solicitudMatriz.etapa = etapa;
          solicitudMatriz.visita = visita;
          solicitudMatriz.totalRows = totalRows;

          listSolicitudesMatriz.push(solicitudMatriz);
        });

        return listSolicitudesMatriz;
      })
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return responseData;
  }

  public async obtenerSolicitudMatrizByListEstadosMatriz(
    setParams: boolean = false,
    fechaInicio?: Date,
    fechaFin?: Date,
    idSolicitudMatriz: string = 'X',
    idMatriz: string = 'X',
    area: string = 'X',
    idTipoMotivo: number = 0,
    solicitante: string = 'X',
    supervisor: string = 'X',
    estadoSolicitud: string = 'X',
    listEstadosMatriz: string[] = ['X'],
    page: number = 0,
    rows: number = 0
  ): Promise<SolicitudMatriz[] | void> {
    let url: string = Variables.ipercApis.ObtenerSolicitudMatriz;
    if (setParams) {
      let estadosMatriz = '';
      listEstadosMatriz.forEach((estadoMatriz, index) => {
        estadosMatriz += `${estadoMatriz}${
          listEstadosMatriz.length - 1 == index ? '' : ','
        }`;
      });
      url += `?Id_Solicitud_Matriz=${idSolicitudMatriz}&Id_Matriz=${idMatriz}&Area=${area}&Id_Tipo_Motivo=${idTipoMotivo}&Solicitante=${solicitante}&Supervisor=${supervisor}&Estado_Solicitud=${estadoSolicitud}&Estado_Matriz=${estadosMatriz}&FechaInicio=${Funciones.dateFormatMMDDYY(
        fechaInicio
      )}&FechaFin=${Funciones.dateFormatMMDDYY(
        fechaFin
      )}&PAGE=${page}&ROWS=${rows}`;
    }
    let request = fetch(url)
      .then((resp) => resp.json())
      .then((resp) => resp.data as any[]);

    let responseData = await request
      .then((data) => {
        let listSolicitudesMatriz: SolicitudMatriz[] = [];
        data.forEach((item) => {
          const id: string = item['Id_Solicitud_Matriz'];
          const idMatriz: string = item['Id_Matriz'];
          const idArea: number = item['Id_Area'];
          const idSolicitante: string = item['Id_Solicitante'];
          const idSupervisor: string = item['Id_Supervisor'];
          const idTipoMotivo: number = item['Id_Tipo_Motivo'];
          const idMessage: number = item['Id_Message'];
          const motivo: string = item['Motivo'];
          const usuarioRegistro: string = item['UsuarioRegistro'];
          const usuarioModifica: string = item['UsuarioModifica'];
          const fechaRegistro: Date = item['FechaRegistro'];
          const fechaModifica: Date = item['FechaModifica'];
          const estado: string = item['Estado'];
          const estadoMatriz: string = item['Estado_Matriz'];
          const tipo: string = item['Tipo'];
          const tipoMotivo: string = item['Tipo_Motivo'];
          const solicitante: string = item['Solicitante'];
          const supervisor: string = item['Supervisor'];
          const emailSolicitante: string = item['Email_Solicitante'];
          const emailSupervisor: string = item['Email_Supervisor'];
          const area: string = item['Area'];
          const idCentro: number = item['Id_Centro'];
          const centro: string = item['Centro'];
          const descEstado: string = item['DescEstado'];
          const etapa: string = item['Etapa'];
          const visita: string = item['Visita'];
          const totalRows: number = item['TotalRows'];

          const solicitudMatriz: SolicitudMatriz = new SolicitudMatriz();
          solicitudMatriz.id = id;
          solicitudMatriz.idMatriz = idMatriz;
          solicitudMatriz.idArea = idArea;
          solicitudMatriz.idSolicitante = idSolicitante;
          solicitudMatriz.idSupervisor = idSupervisor;
          solicitudMatriz.idTipoMotivo = idTipoMotivo;
          solicitudMatriz.idMessage = idMessage;
          solicitudMatriz.motivo = motivo;
          solicitudMatriz.usuarioRegistro = usuarioRegistro;
          solicitudMatriz.usuarioModifica = usuarioModifica;
          solicitudMatriz.fechaRegistro = fechaRegistro;
          solicitudMatriz.fechaModifica = fechaModifica;
          solicitudMatriz.estado = estado;
          solicitudMatriz.estadoMatriz = estadoMatriz;
          solicitudMatriz.tipo = tipo;
          solicitudMatriz.tipoMotivo = tipoMotivo;
          solicitudMatriz.solicitante = solicitante;
          solicitudMatriz.supervisor = supervisor;
          solicitudMatriz.emailSolicitante = emailSolicitante;
          solicitudMatriz.emailSupervisor = emailSupervisor;
          solicitudMatriz.area = area;
          solicitudMatriz.idCentro = idCentro;
          solicitudMatriz.centro = centro;
          solicitudMatriz.descEstado = descEstado;
          solicitudMatriz.etapa = etapa;
          solicitudMatriz.visita = visita;
          solicitudMatriz.totalRows = totalRows;

          listSolicitudesMatriz.push(solicitudMatriz);
        });

        return listSolicitudesMatriz;
      })
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return responseData;
  }

  public async guardarSolicitudMatriz(
    solicitudMatriz: SolicitudMatriz
  ): Promise<number | void> {
    const body: SolicitudMatrizBody = {
      Id_Solicitud_Matriz: solicitudMatriz.id,
      Id_Solicitante: solicitudMatriz.idSolicitante,
      Id_Supervisor: solicitudMatriz.idSupervisor,
      Id_Area: solicitudMatriz.idArea,
      Tipo: solicitudMatriz.tipo,
      Id_Tipo_Motivo: solicitudMatriz.idTipoMotivo,
      Motivo: solicitudMatriz.motivo,
      Estado: solicitudMatriz.estado,
      UsuarioRegistro: solicitudMatriz.usuarioRegistro,
      FechaRegistro: Funciones.dateFormatMMDDYY(solicitudMatriz.fechaRegistro),
      UsuarioModifica: solicitudMatriz.usuarioModifica,
      FechaModifica: Funciones.dateFormatMMDDYY(solicitudMatriz.fechaModifica),
    };

    let request = fetch(Variables.ipercApis.GuardarSolicitudMatriz, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
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
