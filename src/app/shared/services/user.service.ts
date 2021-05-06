import { Injectable } from '@angular/core';
import { sp, IPrincipalInfo, PrincipalType, PrincipalSource } from '@pnp/sp';
import '@pnp/sp/sputilities';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import pnp from '@pnp/pnpjs';
import { User } from '../models/fisics/base/User';
import RolAcceso from '../models/fisics/RolAcceso';
import { MenuAcceso } from '../models/fisics/MenuAcceso';
import { Usuario } from '../models/fisics/Usuario';
import { Deferred } from 'ts-deferred';
import { environment } from 'src/environments/environment';
//import { PromiseState } from 'q';
import { Variables } from '../variables';
import { UsuarioConsultado } from '../variables';
//import {Promise} from 'promise-polyfill';
import { Web } from '@pnp/sp/webs';
import { UsuarioBody } from '../Types';
import { Funciones } from '../funciones';

const emptyUserBase64 =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAwADADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDs2Y5HA6DsPSk3H0H5Chuv4D+VS2lubq7htwcGRwufSgBYLe5uiRBA0mOu1M4ps0U1u+yaJo29GTFeiW9vFawLDCgVFGABUWoWMWoWjQyAZI+Vu6n1oA883H0H5CnKx3DgdfQU1lKOyN95SQaF+8PrQAN1/Afyqzps622pW8z8KrjcfQdKrN1/AfyresPC8txEstzL5KsMhAMt+PpQB14IIyDkGmu6xxtI5AVRkk9hXP7tX0VfKSL7baj7jYO5R6HFRONX10iGSL7Ja/xZB5/Pk0Ac3NJ5txLLjG9y35mmr94fWugvfCssUZktZvNwMlGGCfpXPr98fWgC3psQn1W1jYZUuuR7DmvQq4jw9GW1uE4OFQt/47/9eu3oAKKKKACuC1iEQa3cIBgFwwH15rva4vxHGRrhIB+ZFP8ASgD/2Q==';
declare function UpdateFormDigest(
  siteurl: string,
  refreshInterval: number
): void;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {
    sp.setup({
      ie11: true,
      sp: {
        baseUrl: `${environment.proxyUrl}${environment.webRelativeUrl}`,
      },
    });
  }
  private _pendingSearch: Promise<User[]>;
  private _lastSearch: number;

  async searchUser(searchValue: string, groupName?: string): Promise<User[]> {
    try {
      const prefixUrl =
          `https://quicorp.sharepoint.com${environment.webRelativeUrl}` +
          '/_layouts/15/userphoto.aspx?size=S&accountname=',
        url =
          `${environment.proxyUrl}${environment.webRelativeUrl}` +
          '/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.clientPeoplePickerSearchUser';

      let principals: IPrincipalInfo[] = await pnp.sp.utility.searchPrincipals(
        searchValue,
        PrincipalType.User,
        PrincipalSource.All,
        groupName || '',
        10
      );

      return principals.map((entity) => {
        let EmailCorrecto = '';
        if (entity.LoginName) {
          EmailCorrecto = entity.LoginName.replace('i:0#.f|membership|', '');
        }
        return <User>{
          Id: entity.PrincipalId,
          Key: entity.LoginName,
          Title: entity.DisplayName,
          Email: EmailCorrecto,
          PictureUrl: prefixUrl + EmailCorrecto,
        };
      });
    } catch (err) {
      if (err.status !== 403) {
        throw err;
      }
      //UpdateFormDigest(_spPageContextInfo.webServerRelativeUrl, _spFormDigestRefreshInterval);
      return await this.searchUser(searchValue, groupName);
    }
  }
  async getCurrentUser(): Promise<User> {
    if (UsuarioConsultado._user == null) {
      let user: User;
      user = await pnp.sp.web.currentUser.expand('groups').get();
      user = user as User;
      await this.setPictureUrlToUser(user);
      UsuarioConsultado._user = user;
    }

    return UsuarioConsultado._user;
  }

  public getUserIdEnsure(email: string): Promise<number> {
    const url = `${environment.proxyUrl}${environment.webRelativeUrl}`;
    const web = Web(url);
    return web.ensureUser(email).then((result) => {
      return result.data.Id;
    });
  }

  async getUserId(key: string): Promise<number> {
    const d: Deferred<number> = new Deferred<number>();

    let url =
      `${environment.proxyUrl}${environment.webRelativeUrl}` +
      "/_api/web/siteusers(@v)?@v='" +
      encodeURIComponent(key) +
      "'";

    if (!environment.production) {
      url =
        `${environment.proxyUrl}` +
        "/_api/web/siteusers(@v)?@v='" +
        encodeURIComponent(key) +
        "'";
    }

    const httpOptions = {
      headers: new HttpHeaders({
        accept: 'application/json;odata=verbose',
        'content-type': 'application/json;odata=verbose',
      }),
    };

    this.http.get(url, httpOptions).subscribe((response) => {
      d.resolve((<any>response).d.Id);
    });
    //.then(response => (<any>response.data).d.Id);
    return d.promise;
  }

  private _debounceSearch(): boolean {
    var now = new Date().getMilliseconds();
    this._lastSearch = this._lastSearch || now;
    return now - this._lastSearch < 1000;
  }

  private _refreshDebounce() {
    this._lastSearch = 0;
    this._pendingSearch = null;
    //this._cancelSearch = angular.noop;
  }

  async setPictureUrlToUser(user: User): Promise<void> {
    if (!user) return;
    if (user.Email) {
      // let pictureUrl = await this._getPictureUrlByLoginName(
      //   user.Key || user.Name
      // );
      // user.PictureUrl = pictureUrl || emptyUserBase64;
    }

    user.PictureUrl = emptyUserBase64;
  }

  delayedSearchUser(searchValue: string, groupName?: string): Promise<User[]> {
    if (!this._pendingSearch || !this._debounceSearch()) {
      //this._cancelSearch("La consulta se prolongó a mas de 1000ms");
      /*this._pendingSearch = //this.((resolve, reject) => {
        //this._cancelSearch = reject;
        await this.searchUser(searchValue, groupName)
          .then(users => {
            resolve(users);
            this._refreshDebounce();
          });
      //});*/
    }
    return this._pendingSearch;
  }

  private _getPictureUrlByLoginName(key: string): Promise<string> {
    return pnp.sp.profiles
      .getUserProfilePropertyFor(key, 'PictureURL')
      .then((result) => {
        return result;
      })
      .catch(function (err) {
        console.error('Error: ' + err);
        return null;
      });
  }

  private getUserProperties(key: string): Promise<User> {
    return pnp.sp.profiles
      .getPropertiesFor(key)
      .then(
        (result: any) =>
          <User>{
            Title: result.DisplayName,
            Key: result.AccountName,
            Email: result.Email,
            PictureUrl: result.PictureUrl,
          }
      )
      .catch(function (err) {
        console.error('Error: ' + err);
        return <User>null;
      });
  }

  public async getUsuariosPorGrupo(nombreGrupo: string): Promise<User[]> {
    const usuarios = await pnp.sp.web.siteGroups
      .getByName(nombreGrupo)
      .users.get();

    //listaUsuarios = User.parseJsonList(usuarios);
    const listaUsuarios: User[] = usuarios.map((element) => {
      const user = new User();
      user.Id = element[Variables.columns.Id];
      user.Title = element[Variables.columns.Title];
      user.Email = element[Variables.columns.Email];

      return user;
    });

    return listaUsuarios;
  }

  public async obtenerUsuario(email: string): Promise<Usuario[] | void> {
    let request = fetch(`${Variables.ipercApis.ObtenerUsuario}?Email=${email}`)
      .then((resp) => resp.json())
      .then((resp) => resp.data as any[]);

    let responseData = await request
      .then((data) => {
        let listUsuarios: Usuario[] = [];
        data.forEach((item) => {
          const idUsuario: string = item['Id_Usuario'];
          const idUbicacion: string = item['Id_Ubicacion'];
          const rol: string = item['Rol'];
          const apellidoPaterno: string = item['ApellidoPaterno'];
          const apellidoMaterno: string = item['ApellidoMaterno'];
          const nombres: string = item['Nombres'];
          const email: string = item['Email'];
          const usuarioValue: string = item['Usuario'];
          const key: string = item['Key'];
          const selected: number = item['Selected'];
          const tipo: number = item['Tipo'];
          const idLogin: number = item['Id_Login'];
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
            fechaModifica,
            selected,
            tipo,
            idLogin
          );

          listUsuarios.push(usuario);
        });

        return listUsuarios;
      })
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return responseData;
  }

  public async obtenerAcceso(): Promise<RolAcceso[] | void> {
    let request = fetch(Variables.ipercApis.ObtenerAcceso)
      .then((resp) => resp.json())
      .then((resp) => resp.data as any[]);

    let responseData = await request
      .then((data) => {
        let listRolesAcceso: RolAcceso[] = [];
        data.forEach((item) => {
          const idRol: string = item['Id_Rol'];
          const idInterfaz: number = item['Id_Interfaz'];
          const visualizar: boolean = item['Visualizar'];
          const registrar: boolean = item['Registrar'];
          const editar: boolean = item['Editar'];
          const eliminar: boolean = item['Eliminar'];
          const aprobar: boolean = item['Aprobar'];
          const rechazar: boolean = item['Rechazar'];
          const estado: string = item['Estado'];
          const usuarioRegistro: string = item['UsuarioRegistro'];
          const fechaRegistro: Date = item['FechaRegistro'];
          const usuarioModifica: string = item['UsuarioModifica'];
          const fechaModifica: Date = item['FechaModifica'];

          const rolAcceso = new RolAcceso(
            idRol,
            idInterfaz,
            visualizar,
            registrar,
            editar,
            eliminar,
            aprobar,
            rechazar,
            estado,
            usuarioRegistro,
            fechaRegistro,
            usuarioModifica,
            fechaModifica
          );

          listRolesAcceso.push(rolAcceso);
        });

        return listRolesAcceso;
      })
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return responseData;
  }

  public async getAllSiteUsers() {
    const users = await pnp.sp.web.siteUsers();
    return users;
  }

  public async guardarUsuario(usuario: Usuario) {
    const body: UsuarioBody = {
      Id_Usuario: usuario.idUsuario,
      Id_Ubicacion: usuario.idUbicacion,
      Rol: usuario.rol,
      ApellidoPaterno: usuario.apellidoPaterno,
      ApellidoMaterno: usuario.apellidoMaterno,
      Nombres: usuario.nombres,
      Email: usuario.email,
      Key: usuario.key,
      Estado: usuario.estado,
      UsuarioRegistro: usuario.usuarioRegistro,
      FechaRegistro: Funciones.dateFormatMMDDYY(usuario.fechaRegistro),
      UsuarioModifica: usuario.usuarioModifica,
      FechaModifica: Funciones.dateFormatMMDDYY(usuario.fechaModifica),
    };

    let request = fetch(Variables.ipercApis.GuardarUsuario, {
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
