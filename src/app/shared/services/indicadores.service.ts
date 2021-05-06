import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { LoginAcceso } from '../models/fisics/LoginAcceso';
import { Usuario } from '../models/fisics/Usuario';
import { Deferred } from 'ts-deferred';
import { environment } from 'src/environments/environment';
import { Variables } from '../variables';
import { UsuarioLoginBody } from '../Types';

@Injectable({
  providedIn: 'root'
})
export class IndicadoresService {

  constructor() { }
  public async obtenerDashboardData(usuario: string, rol: string): Promise<any[] | void> {
    let request = fetch(`${Variables.ipercApis.ObtenerIndicadores}?Id_Usuario=${usuario}&Rol=${rol}`)
      .then((resp) => resp.json())
      .then((resp) => resp.data as any[]);

    let responseData = await request
      .then((data) => {
        let listUsuarios: any[] = [];
        data.forEach((item) => {
          const indicador: string = item['Indicador'];
          const valor: number = item['Valor'];
          const id: number = item['Id'];

          const usuario = {
            indicador,
            valor,
            id};

          listUsuarios.push(usuario);
        });

        return listUsuarios;
      })
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return responseData;
  }
}
