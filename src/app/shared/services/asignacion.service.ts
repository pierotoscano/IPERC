import { Injectable } from '@angular/core';
import { Asignacion } from '../models/fisics/Asignacion';
import { Variables } from '../variables';
import { AsignacionBody } from '../Types';
import { Funciones } from '../funciones';

@Injectable({
  providedIn: 'root',
})
export class AsignacionService {
  public async guardarAsignacion(asignacion: Asignacion): Promise<any | void> {
    const body: AsignacionBody = {
      Id_Asignacion: asignacion.id,
      Id_Matriz: asignacion.idMatriz,
      Id_Matriz_Riesgo: asignacion.idMatrizRiesgo,
      Id_PRG: asignacion.idPRG,
      Id_MC: asignacion.idMC,
      Id_Supervisor: asignacion.idSupervisor,
      Id_Responsable: asignacion.idResponsable,
      Fecha_Inicio: Funciones.dateFormatMMDDYY(asignacion.fechaInicio),
      Fecha_Fin: Funciones.dateFormatMMDDYY(asignacion.fechaFin),
      Avance: asignacion.avance,
      Observacion: asignacion.observacion,
      Estado: asignacion.estado,
      UsuarioRegistro: asignacion.usuarioRegistro,
      FechaRegistro: Funciones.dateFormatMMDDYY(asignacion.fechaRegistro),
      UsuarioModifica: asignacion.usuarioModifica,
      FechaModifica: Funciones.dateFormatMMDDYY(asignacion.fechaModifica),
    };

    let request = fetch(Variables.ipercApis.GuardarAsignacion, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    let response = await request.then((resp) => resp.response);

    return response;
  }
}
