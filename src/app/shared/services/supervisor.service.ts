import { Injectable } from '@angular/core';
import { Usuario } from '../models/fisics/Usuario';
import { SupervisorBody, UsuarioBody } from '../Types';
import { Funciones } from '../funciones';
import { Variables } from '../variables';
import { SolicitudMatriz } from '../models/fisics/SolicitudMatriz';

@Injectable({
  providedIn: 'root',
})
export class SupervisorService {
  public async obtenerUsuariosPorRol(
    tipoRol: string
  ): Promise<Usuario[] | void> {
    let request = fetch(`${Variables.ipercApis.ObtenerUsuario}?Email=%`)
      .then((resp) => resp.json())
      .then((resp) => resp.data as any[]);

    let responseData = await request
      .then((data) => {
        let listUsuarios: Usuario[] = [];
        data.forEach((item) => {
          if (item['Rol'] == tipoRol) {
            const idUsuario: string = item['Id_Usuario'];
            const idUbicacion: string = item['Id_Ubicacion'];
            const rol: string = item['Rol'];
            const apellidoPaterno: string = item['ApellidoPaterno'];
            const apellidoMaterno: string = item['ApellidoMaterno'];
            const nombres: string = item['Nombres'];
            const email: string = item['Email'];
            const usuarioValue: string = item['Usuario'];
            const key: string = item['Key'];
            const estado: string = item['Estado'];
            const usuarioRegistro: string = item['UsuarioRegistro'];
            const fechaRegistro: Date = item['FechaRegistro'];
            const usuarioModifica: string = item['UsuarioModifica'];
            const fechaModifica: Date = item['FechaModifica'];

            const usuario = new Usuario(
              idUsuario,
              idUbicacion,
              rol,
              apellidoPaterno,
              apellidoMaterno,
              nombres,
              email,
              usuarioValue,
              key,
              estado,
              usuarioRegistro,
              fechaRegistro,
              usuarioModifica,
              fechaModifica
            );

            listUsuarios.push(usuario);
          }
        });

        return listUsuarios;
      })
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return responseData;
  }

  public async asignarSupervisor(
    supervisor: Usuario,
    usuarioLogged: Usuario,
    solicitudMatriz: SolicitudMatriz
  ) {
    const body: SupervisorBody = {
      Id_Supervisor: supervisor.idUsuario,
      Id_Area: solicitudMatriz.idArea,
      UsuarioModifica: usuarioLogged.usuario,
      FechaModifica: Funciones.dateFormatMMDDYY(new Date()),
    };

    let request = fetch(Variables.ipercApis.AsignarSupervisor, {
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
