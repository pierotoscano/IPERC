import { Injectable } from '@angular/core';
import { Constante } from '../models/fisics/Constante';
import { Variables } from '../variables';

@Injectable({
  providedIn: 'root',
})
export class ConstanteService {
  async obtenerConstante(): Promise<Constante[] | void> {
    let request = fetch(Variables.ipercApis.ObtenerConstante)
      .then((resp) => resp.json())
      .then((resp) => resp.data as any[]);

    let responseData = await request
      .then((data) => {
        let listConstantes: Constante[] = [];
        data.forEach((item) => {
          const id: string = item['Id_Constante'];
          const valor1: string = item['Valor1'];
          const valor2: string = item['Valor2'];
          const valor3: string = item['Valor3'];
          const valor4: string = item['Valor4'];
          const estado: string = item['Estado'];

          const constante = new Constante(
            id,
            valor1,
            valor2,
            valor3,
            valor4,
            estado
          );

          listConstantes.push(constante);
        });

        return listConstantes;
      })
      .catch((error) => {
        console.error('Error found: ' + error);
      });

    return responseData;
  }
}
