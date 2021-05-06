import { Injectable } from '@angular/core';
import { Funciones } from '../funciones';
import { ListaRiesgoMatriz } from '../models/fisics/ListaRiesgoMatriz';
import { MCERiesgo } from '../models/fisics/MCERiesgo';
import { MCPRiesgo } from '../models/fisics/MCPRiesgo';
import { RiesgoMatriz } from '../models/fisics/RiesgoMatriz';
import { TipoMotivo } from '../models/fisics/TipoMotivo';
import { TipoRiesgo } from '../models/fisics/TipoRiesgo';
import { MCERiesgoBody, MCPRiesgoBody, RiesgoMatrizBody } from '../Types';
import { Variables } from '../variables';

@Injectable({
  providedIn: 'root',
})
export class RiesgoService {
  public async obtenerRiesgo(): Promise<RiesgoMatriz[] | void> {
    let request = fetch(Variables.ipercApis.ObtenerRiesgo)
      .then((resp) => resp.json())
      .then((resp) => resp.data as any[]);

    let responseData = request
      .then((data) => {
        let listRiesgosMatriz: RiesgoMatriz[] = [];
        data.forEach((item) => {
          const idRiesgo: number = item['Id_Riesgo'];
          const idArea: number = item['Id_Area'];
          const riesgoData: string = item['Riesgo'];
          const estado: string = item['Estado'];
          const usuarioRegistro: string = item['UsuarioRegistro'];
          const fechaRegistro: Date = item['FechaRegistro'];
          const usuarioModifica: string = item['UsuarioModifica'];
          const fechaModifica: Date = item['FechaModifica'];

          const riesgoMatriz: RiesgoMatriz = new RiesgoMatriz(
            idRiesgo,
            idArea,
            riesgoData,
            estado,
            usuarioRegistro,
            fechaRegistro,
            usuarioModifica,
            fechaModifica
          );

          listRiesgosMatriz.push(riesgoMatriz);
        });

        return listRiesgosMatriz;
      })
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return responseData;
  }

  public async obtenerMatrizRiesgoByIdMatriz(
    idMatriz: string
  ): Promise<ListaRiesgoMatriz[] | void> {
    let request = fetch(
      `${Variables.ipercApis.ObtenerMatrizRiesgoByIdMatriz}?Id_Matriz=${idMatriz}&PAGE=0&ROWS=0`
    )
      .then((resp) => resp.json())
      .then((resp) => resp.data as any[]);

    let responseData = request
      .then((data) => {
        let listRiesgosMatriz: ListaRiesgoMatriz[] = [];
        data.forEach((item) => {
          const idMatriz: string = item['Id_Matriz'];
          const idMatrizRiesgo: string = item['Id_Matriz_Riesgo'];
          const idArea: number = item['Id_Area'];
          const idActividad: number = item['Id_Actividad'];
          const idPeligro: number = item['Id_Peligro'];
          const idRiesgo: number = item['Id_Riesgo'];
          const rPG: number = item['RP_G'];
          const rPDH: number = item['RP_DH'];
          const rPMCE: number = item['RP_MCE'];
          const rPPG: number = item['RP_PG'];
          const rPNE: number = item['RP_NE'];
          const rPP: number = item['RP_P'];
          const rPIdNivelRiesgo: number = item['RP_ID_NIVEL_RIESGO'];
          const rRG: number = item['RR_G'];
          const rRDH: number = item['RR_DH'];
          const rRMCE: number = item['RR_MCE'];
          const rRPG: number = item['RR_PG'];
          const rRNE: number = item['RR_NE'];
          const rRP: number = item['RR_P'];
          const rRIdNivelRiesgo: number = item['RR_ID_NIVEL_RIESGO'];
          const usuarioRegistro: string = item['UsuarioRegistro'];
          const fechaRegistro: Date = item['FechaRegistro'];
          const usuarioModifica: string = item['UsuarioModifica'];
          const fechaModifica: Date = item['FechaModifica'];
          const puesto: string = item['Puesto'];
          const actividad: string = item['Actividad'];
          const herramienta: string = item['Herramienta'];
          const peligro: string = item['Peligro'];
          const riesgo: string = item['Riesgo'];
          const nivelRiesgoPuro: string = item['NIVEL_RIESGO_PURO'];
          const nivelRiesgoRemanente: string = item['NIVEL_RIESGO_REMANENTE'];
          const observacion: string = item['Observacion'];
          const observacionPeligro: string = item['Observacion_Peligro'];

          const riesgoMatriz: ListaRiesgoMatriz = new ListaRiesgoMatriz();
          riesgoMatriz.idMatriz = idMatriz;
          riesgoMatriz.idMatrizRiesgo = idMatrizRiesgo;
          riesgoMatriz.idArea = idArea;
          riesgoMatriz.idActividad = idActividad;
          riesgoMatriz.idPeligro = idPeligro;
          riesgoMatriz.idRiesgo = idRiesgo;
          riesgoMatriz.rPG = rPG;
          riesgoMatriz.rPDH = rPDH;
          riesgoMatriz.rPMCE = rPMCE;
          riesgoMatriz.rPPG = rPPG;
          riesgoMatriz.rPNE = rPNE;
          riesgoMatriz.rPP = rPP;
          riesgoMatriz.rPIdNivelRiesgo = rPIdNivelRiesgo;
          riesgoMatriz.rRG = rRG;
          riesgoMatriz.rRDH = rRDH;
          riesgoMatriz.rRMCE = rRMCE;
          riesgoMatriz.rRPG = rRPG;
          riesgoMatriz.rRNE = rRNE;
          riesgoMatriz.rRP = rRP;
          riesgoMatriz.rRIdNivelRiesgo = rRIdNivelRiesgo;
          riesgoMatriz.usuarioRegistro = usuarioRegistro;
          riesgoMatriz.fechaRegistro = fechaRegistro;
          riesgoMatriz.usuarioModifica = usuarioModifica;
          riesgoMatriz.fechaModifica = fechaModifica;
          riesgoMatriz.puesto = puesto;
          riesgoMatriz.actividad = actividad;
          riesgoMatriz.herramienta = herramienta;
          riesgoMatriz.peligro = peligro;
          riesgoMatriz.riesgo = riesgo;
          riesgoMatriz.nivelRiesgoPuro = nivelRiesgoPuro;
          riesgoMatriz.nivelRiesgoRemanente = nivelRiesgoRemanente;
          riesgoMatriz.observacion = observacion;
          riesgoMatriz.observacionPeligro = observacionPeligro;

          listRiesgosMatriz.push(riesgoMatriz);
        });

        return listRiesgosMatriz;
      })
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return responseData;
  }

  public async obtenerTipoRiesgo(): Promise<TipoRiesgo[] | void> {
    let request = fetch(Variables.ipercApis.ObtenerTipoRiesgo)
      .then((resp) => resp.json())
      .then((resp) => resp.data as any[]);

    let responseData = request
      .then((data) => {
        let listTiposRiesgo: TipoRiesgo[] = [];
        data.forEach((item) => {
          const idTipoRiesgo: number = item['Id_Tipo_Riesgo'];
          const tipoRiesgoValue: string = item['Tipo_Riesgo'];
          const estado: string = item['Estado'];
          const usuarioRegistro: string = item['UsuarioRegistro'];
          const fechaRegistro: Date = item['FechaRegistro'];
          const usuarioModifica: string = item['UsuarioModifica'];
          const fechaModifica: Date = item['FechaModifica'];

          const tipoRiesgo: TipoRiesgo = new TipoRiesgo(
            idTipoRiesgo,
            tipoRiesgoValue,
            estado,
            usuarioRegistro,
            fechaRegistro,
            usuarioModifica,
            fechaModifica
          );

          listTiposRiesgo.push(tipoRiesgo);
        });

        return listTiposRiesgo;
      })
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return responseData;
  }

  public async obtenerMCERiesgo(
    idMatriz?: string
  ): Promise<MCERiesgo[] | void> {
    let url = `${Variables.ipercApis.ObtenerMCERiesgo}${
      idMatriz ? `?Id_Matriz=${idMatriz}&PAGE=0&ROWS=0` : ''
    }`;
    let request = fetch(url)
      .then((resp) => resp.json())
      .then((resp) => resp.data as any[]);

    let responseData = request
      .then((data) => {
        let listMCERiesgo: MCERiesgo[] = [];
        data.forEach((item) => {
          const idRiesgoMCE: number = item['Id_Riesgo_MCE'];
          const idMatrizRiesgo: string = item['Id_Matriz_Riesgo'];
          const idRiesgo: string = item['Id_Riesgo'];
          const idMCE: number = item['Id_MCE'];
          const idArea: number = item['Id_Area'];
          const idTipo: string = item['Id_Tipo'];
          const idResponsable: number = item['Id_Responsable'];
          const observacion: string = item['Observacion'];
          const estado: string = item['Estado'];
          const usuarioRegistro: string = item['UsuarioRegistro'];
          const fechaRegistro: Date = item['FechaRegistro'];
          const usuarioModifica: string = item['UsuarioModifica'];
          const fechaModifica: Date = item['FechaModifica'];
          const mC: string = item['MC'];
          const tipoMC: string = item['Tipo_MC'];
          const estadoDesc: string = item['EstadoDesc'];
          const Responsable: string = item['Responsable'];

          const mceRiesgo: MCERiesgo = new MCERiesgo(
            idRiesgoMCE,
            idMatrizRiesgo,
            idRiesgo,
            idMCE,
            idArea,
            idTipo,
            idResponsable,
            observacion,
            estado,
            usuarioRegistro,
            fechaRegistro,
            usuarioModifica,
            fechaModifica,
            mC,
            tipoMC,
            estadoDesc,
            Responsable
          );
          listMCERiesgo.push(mceRiesgo);
        });

        return listMCERiesgo;
      })
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return responseData;
  }

  public async obtenerMCPRiesgo(
    idMatriz?: string
  ): Promise<MCPRiesgo[] | void> {
    let url: string = `${Variables.ipercApis.ObtenerMCPRiesgo}${
      idMatriz ? `?Id_Matriz=${idMatriz}&PAGE=0&ROWS=0` : ''
    }`;
    let request = fetch(url)
      .then((resp) => resp.json())
      .then((resp) => resp.data as any[]);

    let responseData = request
      .then((data) => {
        let listMCPRiesgo: MCPRiesgo[] = [];
        data.forEach((item) => {
          const idRiesgoMCP: number = item['Id_Riesgo_MCP'];
          const idMatrizRiesgo: string = item['Id_Matriz_Riesgo'];
          const idRiesgo: string = item['Id_Riesgo'];
          const idMCP: number = item['Id_MCP'];
          const idArea: number = item['Id_Area'];
          const idTipo: string = item['Id_Tipo'];
          const idResponsable: number = item['Id_Responsable'];
          const observacion: string = item['Observacion'];
          const estado: string = item['Estado'];
          const usuarioRegistro: string = item['UsuarioRegistro'];
          const fechaRegistro: Date = item['FechaRegistro'];
          const usuarioModifica: string = item['UsuarioModifica'];
          const fechaModifica: Date = item['FechaModifica'];
          const mC: string = item['MC'];
          const tipoMC: string = item['Tipo_MC'];
          const estadoDesc: string = item['EstadoDesc'];
          const Responsable: string = item['Responsable'];

          const mceRiesgo: MCPRiesgo = new MCPRiesgo(
            idRiesgoMCP,
            idMatrizRiesgo,
            idRiesgo,
            idMCP,
            idArea,
            idResponsable,
            idTipo,
            observacion,
            estado,
            usuarioRegistro,
            fechaRegistro,
            usuarioModifica,
            fechaModifica,
            mC,
            tipoMC,
            estadoDesc,
            Responsable
          );
          listMCPRiesgo.push(mceRiesgo);
        });

        return listMCPRiesgo;
      })
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return responseData;
  }

  public async guardarRiesgoMatriz(
    listaRiesgoMatriz: ListaRiesgoMatriz
  ): Promise<any | void> {
    const body: RiesgoMatrizBody = {
      Id_Matriz: listaRiesgoMatriz.idMatriz,
      Id_Matriz_Riesgo: listaRiesgoMatriz.idMatrizRiesgo,
      Id_Area: listaRiesgoMatriz.idArea,
      Id_Actividad: listaRiesgoMatriz.idActividad,
      Id_Peligro: listaRiesgoMatriz.idPeligro,
      Riesgo: listaRiesgoMatriz.riesgo,
      RP_G: listaRiesgoMatriz.rPG,
      RP_DH: listaRiesgoMatriz.rPDH,
      RP_MCE: listaRiesgoMatriz.rPMCE,
      RP_PG: listaRiesgoMatriz.rPPG,
      RP_NE: listaRiesgoMatriz.rPNE,
      RP_P: listaRiesgoMatriz.rPP,
      RP_ID_NIVEL_RIESGO: listaRiesgoMatriz.rPIdNivelRiesgo,
      RR_G: listaRiesgoMatriz.rRG,
      RR_DH: listaRiesgoMatriz.rRDH,
      RR_MCE: listaRiesgoMatriz.rRMCE,
      RR_PG: listaRiesgoMatriz.rRPG,
      RR_NE: listaRiesgoMatriz.rRNE,
      RR_P: listaRiesgoMatriz.rRP,
      RR_ID_NIVEL_RIESGO: listaRiesgoMatriz.rRIdNivelRiesgo,
      Observacion: listaRiesgoMatriz.observacion,
      UsuarioRegistro: listaRiesgoMatriz.usuarioRegistro,
      FechaRegistro: Funciones.dateFormatMMDDYY(listaRiesgoMatriz.fechaRegistro),
      UsuarioModifica: listaRiesgoMatriz.usuarioModifica,
      FechaModifica: Funciones.dateFormatMMDDYY(listaRiesgoMatriz.fechaModifica),
    };

    let request = fetch(Variables.ipercApis.GuardarRiesgoMatriz, {
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

  public async guardarMCERiesgo(mceRiesgo: MCERiesgo): Promise<any | void> {
    const body: MCERiesgoBody = {
      Id_Riesgo_MCE: mceRiesgo.idRiesgoMCE,
      Id_Matriz_Riesgo: mceRiesgo.idMatrizRiesgo,
      Id_Area: mceRiesgo.idArea,
      Id_Riesgo: mceRiesgo.idRiesgo,
      MC: mceRiesgo.mC,
      Id_Tipo: mceRiesgo.idTipo,
      Id_Responsable: mceRiesgo.idResponsable,
      Estado: mceRiesgo.estado,
      Observacion: mceRiesgo.observacion,
      FechaRegistro: Funciones.dateFormatMMDDYY(mceRiesgo.fechaRegistro),
      UsuarioModifica: mceRiesgo.usuarioModifica,
      FechaModifica: Funciones.dateFormatMMDDYY(mceRiesgo.fechaModifica),
    };

    let request = fetch(Variables.ipercApis.GuardarMCERiesgo, {
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

  public async guardarMCPRiesgo(mcpRiesgo: MCPRiesgo): Promise<any | void> {
    const body: MCPRiesgoBody = {
      Id_Riesgo_MCP: mcpRiesgo.idRiesgoMCP,
      Id_Matriz_Riesgo: mcpRiesgo.idMatrizRiesgo,
      Id_Area: mcpRiesgo.idArea,
      Id_Riesgo: mcpRiesgo.idRiesgo,
      MC: mcpRiesgo.mC,
      Id_Tipo: mcpRiesgo.idTipo,
      Id_Responsable: mcpRiesgo.idResponsable,
      Estado: mcpRiesgo.estado,
      Observacion: mcpRiesgo.observacion,
      UsuarioRegistro: mcpRiesgo.usuarioRegistro,
      FechaRegistro: Funciones.dateFormatMMDDYY(mcpRiesgo.fechaRegistro),
      UsuarioModifica: mcpRiesgo.usuarioModifica,
      FechaModifica: Funciones.dateFormatMMDDYY(mcpRiesgo.fechaModifica),
    };

    let request = fetch(Variables.ipercApis.GuardarMCPRiesgo, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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

  public async eliminarMCERiesgo(mceRiesgo: MCERiesgo): Promise<any | void> {
    const body = {
      // Id_Riesgo_MCE: mceRiesgo.idRiesgoMCE,
      Id_MCE: mceRiesgo.idMCE,
      Id_Matriz_Riesgo: mceRiesgo.idMatrizRiesgo,
      // Id_Area: mceRiesgo.idArea,
      Id_Riesgo: mceRiesgo.idRiesgo,
      // MC: mceRiesgo.mC,
      // Id_Tipo: mceRiesgo.idTipo,
      // Id_Responsable: mceRiesgo.idResponsable,
      // Estado: mceRiesgo.estado,
      // Observacion: mceRiesgo.observacion,
      UsuarioRegistro: mceRiesgo.usuarioRegistro,
      FechaRegistro: Funciones.dateFormatMMDDYY(mceRiesgo.fechaRegistro),
      // UsuarioModifica: mceRiesgo.usuarioModifica,
      // FechaModifica: Funciones.dateFormatDDMMYY(mceRiesgo.fechaModifica),
    };

    let request = fetch(Variables.ipercApis.EliminarRiesgoMCERiesgo, {
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
  
  public async eliminarMCPRiesgo(mceRiesgo: MCPRiesgo): Promise<any | void> {
    const body = {
      // Id_Riesgo_MCE: mceRiesgo.idRiesgoMCP,
      Id_MCP: mceRiesgo.idMCP,
      Id_Matriz_Riesgo: mceRiesgo.idMatrizRiesgo,
      // Id_Area: mceRiesgo.idArea,
      Id_Riesgo: mceRiesgo.idRiesgo,
      // MC: mceRiesgo.mC,
      // Id_Tipo: mceRiesgo.idTipo,
      // Id_Responsable: mceRiesgo.idResponsable,
      // Estado: mceRiesgo.estado,
      // Observacion: mceRiesgo.observacion,
      UsuarioRegistro: mceRiesgo.usuarioRegistro,
      FechaRegistro: Funciones.dateFormatMMDDYY(mceRiesgo.fechaRegistro),
      // UsuarioModifica: mceRiesgo.usuarioModifica,
      // FechaModifica: Funciones.dateFormatDDMMYY(mceRiesgo.fechaModifica),
    };

    let request = fetch(Variables.ipercApis.EliminarRiesgoMCPRiesgo, {
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

  public async eliminarRiesgo(riesgo: ListaRiesgoMatriz): Promise<any | void> {
    const body = {
      Id_Matriz_Riesgo: riesgo.idRiesgo,
      UsuarioRegistro: riesgo.usuarioRegistro,
      FechaRegistro: Funciones.dateFormatMMDDYY(riesgo.fechaRegistro),
    };

    let request = fetch(Variables.ipercApis.EliminarRiesgo, {
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
