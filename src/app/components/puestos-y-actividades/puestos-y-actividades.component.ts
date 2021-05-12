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
import { ActividadesComponent } from '../peligros-y-riesgos/actividades/actividades.component';
import { AlertComponent } from '../alert/alert.component';

export type Operacion = {
  ejecucion: {(s: Puesto | MatrizActividad) : Promise<number>};
  parametro:MatrizActividad | Puesto;
  nameop: string
};

@Component({
  selector: 'app-puestos-y-actividades',
  templateUrl: './puestos-y-actividades.component.html',
  styleUrls: ['./puestos-y-actividades.component.scss'],
})
export class PuestosYActividadesComponent implements OnInit {
  @ViewChild(MatTable) tableActividades: MatTable<MatrizActividad>;

  etapasHabilitadas:number[] = [3,4,5]

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

  private _etapa = new BehaviorSubject<number>(null);
  @Input()
  set etapa(value){
    this._etapa.next(value);
  }
  get etapa(){
    return this._etapa.getValue();
  }

  puestos: Puesto[] = [];
  puestosSelected: Puesto[] = [];
  actividades: MatrizActividad[] = [];
  puertoForm: FormControl;

  puestoNombre: string;
  idArea: number;
  // matrizId: string = "21000023";
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
    this.puestoservice
      .obtenerMatrizPuestoTestByIdMatriz(this.matriz.id)
      // .obtenerMatrizPuestoTestByIdMatriz(this.matrizId)
      .then((puestos) => {
        let puestosAux = puestos ? puestos : [];
        this.puestos = puestosAux.filter( elem => elem.idArea === this.matriz.idArea)
      });
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
          this.listaOperaciones.forEach((element, index) => {
            if(element.nameop === "ADD" && element.parametro.constructor.name === "MatrizActividad" && element.parametro.idPuesto === value.idPuesto){
              console.log(element);
              (<MatrizActividad[]>actividades).push(<MatrizActividad>element.parametro);
              return 0;
            }
            (<MatrizActividad[]>actividades).forEach((element1, index1) => {
              if (element.nameop === "DELETE" && element.parametro.constructor.name === "MatrizActividad" && element.parametro.idPuesto === element1.idPuesto){
                console.log(element);
                (<MatrizActividad[]>actividades).splice(index1, 1);
                return 0;
              }
            });
          });
          this.actividades = actividades;
      });
    } else {
      this.actividades = [];
    }
  }

  listaOperaciones: Operacion[] = [];

  public eliminarPuesto() {
    if(this.puertoForm.valid && this.actividades.length === 0){
      this.puestos.forEach((elem, index) => {
        if(elem.idPuesto === this.puertoForm.value.idPuesto){
          //this.listDeletedPuestos.push(elem);
          if(elem.idPuesto > 0){
            this.listaOperaciones.push({
              ejecucion: this.deletePuestoFromDB,
              parametro: elem,
              nameop: "DELETE"
            })
          } else {
            this.listaOperaciones.forEach((elemO, indexO) => {
              if(elemO.parametro.constructor.name === elem.constructor.name && elemO.parametro.idPuesto === elem.idPuesto){
                this.listaOperaciones.splice(indexO, 1);
                return 0;
              }
            })
          }
          this.puestos.splice(index, 1);
          return 0;
        }
      })
    }
  }

  contPuestoAdded: number = 0;
  openAgregarPuesto(): void {
    const dialogConfig = new MatDialogConfig();
    let novoPuesto = new Puesto();
    novoPuesto.idPuesto = --this.contPuestoAdded;
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
      this.listaOperaciones.push({
        ejecucion: this.guardarPuestoToDB,
        parametro: result.nuevoPuesto,
        nameop: "ADD"
      })
    });
  }

  private async deletePuestoFromDB(puesto: Puesto){
    let data = await this.puestoservice.eliminarPuesto(puesto);
    if (data && data > 0) {
      return data;
    }
    return -1;
  };

  public async guardarPuestoToDB(puesto: Puesto){
    // let data = await this.puestoservice.guardarPuesto(this.puestoSelected);
    puesto.idPuesto = 0;
    let data = await this.puestoservice.guardarPuesto(puesto);
    if (data && data > 0) {
      return data;
    }
    return null;
  }

  contActividadAdded: number = 0;
  openAgregarActividad(): void {
    if (this.puertoForm.valid){
      const dialogConfig = new MatDialogConfig();
      let novaActividad = new MatrizActividad();
      novaActividad.idMatriz = this.matriz.id;
      novaActividad.idArea = this.matriz.idArea; //this.idArea;
      novaActividad.puesto = this.puestoNombre;
      novaActividad.idPuesto = this.puertoForm.value.idPuesto;
      novaActividad.usuarioModifica = this.usuario.idUsuario;
      novaActividad.usuarioRegistro = this.usuario.idUsuario;
      novaActividad.idActividad = --this.contActividadAdded;
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
          this.listaOperaciones.push({
            ejecucion: this.guardarActividadToDB,
            parametro: result.nuevaActividad,
            nameop: "ADD"
          })
          this.tableActividades.renderRows();
        }
      });
    }
  }

  // actividadesDeleted: MatrizActividad[];
  public eliminarActividad(actividadDeleted: MatrizActividad) {
    // this.actividadesDeleted.push(this.actividades[i]);
    // this.actividades.splice(i, 1);
    this.actividades.forEach((elem, index) => {
      if(elem.idActividad === actividadDeleted.idActividad){
        if(elem.idActividad > 0){
          this.listaOperaciones.push({
            ejecucion: this.deleteActividadFromDB,
            parametro: elem,
            nameop: "DELETE"
          })
        } else {
          this.listaOperaciones.forEach((elemO, indexO) => {
            if(elemO.parametro.constructor.name === elem.constructor.name && (<MatrizActividad>elemO.parametro).idActividad === elem.idActividad){
              this.listaOperaciones.splice(indexO, 1);
              return 0;
            }
          })
        }
        this.actividades.splice(index, 1);
        this.tableActividades.renderRows();
        return 0;
      }
    })
  }

  private async deleteActividadFromDB(actividad: MatrizActividad){
    let data = await this.matrizservice.eliminarActividadMatriz(actividad);
    if (data && data > 0) {
      return data;
    }
    return -1;
  };

  public async guardarActividadToDB(actividad: MatrizActividad){
    actividad.idActividad = 0;
    let data = await this.matrizservice.guardarActividadMatriz(actividad);
    if (data && data > 0) {
      return data;
    }
    return -1;
  }

  guardarPuestoAndActividad() {
    console.log(this.listaOperaciones)
    let data = 0;
    this.listaOperaciones.forEach(async (element, index, arr) => {
      data = await element.ejecucion.bind(this)(element.parametro);
      if(element.parametro.constructor.name === "Puesto"){
        for(let i=index; i<arr.length; i++){
          if(arr[i].parametro.constructor.name === "MatrizActividad" && element.parametro.idPuesto === arr[i].parametro.idPuesto ){
            arr[i].parametro.idPuesto = data;
          }
        }
      }
      // console.log(data)
    })
    this.listaOperaciones = [];
    this.showMessage("Éxito al guardar puestos y actividades");
  }

  showMessage(text: string) {
    const alertRef = this.dialog.open(AlertComponent, {
      width: '250px',
      data: { mensaje: text },
    });
  }
}
