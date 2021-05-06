import { Injectable } from '@angular/core';
import { ISiteUserInfo } from '@pnp/sp/site-users/types';
import { Participante } from '../models/fisics/Participante';
import { ParticipanteData } from '../models/fisics/ParticipanteData';
import { ParticipanteBody, ParticipanteValue } from '../Types';
import { Variables } from '../variables';

@Injectable({
  providedIn: 'root',
})
export class ParticipanteService {
  public async obtenerParticipantes(
    idVisita: string
  ): Promise<ParticipanteData[] | void> {
    let request = fetch(
      `${Variables.ipercApis.ObtenerParticipantes}?Id_Visita=${idVisita}`
    )
      .then((resp) => resp.json())
      .then((resp) => resp.data as any[]);

    let response = await request
      .then((data) => {
        let listParticipantes: ParticipanteData[] = [];
        data.forEach((item) => {
          const idVisita = item['Id_Visita'];
          const idParticipante = item['Id_Participante'];
          const asistencia = item['Asistencia'];
          const usuario = item['Usuario'];
          const email = item['Email'];

          const participante = new ParticipanteData();
          participante.idVisita = idVisita;
          participante.idParticipante = idParticipante;
          participante.asistencia = asistencia;
          participante.usuario = usuario;
          participante.email = email;

          listParticipantes.push(participante);
        });

        return listParticipantes;
      })
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return response;
  }

  public async guardarParticipantes(
    participante: Participante
  ): Promise<any | void> {
    const body: ParticipanteBody = {
      Id_Visita: participante.idVisita,
      json: participante.json,
    };

    let request = fetch(Variables.ipercApis.GuardarParticipantes, {
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

  public async guardarListParticipantes(
    idVisita: string,
    listParticipantes: ISiteUserInfo[]
  ) {
    let listJson = [];

    listParticipantes.forEach((p) => {
      listJson.push({
        Id_Usuario: p.Id.toString(),
        Email: p.Email,
        Nombre: p.Title,
      });
    });

    const body: ParticipanteBody = {
      Id_Visita: idVisita,
      json: JSON.stringify(listJson),
    };

    let request = fetch(Variables.ipercApis.GuardarParticipantes, {
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

    /*
    listParticipantes.forEach((p) => {
      let json = {
        Id_Usuario: p.participante.Id,
      };
      const body: ParticipanteBody = {
        Id_Visita: p.idVisita,
        json: JSON.stringify(json),
      };

      listRequests.push(
        fetch(`${Variables.ipercApis.GuardarParticipantes}TEST`, {
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

    return responses;*/
  }
}
