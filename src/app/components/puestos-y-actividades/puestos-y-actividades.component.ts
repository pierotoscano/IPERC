import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { PuestoService } from '../../shared/services/puesto.service';
import { Puesto } from '../../shared/models/fisics/Puesto';

import { MatrizService } from '../../shared/services/matriz.service';
import { MatrizActividad } from 'src/app/shared/models/fisics/MatrizActividad';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AgregarPuestoComponent } from './pop-up/agregar-puesto/agregar-puesto.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { AgregarActividadComponent } from './pop-up/agregar-actividad/agregar-actividad.component';
import { Matriz } from 'src/app/shared/models/fisics/Matriz';
import { MatTable } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from 'src/app/shared/models/fisics/Usuario';

@Component({
  selector: 'app-puestos-y-actividades',
  templateUrl: './puestos-y-actividades.component.html',
  styleUrls: ['./puestos-y-actividades.component.scss'],
})
export class PuestosYActividadesComponent implements OnInit {
  @ViewChild(MatTable) tableActividades: MatTable<MatrizActividad>;

  private _matriz = new BehaviorSubject<Matriz>(null);
  @Input()
  set matriz(value){
    this._matriz.next(value);
  }
  get matriz(){
    return this._matriz.getValue();
  }

  private _usuario = new BehaviorSubject<Usuario>(null);
  @Input()
  set usuario(value){
    this._usuario.next(value);
  }
  get usuario(){
    return this._usuario.getValue();
  }

  puestos: Puesto[] = [];
  puestosSelected: Puesto[] = [];
  actividades: MatrizActividad[] = [];
  puertoForm: FormControl;

  puestoNombre: string;
  idArea: number;
  // matrizId: string = "21000002";
  // puestoSelected: Puesto = null;

  actividadesColumnas: string[] = [
    'eliminar',
    'actividad',
    'tipo',
    'maquina',
    'herramientas',
    'equipo',
    'producto',
  ];

  constructor(
    private puestoservice: PuestoService,
    private matrizservice: MatrizService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.puertoForm = this.formBuilder.control('', [Validators.required]);
    this._matriz
      .subscribe(x => {
        if(x !== undefined){
          this.getPuestos();
        }
      })
  }

  getPuestos(): void {
    // if (this.matriz !== undefined){
      this.puestoservice
        .obtenerMatrizPuestoTestByIdMatriz(this.matriz.id)
        // .obtenerMatrizPuestoTestByIdMatriz(this.matrizId)
        .then((puestos) => {
          let puestosAux = puestos ? puestos : [];
          this.puestos = puestosAux.filter( elem => elem.idArea === this.matriz.idArea)
        });
    // }
  }

  // userName: string = 'xternal'
  changePuesto(value: Puesto): void {
    if(this.puertoForm.valid){
      this.puestoNombre = value.puesto;
      // this.idArea = value.idArea;
      this.matrizservice
        .obtenerActividadMatriz(this.matriz.id)
        // .obtenerActividadMatriz(this.matrizId)
        .then((actividades) => {
          actividades = actividades ? actividades : [];
          actividades = actividades.filter(actividad => actividad.idPuesto === value.idPuesto);
          this.actividades = actividades;
      });
    } else {
      this.actividades = [];
    }
  }

  listDeletedPuestos: Puesto[] = []
  public eliminarPuesto() {
    if(this.puertoForm.valid && this.actividades.length === 0){
      this.puestos.forEach((elem, index) => {
        if(elem.idPuesto === this.puertoForm.value.idPuesto){
          this.listDeletedPuestos.push(elem);
          this.puestos.splice(index, 1);
          return 0;
        }
      })
    }
  }

  private deletePuestoFromDB(){
    this.listDeletedPuestos.forEach(async element => {
      if(element.idPuesto !== 0){
        let data = await this.puestoservice.eliminarPuesto(element);
      }      
      // if (data && data > 0) {
      //   return data;
      // }
      // return null;
    });
  }

  openAgregarPuesto(): void {
    const dialogConfig = new MatDialogConfig();
    let novoPuesto = new Puesto();
    novoPuesto.idPuesto = 0;
    novoPuesto.idMatriz = this.matriz.id;
    novoPuesto.idArea = this.matriz.idArea;
    novoPuesto.usuarioModifica = this.usuario.idUsuario;
    novoPuesto.usuarioRegistro = this.usuario.idUsuario;
    novoPuesto.observacion = "";
    dialogConfig.data = {
      nuevoPuesto: novoPuesto
    };
    const dialogRef = this.dialog.open(AgregarPuestoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      // console.log(`Dialog result: ${result.novoPuesto}`);
      // this.puestoSelected = result.novoPuesto;
      this.puestos.push(result.nuevoPuesto);
    });
  }

  openAgregarActividad(): void {
    if (this.puertoForm.valid){
      const dialogConfig = new MatDialogConfig();
      let novaActividad = new MatrizActividad();
      // novaActividad.idMatriz = this.matrizId;
      novaActividad.idMatriz = this.matriz.id;
      novaActividad.idArea = this.matriz.idArea; //this.idArea;
      novaActividad.puesto = this.puestoNombre;
      novaActividad.usuarioModifica = this.usuario.idUsuario;
      novaActividad.usuarioRegistro = this.usuario.idUsuario;
      dialogConfig.data = {
        autoFocus: false,
        nuevaActividad: novaActividad
      };
      // this.data.nuevaActividad = ;
      const dialogRef = this.dialog.open(AgregarActividadComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((result) => {
        // console.log(`Dialog result: ${result.nuevaActividad}`);
        if (result !== null) {
          this.actividades.push(result.nuevaActividad);
          this.tableActividades.renderRows();
        }
      });
    }
  }

  guardarPuestoAndActividad() {
    // this.guardarPuesto().then((dataGuardarPuesto) => {
    //   if (dataGuardarPuesto && dataGuardarPuesto > 0) {
    //     console.log('Puesto creado');
    //     this.guardarActividadMatriz().then((listDataGuardarActividades) => {
    //       if (listDataGuardarActividades.length > 0) {
    //         console.log('Actividades guardadas');
    //       }
    //     });
    //   }
    // });

    this.deletePuestoFromDB()
    this.guardarPuesto();
    this.guardarActividadMatriz()
  }

  public guardarPuesto() {
    // let data = await this.puestoservice.guardarPuesto(this.puestoSelected);
    // let data = await this.puestoservice.guardarPuesto(this.puertoForm.value);
    // if (data && data > 0) {
    //   return data;
    // }
    // return null;
    let resp = null;
    this.puestos.forEach((elem, i) => {
      if(elem.idPuesto === 0){
        resp = this.puestoservice.guardarPuesto(elem);
      }
    })
    return resp;
  }

  public guardarActividadMatriz() {
    let listData = [];
    // for (let i = 0; i < this.actividades.length; i++) {
    this.actividades.forEach(async (elem, i) => {
      let actividad = this.actividades[i];
      let data = await this.matrizservice.guardarActividadMatriz(actividad);
      if (data && data > 0) {
        listData.push(data);
      }
    })
    // }
    return listData;
  }
}
