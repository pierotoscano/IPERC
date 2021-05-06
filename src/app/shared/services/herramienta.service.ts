import { Injectable } from '@angular/core';
import { Herramienta } from '../models/fisics/Herramienta';
import { Variables } from '../variables';

@Injectable({
  providedIn: 'root',
})
export class HerramientaService {
  async obtenerHerramienta(): Promise<Herramienta[] | void> {
    let request = fetch(Variables.ipercApis.ObtenerHerramienta)
      .then((resp) => resp.json())
      .then((resp) => resp.data as any[]);

    let responseData = await request
      .then((data) => {
        let listHerramientas: Herramienta[] = [];
        data.forEach((item) => {
          const id: number = item['Id_Herramienta'];
          const herramientaValue: string = item['Herramienta'];
          const estado: string = item['Estado'];
          const usuarioRegistro: string = item['UsuarioRegistro'];
          const fechaRegistro: Date = item['FechaRegistro'];
          const usuarioModifica: string = item['UsuarioModifica'];
          const fechaModifica: Date = item['FechaModifica'];

          const herramienta = new Herramienta(
            id,
            herramientaValue,
            estado,
            usuarioRegistro,
            fechaRegistro,
            usuarioModifica,
            fechaModifica
          );

          listHerramientas.push(herramienta);
        });

        return listHerramientas;
      })
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return responseData;
  }
}
