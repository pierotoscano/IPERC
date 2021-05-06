import { Injectable } from '@angular/core';
import { Matriz } from '../models/fisics/Matriz';
import { MatrizActividad } from '../models/fisics/MatrizActividad';
import { SolicitudMatriz } from '../models/fisics/SolicitudMatriz';
import { PeligroMatriz } from '../models/fisics/PeligroMatriz';

import { Variables } from '../variables';

import { MatrizBody, PeligroMatrizBody, SolicitudMatrizBody } from '../Types';
import { Funciones } from '../funciones';
import { body } from '@pnp/odata';

@Injectable({ providedIn: 'root' })
export class MatrizService {
  public async obtenerActividadMatriz(idMatriz?: string): Promise<MatrizActividad[] | void> {
    let param: string = ""
    if(idMatriz !== undefined){
      param = `?Id_Matriz=${idMatriz}`;
    }
    let request = fetch(`${Variables.ipercApis.ObtenerActividadMatriz}${param}`)
      .then((resp) => resp.json())
      .then((resp) => resp.data)
      .then((data) => data as any[]);

    let responseData = await request
      .then((data) => {
        let listMatricesActividad: MatrizActividad[] = [];
        data.forEach((item) => {
          const idMatrizActividad: number = item['Id_Matriz_Actividad'];
          const idMatriz: string = item['Id_Matriz'];
          const idPuesto: number = item['Id_Puesto'];
          const idActividad: number = item['Id_Actividad'];
          const idTipoActividad: number = item['Id_Tipo_Actividad'];
          const idMaquina: number = item['Id_Maquina'];
          const idHerramienta: number = item['Id_Herramienta'];
          const idEquipo: number = item['Id_Equipo'];
          const idProducto: number = item['Id_Producto'];
          const observacion: string = item['Observacion'];
          const usuarioRegistro: string = item['UsuarioRegistro'];
          const fechaRegistro: Date = item['FechaRegistro'];
          const usuarioModifica: string = item['UsuarioModifica'];
          const fechaModifica: Date = item['FechaModifica'];
          const idArea: number = item['Id_Area'];
          const area: string = item['Area'];
          const tipoRiesgo: string = item['Tipo_Riesgo'];
          const puesto: string = item['Puesto'];
          const actividad: string = item['Actividad'];
          const herramienta: string = item['Herramienta'];
          const maquina: string = item['Maquina'];
          const producto: string = item['Producto'];
          const equipo: string = item['Equipo'];

          const matrizActividad: MatrizActividad = new MatrizActividad(
            idMatrizActividad,
            idMatriz,
            idPuesto,
            idActividad,
            idTipoActividad,
            idMaquina,
            idHerramienta,
            idEquipo,
            idProducto,
            observacion,
            usuarioRegistro,
            fechaRegistro,
            usuarioModifica,
            fechaModifica,
            idArea,
            area,
            tipoRiesgo,
            puesto,
            actividad,
            herramienta,
            maquina,
            producto,
            equipo
          );

          listMatricesActividad.push(matrizActividad);
        });

        return listMatricesActividad;
      })
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return responseData;
  }

  public async obtenerSolicitudMatriz(): Promise<SolicitudMatriz[] | void> {
    let request = fetch(Variables.ipercApis.ObtenerSolicitudMatriz)
      .then((resp) => resp.json())
      .then((resp) => resp.data as any[]);

    let responseData = await request
      .then((data) => {
        let listSolicitudesMatriz: SolicitudMatriz[] = [];
        data.forEach((item) => {
          const id: string = item['Id_Solicitud_Matriz'];
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
          const tipo: string = item['Tipo'];
          const solicitante: string = item['Solicitante'];
          const supervisor: string = item['Supervisor'];
          const emailSolicitante: string = item['Email_Solicitante'];
          const emailSupervisor: string = item['Email_Supervisor'];
          const area: string = item['Area'];
          const idCentro: number = item['Id_Centro'];
          const centro: string = item['Centro'];
          const descEstado: string = item['DescEstado'];
          const matriz: string = item['matriz'];

          const solicitudMatriz: SolicitudMatriz = new SolicitudMatriz();
          solicitudMatriz.id = id;
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
          solicitudMatriz.tipo = tipo;
          solicitudMatriz.solicitante = solicitante;
          solicitudMatriz.supervisor = supervisor;
          solicitudMatriz.emailSolicitante = emailSolicitante;
          solicitudMatriz.emailSupervisor = emailSupervisor;
          solicitudMatriz.area = area;
          solicitudMatriz.idCentro = idCentro;
          solicitudMatriz.centro = centro;
          solicitudMatriz.descEstado = descEstado;
          solicitudMatriz.matriz = matriz;

          listSolicitudesMatriz.push(solicitudMatriz);
        });

        return listSolicitudesMatriz;
      })
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return responseData;
  }

  public async obtenerMatriz(): Promise<Matriz[] | void> {
    let request = fetch(Variables.ipercApis.ObtenerMatriz)
      .then((resp) => resp.json())
      .then((resp) => resp.data as any[]);

    let responseData = await request
      .then((data) => {
        let listMatrices: Matriz[] = [];
        data.forEach((item) => {
          const id: string = item['Id_Matriz'];
          const idSolicitudMatriz: string = item['Id_Solicitud_Matriz'];
          const idArea: number = item['Id_Area'];
          const idSolicitante: string = item['Id_Solicitante'];
          const idSupervisor: string = item['Id_Supervisor'];
          const periodo: string = item['Periodo'];
          const estado: string = item['Estado'];
          const usuarioRegistro: string = item['UsuarioRegistro'];
          const fechaRegistro: Date = item['FechaRegistro'];
          const usuarioModifica: string = item['UsuarioModifica'];
          const fechaModifica: Date = item['FechaModifica'];
          const solicitante: string = item['Solicitante'];
          const emailSolicitante: string = item['Email_Solicitante'];
          const supervisor: string = item['Supervisor'];
          const emailSupervisor: string = item['Email_Supervisor'];
          const jefeArea: string = item['JefeArea'];
          const emailJefeArea: string = item['Email_JefeArea'];
          const gerenteArea: string = item['GerenteArea'];
          const emailGerenteArea: string = item['Email_GerenteArea'];
          const empresa: string = item['Empresa'];
          const observacion: string = item['Observacion'];
          const centro: string = item['Centro'];
          const area: string = item['Area'];
          const alcance: string = item['Alcance'];
          const proceso: string = item['Proceso'];
          const descEstado: string = item['DescEstado'];

          const matriz = new Matriz(
            id,
            idSolicitudMatriz,
            idArea,
            idSolicitante,
            idSupervisor,
            periodo,
            estado,
            usuarioRegistro,
            fechaRegistro,
            usuarioModifica,
            fechaModifica,
            solicitante,
            emailSolicitante,
            supervisor,
            emailSupervisor,
            jefeArea,
            emailJefeArea,
            gerenteArea,
            emailGerenteArea,
            empresa,
            observacion,
            centro,
            area,
            alcance,
            proceso,
            descEstado
          );

          listMatrices.push(matriz);
        });

        return listMatrices;
      })
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return responseData;
  }

  public async guardarSolicitudMatriz(
    solicitudMatriz: SolicitudMatriz
  ): Promise<any | void> {
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
      .then((resp) => resp.response)
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return response;
  }

  public async guardarMatriz(matriz: Matriz): Promise<any | void> {
    const body: MatrizBody = {
      Id_Matriz: matriz.id,
      Id_Solicitud_Matriz: matriz.idSolicitudMatriz,
      Id_Solicitante: matriz.idSolicitante,
      Id_Supervisor: matriz.idSupervisor,
      Id_Area: matriz.idArea,
      Periodo: matriz.periodo,
      Estado: matriz.estado,
      UsuarioRegistro: matriz.usuarioRegistro,
      FechaRegistro: Funciones.dateFormatMMDDYY(matriz.fechaRegistro),
      UsuarioModifica: matriz.usuarioModifica,
      FechaModifica: Funciones.dateFormatMMDDYY(matriz.fechaModifica),
    };

    let request = fetch(Variables.ipercApis.GuardarMatriz, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());

    let response = await request
      .then((resp) => resp.response)
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return response;
  }

  public async generarMatriz(matriz: Matriz) {
    const body = {
      Id_Matriz: matriz.id,
      Id_Solicitante: matriz.idSolicitante,
      Id_Area: matriz.idArea.toString(),
      Id_Supervisor: matriz.idSupervisor,
      UsuarioRegistro: matriz.usuarioRegistro,
      FechaRegistro: Funciones.dateFormatMMDDYY(matriz.fechaRegistro),
    };

    let request = fetch(Variables.ipercApis.GenerarMatriz, {
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

  public async guardarActividadMatriz(matrizActividad: MatrizActividad) {
    const body = {
      Id_Matriz_Actividad: matrizActividad.idMatrizActividad,
      Id_Matriz: matrizActividad.idMatriz,
      Id_Area: matrizActividad.idArea,
      Puesto: matrizActividad.puesto,
      Actividad: matrizActividad.actividad,
      Id_Tipo_Actividad: matrizActividad.idTipoActividad,
      Maquina: matrizActividad.maquina,
      Herramienta: matrizActividad.herramienta,
      Producto: matrizActividad.producto,
      Equipo: matrizActividad.equipo,
      Observacion: matrizActividad.observacion,
      UsuarioRegistro: matrizActividad.usuarioRegistro,
      FechaRegistro: Funciones.dateFormatMMDDYY(matrizActividad.fechaRegistro),
      UsuarioModifica: matrizActividad.usuarioModifica,
      FechaModifica: Funciones.dateFormatMMDDYY(matrizActividad.fechaModifica),
    };

    let request = fetch(Variables.ipercApis.GuardarActividadMatriz, {
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

  public async guardarListActividadesMatriz(
    listMatricesActividad: MatrizActividad[]
  ) {
    let listRequests = [];
    listMatricesActividad.forEach((matrizActividad) => {
      const body = {
        Id_Matriz_Actividad: matrizActividad.idMatrizActividad,
        Id_Matriz: matrizActividad.idMatriz,
        Id_Area: matrizActividad.idArea,
        Puesto: matrizActividad.puesto,
        Actividad: matrizActividad.actividad,
        Id_Tipo_Actividad: matrizActividad.idTipoActividad,
        Maquina: matrizActividad.maquina,
        Herramienta: matrizActividad.herramienta,
        Producto: matrizActividad.producto,
        Equipo: matrizActividad.equipo,
        Observacion: matrizActividad.observacion,
        UsuarioRegistro: matrizActividad.usuarioRegistro,
        FechaRegistro: Funciones.dateFormatMMDDYY(
          matrizActividad.fechaRegistro
        ),
        UsuarioModifica: matrizActividad.usuarioModifica,
        FechaModifica: Funciones.dateFormatMMDDYY(
          matrizActividad.fechaModifica
        ),
      };

      listRequests.push(
        fetch(Variables.ipercApis.GuardarActividadMatriz, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })
      );
    });

    let listResponses = [];
    let responses = Promise.all(listRequests)
      .then((responses) => {
        responses.forEach((resp) => {
          listResponses.push(resp.json());
        });

        return listResponses;
      })
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return responses;
  }

  public async updateMatrizEstado(idMatriz: string, estado: string) {
    let request = fetch(
      `${Variables.ipercApis.UpdateMatrizEstado}?Id_Matriz=${idMatriz}&Estado=${estado}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      }
    ).then((resp) => resp.json());

    let response = await request
      .then((resp) => resp.data)
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return response;
  }
}
