import { Injectable } from '@angular/core';
import { Funciones } from '../funciones';
import { Evidencia } from '../models/fisics/Evidencia';
import { EvidenciaBody } from '../Types';
import { Variables } from '../variables';

@Injectable({
  providedIn: 'root',
})
export class EvidenciaService {
  public async guardarEvidencia(evidencia: Evidencia): Promise<any | void> {
    const body: EvidenciaBody = {
      Id_Evidencia: evidencia.id,
      Id_Asignacion: evidencia.idAsignacion,
      Id_Matriz: evidencia.idMatriz,
      Evidencia: evidencia.evidencia,
      Url: evidencia.url,
      Observacion: evidencia.observacion,
      Avance: evidencia.avance,
      Estado: evidencia.estado,
      UsuarioRegistro: evidencia.usuarioRegistro,
      FechaRegistro: Funciones.dateFormatMMDDYY(evidencia.fechaRegistro),
      UsuarioModifica: evidencia.usuarioModifica,
      FechaModifica: Funciones.dateFormatMMDDYY(evidencia.fechaModifica),
    };

    let request = fetch(Variables.ipercApis.GuardarEvidencia, {
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
}
