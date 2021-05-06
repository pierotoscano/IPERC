import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatrizActividad } from 'src/app/shared/models/fisics/MatrizActividad';
import { MatrizService } from 'src/app/shared/services/matriz.service';
import { Usuario } from 'src/app/shared/models/fisics/Usuario';
import { Matriz } from 'src/app/shared/models/fisics/Matriz';
import { Puesto } from 'src/app/shared/models/fisics/Puesto';

export type MatrizActividadSelection = {
  actividad: MatrizActividad;
  selected: boolean;
};

export interface DialogData {
  listActividadesSelected: MatrizActividad;
  usuario: Usuario;
  matriz: Matriz;
  puesto: Puesto;
}

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.scss'],
})
export class ActividadesComponent implements OnInit {
  displayedColumns = [
    'Id',
    'Actividad',
    'Tipo',
    'Maquina',
    'Herramientas',
    'Equipo',
    'Producto',
  ];

  dataTableActividades: DialogData;

  listMatrizActividadSelection: MatrizActividadSelection[] = [];
  dataSource: MatTableDataSource<MatrizActividadSelection>;
  constructor(
    private matrizService: MatrizService,
    public dialogRef: MatDialogRef<ActividadesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    data.listActividadesSelected = null;
    this.dataSource = new MatTableDataSource<MatrizActividadSelection>(
      this.listMatrizActividadSelection
    );
  }

  // matrizId: string = "21000002";

  ngOnInit(): void {
    this.matrizService
    .obtenerActividadMatriz(this.data.matriz.id)
    // .obtenerActividadMatriz(this.matrizId)
      .then((actividades) => {
        let listActividades = actividades ? actividades : [];
        listActividades = listActividades.filter(actividad => actividad.idPuesto === this.data.puesto.idPuesto);
        listActividades.forEach((a) => {
          this.listMatrizActividadSelection.push({
            actividad: a,
            selected: false,
          });
        });
        this.dataSource = new MatTableDataSource<MatrizActividadSelection>(
          this.listMatrizActividadSelection
        );
      });
  }

  // addOrPutOffActividad(actividadMatriz: MatrizActividadSelection) {
  //   if (actividadMatriz.selected) {
  //     this.data.listActividadesSelected.push(actividadMatriz.actividad);
  //   } else {
  //     let index = this.data.listActividadesSelected.findIndex(
  //       (a) =>
  //         a.idMatrizActividad == actividadMatriz.actividad.idMatrizActividad
  //     );
  //     this.data.listActividadesSelected.splice(index, 1);
  //   }
  // }

  // selected: MatrizActividad;
  closeDialog() {
    // console.log(this.listMatrizActividadSelection)
    // console.log(this.data.listActividadesSelected)
    this.data.listActividadesSelected = null;
    this.dialogRef.close();
  }
  
  saveDialog() {
    // this.data.nuevaActividad.actividad = this.formAddActividad.controls["descripcion"].value.trim();
    // this.data.nuevaActividad.idTipoActividad = this.formAddActividad.controls["tipoRiesgo"].value;
    // this.data.nuevaActividad.herramienta = this.herramientas.join(',');
    // this.data.nuevaActividad.equipo = this.equipos.join(',');
    // this.data.nuevaActividad.maquina = this.maquinas.join(',');
    // this.data.nuevaActividad.producto = this.productos.join(',');

    // this.data.nuevaActividad.fechaModifica = new Date();
    // this.data.nuevaActividad.fechaRegistro = new Date();
    // this.data.nuevaActividad.observacion = '';
    this.dialogRef.close(this.data);
  }
}
