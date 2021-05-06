import { Injectable } from '@angular/core';
// import { sp, IPrincipalInfo, PrincipalType, PrincipalSource } from '@pnp/sp';
// import '@pnp/sp/sputilities';

import { HttpClient, HttpHeaders } from '@angular/common/http';
// import pnp from '@pnp/pnpjs';
// import { User } from '../models/fisics/base/User';
// import RolAcceso from '../models/fisics/RolAcceso';
// import { LoginAcceso } from '../models/fisics/LoginAcceso';
// import { MenuAcceso } from '../models/fisics/MenuAcceso';
import { Usuario } from '../models/fisics/Usuario';
import { Deferred } from 'ts-deferred';
import { environment } from 'src/environments/environment';
//import { PromiseState } from 'q';
import { Variables } from '../variables';
// import { UsuarioConsultado } from '../variables';
//import {Promise} from 'promise-polyfill';
// import { Web } from '@pnp/sp/webs';
import { UsuarioLoginBody } from '../Types';
// import { Funciones } from '../funciones';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {
    // sp.setup({
    //   ie11: true,
    //   sp: {
    //     baseUrl: `${environment.proxyUrl}${environment.webRelativeUrl}`,
    //   },
    // });
  }

  // public async obtenerLogin(usuario: UsuarioLoginBody): Promise<LoginAcceso[] | void> {
  //   const body: UsuarioLoginBody = {
  //     Email: usuario.Email,
  //     Key: usuario.Key
  //   };

  //   let request = fetch(Variables.ipercApis.ObtenerLogin, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(body),
  //   })
  //     .then((resp) => resp.json())
  //     .then((resp) => resp.data as any[]);

  //   let responseData = await request
  //     .then((data) => {
  //       let listLoginAcceso: LoginAcceso[] = [];
  //       data.forEach((data) => {
  //         const idUsuario: string = item['id'];
  //         const idHash: string = item['idhash'];
  //         const username: string = item['username'];
  //         const fullusername: string = item['fullusername'];
  //         const idExternalCompany: string = item['external_company_id'];
  //         const idMensaje: string = item['id_mensaje'];
  //         const mensaje: string = item['mensaje'];
  //         const token: string = item['token'];

  //         const loginAcceso = new LoginAcceso(
  //           idUsuario,
  //           idHash,
  //           username,
  //           fullusername,
  //           idExternalCompany,
  //           idMensaje,
  //           mensaje,
  //           token
  //         );

  //         listLoginAcceso.push(loginAcceso);
  //       });

  //       return listLoginAcceso;
  //     })
  //     .catch((error) => {
  //       console.error('Error found: ' + error);
  //     });

  //   return responseData;
  // }

  public async obtenerLogin(usuario: UsuarioLoginBody): Promise<number | void> {
    const body: UsuarioLoginBody = {
      Usuario: usuario.Usuario,
      Key: usuario.Key,
      Id_Usuario: usuario.Id_Usuario,
      Tipo: 1,
      UsuarioRegistro: usuario.UsuarioRegistro,
      FechaRegistro: usuario.FechaRegistro,
      UsuarioModifica: usuario.UsuarioModifica,
      FechaModifica: usuario.FechaModifica,
    };

    let request = fetch(Variables.ipercApis.ObtenerLogin, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .then((resp) => resp.data as any[]);

    let responseData = await request
      .then((data) => {
        // let listLoginAcceso: LoginAcceso[] = [];
        let resp: number = -1;
        // data.forEach((data) => {
        resp = <number>(<unknown>data);
        // });

        return resp;
      })
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return responseData;
  }

  private _userLogged: Usuario;
  public getUserLogged(): Usuario {
    return this._userLogged;
  }

  public setUserLogged(usuario: Usuario): void {
    this._userLogged = usuario;
  }
}
