import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { PeligroService } from '../../shared/services/peligro.service';
import { PeligroMatriz } from 'src/app/shared/models/fisics/PeligroMatriz';

import { RiesgoService } from '../../shared/services/riesgo.service';
// import { RiesgoMatriz } from 'src/app/shared/models/fisics/RiesgoMatriz';

import { MatrizService } from '../../shared/services/matriz.service';
import { MatrizActividad } from '../../shared/models/fisics/MatrizActividad';

import { Puesto } from '../../shared/models/fisics/Puesto';
import { PuestoService } from '../../shared/services/puesto.service';

import { MCERiesgo } from '../../shared/models/fisics/MCERiesgo';
import { MCPRiesgo } from '../../shared/models/fisics/MCPRiesgo';

import { AgregarMceComponent } from './pop-up/agregar-mce/agregar-mce.component';
import { AgregarMcpComponent } from './pop-up/agregar-mcp/agregar-mcp.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { AgregarPeligroComponent } from './pop-up/agregar-peligro/agregar-peligro.component';
import { AgregarRiesgoComponent } from './pop-up/agregar-riesgo/agregar-riesgo.component';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ListaRiesgoMatriz } from 'src/app/shared/models/fisics/ListaRiesgoMatriz';
import { Matriz } from 'src/app/shared/models/fisics/Matriz';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from 'src/app/shared/models/fisics/Usuario';
import { AlertComponent } from '../alert/alert.component';
import { Variables } from 'src/app/shared/variables';

export type Operacion = {
  ejecucion: {(s: PeligroMatriz | ListaRiesgoMatriz | MCERiesgo | MCPRiesgo) : Promise<number> | number};
  parametro: PeligroMatriz | ListaRiesgoMatriz | MCERiesgo | MCPRiesgo;
  nameop: string
};

@Component({
  selector: 'app-peligros-y-riesgos',
  templateUrl: './peligros-y-riesgos.component.html',
  styleUrls: ['./peligros-y-riesgos.component.scss'],
})
export class PeligrosYRiesgosComponent implements OnInit {
  @ViewChild(MatTable) tblMCP: MatTable<MCPRiesgo>;
  @ViewChild(MatTable) tblMCE: MatTable<MCERiesgo>;
  private _matriz = new BehaviorSubject<Matriz>(null);
  peligroSelected: PeligroMatriz;
  riesgoSelected: ListaRiesgoMatriz;
  listaOperaciones: Operacion[] = [];
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

  puestos: Puesto[];
  actividades: MatrizActividad[];
  mces: MCERiesgo[];
  mcps: MCPRiesgo[];
  peligros: PeligroMatriz[];
  dataSourceMCE: MatTableDataSource<MCERiesgo>;
  dataSourceMCP: MatTableDataSource<MCPRiesgo>;
  puestoFormControl: FormControl;
  peligroFormControl: FormControl;
  riesgoFormControl: FormControl;

  puestoSelected: Puesto = null;

  public listPeligrosMatriz: PeligroMatriz[];
  // listRiesgosMatriz: RiesgoMatriz[] = [];
  public listRiesgosMatriz: ListaRiesgoMatriz[];
  private riesgos: ListaRiesgoMatriz[];
  private mceEliminados: MCERiesgo[];
  private mcpEliminados: MCPRiesgo[];
  private listPeligroDeleted: PeligroMatriz[];
  private listRiesgoDeleted: ListaRiesgoMatriz[];

  private _etapa = new BehaviorSubject<number>(null);
  @Input()
  set etapa(value){
    this._etapa.next(value);
  }
  get etapa(){
    return this._etapa.getValue();
  }

  // peligroMatrizSelected: PeligroMatriz = null;
  // riesgoMatrizSelected: RiesgoMatriz = null;

  displayedColumnsActividades = [
    'actividad',
    'tipo',
    'maquina',
    'herramienta',
    'equipo',
    'producto',
  ];
  displayedColumnsMCE = ['eliminar', 'mce', 'tipo', 'responsable'];
  displayedColumnsMCP = ['eliminar', 'mcp', 'tipo', 'responsable'];

  // matrizId: string = "21000002";

  constructor(
    public router: Router,
    private peligroService: PeligroService,
    private matrizservice: MatrizService,
    private puestoservice: PuestoService,
    private riesgoService: RiesgoService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
    this.dataSourceMCE = new MatTableDataSource<MCERiesgo>([]);
    this.dataSourceMCP = new MatTableDataSource<MCPRiesgo>([]);
  }

  ngOnInit(): void {
    this.puestoFormControl = this.formBuilder.control('', [Validators.required]);
    this._matriz
      .subscribe(x => {
        if(x !== undefined){
          this.loadDataInitPeligroRiesgos();
        }
      })
  }

  private loadDataInitPeligroRiesgos(){
    this.puestoFormControl =new FormControl('', Validators.required);
    this.peligroFormControl = new FormControl('', Validators.required);
    this.riesgoFormControl = new FormControl('', Validators.required);
    this.puestos = [];
    // this.riesgos = [];
    this.actividades = [];
    this.mces = [];
    this.mcps = [];
    this.listPeligrosMatriz = [];
    this.listRiesgosMatriz = [];
    this.dataSourceMCE.data = [];
    this.dataSourceMCP.data = [];
    this.mceEliminados = [];
    this.mcpEliminados = [];
    this.listPeligroDeleted = [];
    this.listRiesgoDeleted = [];
    this.getPuestos();
  }

  getPuestos(): void {
    this.puestoservice
      .obtenerMatrizPuestoTestByIdMatriz(this.matriz.id)
      .then((puestos) => {
        let puestosAux = puestos ? puestos : [];
        this.puestos = puestosAux.filter( elem => elem.idArea === this.matriz.idArea)
      });
  }

  changePuesto(value: Puesto): void {
    this.actividades = [];
    this.listPeligrosMatriz = [];
    this.listRiesgosMatriz = [];
    this.dataSourceMCE.data = [];
    this.dataSourceMCP.data = [];
  }

  changePeligro(value: PeligroMatriz): void {
    this.peligroSelected = value;
    if (this.peligroSelected !== undefined){
      console.log(value);
      // this.getRiesgosByPeligroSelected();
      // this.getRiesgos();
      this.riesgoService
        .obtenerMatrizRiesgoByIdMatriz(this.matriz.id, this.peligroSelected.idPeligro)
        .then((riesgosMatriz) => {
          riesgosMatriz = riesgosMatriz ? riesgosMatriz : [];
          riesgosMatriz = riesgosMatriz.filter(element => element.idPeligro === this.peligroSelected.idPeligro);
          // console.log(this.listRiesgosMatriz);
          // console.log(this.listRiesgosMatriz);

          // this.peligroService
          //   .obtenerMatrizPeligroByIdMatriz(this.matriz.id)
          //   .then((peligros) => {
              // this.listPeligrosMatriz = peligros ? peligros : [];
          this.listaOperaciones.forEach((element, index) => {
            if(element.nameop === "ADD" && element.parametro.constructor.name === "ListaRiesgoMatriz" && (<ListaRiesgoMatriz>element.parametro).idPeligro === this.peligroSelected.idPeligro){
              console.log(element);
              (<ListaRiesgoMatriz[]>riesgosMatriz).push(<ListaRiesgoMatriz>element.parametro);
              return 0;
            }
            (<ListaRiesgoMatriz[]>riesgosMatriz).forEach((element1, index1) => {
              if (element.nameop === "DELETE" && element.parametro.constructor.name === "ListaRiesgoMatriz" && (<ListaRiesgoMatriz>element.parametro).idPeligro === this.peligroSelected.idPeligro){
                console.log(element);
                (<ListaRiesgoMatriz[]>riesgosMatriz).splice(index1, 1);
                return 0;
              }
            });
          });
          this.listRiesgosMatriz = riesgosMatriz;
          console.log(this.listRiesgosMatriz);
          this.dataSourceMCE.data = [];
          this.dataSourceMCP.data = [];
            // });

        });
    } else {
      this.listRiesgosMatriz = [];
      this.dataSourceMCE.data = [];
      this.dataSourceMCP.data = [];
    }
  }

  changeRiesgo(value: ListaRiesgoMatriz): void {
    this.riesgoSelected = value;
    if (this.riesgoSelected !== undefined){
      console.log(value)
      this.riesgoService
        .obtenerMCERiesgo(this.matriz.id, this.riesgoSelected.idRiesgo)
        .then((mces) => {
          this.mces = mces ? mces : [];
          // let mceList = this.mces.filter(element => element.idRiesgo === this.riesgoSelected.idRiesgo);
          this.dataSourceMCE.data = <MCERiesgo[]>mces;
        });
      this.riesgoService
        .obtenerMCPRiesgo(this.matriz.id, this.riesgoSelected.idRiesgo)
        .then((mcps) => {
          this.mcps = mcps ? mcps : [];
          // let mcpList = this.mcps.filter(element => element.idRiesgo === this.riesgoSelected.idRiesgo);
          this.dataSourceMCP.data =<MCPRiesgo[]> mcps;
        });
    } else {
      this.dataSourceMCE.data = [];
      this.dataSourceMCP.data = [];
    }
  }

  contPeligroAdded: number = 0;
  openAgregarPeligro(): void {
    if( this.actividades.length === 1 ){
      const dialogRef = this.dialog.open(AgregarPeligroComponent, {
        data: { peligroMatriz: {} },
      });
      dialogRef.afterClosed().subscribe((result) => {
        const newPeligroMatriz = result.peligroMatriz as PeligroMatriz;
        newPeligroMatriz.idMatriz = this.matriz.id;
        newPeligroMatriz.idArea = this.matriz.idArea;
        newPeligroMatriz.idActividad = this.actividades[0].idActividad;
        // newPeligroMatriz.usuarioModifica = this.usuario.idUsuario;
        newPeligroMatriz.usuarioRegistro = this.usuario.idUsuario;
        newPeligroMatriz.idPeligro = --this.contPeligroAdded;
        newPeligroMatriz.observacion = '';

        this.listPeligrosMatriz.push(newPeligroMatriz);
        this.listaOperaciones.push({
          ejecucion: this.guardarPeligroToDB,
          parametro: newPeligroMatriz,
          nameop: "ADD"
        })
        // this.listPeligrosMatriz = this.peligros.filter(element => element.idActividad === this.actividades[0].idActividad)
        this.listRiesgosMatriz = [];
        this.dataSourceMCE.data = [];
        this.tblMCE.renderRows();
        this.dataSourceMCP.data = [];
        this.tblMCP.renderRows();
        // console.log(result);
      });
    }
  }

  eliminarPeligroFromList() {
    if(this.peligroFormControl.valid && this.listRiesgosMatriz.length === 0){
      this.listPeligrosMatriz.forEach((elem, index) => {
        if(elem.idPeligro === this.peligroFormControl.value.idPeligro ){
          // this.listPeligroDeleted.push(elem);
          // this.listPeligrosMatriz.splice(index, 1);
          if(elem.idPeligro > 0){
            this.listaOperaciones.push({
              ejecucion: this.deletePeligroFromDB,
              parametro: elem,
              nameop: "DELETE"
            })
          } else {
            this.listaOperaciones.forEach((elem1, index1) => {
              if(elem1.parametro.constructor.name === elem.constructor.name && (<PeligroMatriz>elem1.parametro).idMatrizPeligro === elem.idMatrizPeligro){
                this.listaOperaciones.splice(index1, 1);
                return 0;
              }
            })
          }
          this.listPeligrosMatriz.splice(index, 1);
          // this.listPeligrosMatriz = this.peligros.filter(element => element.idActividad === this.actividades[0].idActividad)
          this.listRiesgosMatriz = [];
          this.dataSourceMCE.data = [];
          // this.tblMCE.renderRows();
          this.dataSourceMCP.data = [];
          // this.tblMCP.renderRows();
          return 0;
        }
      })
    }
  }

  contRiesgoAdded: number = 0;
  openAgregarRiesgo(): void {
    if( this.peligroSelected !== undefined){
      const dialogRef = this.dialog.open(AgregarRiesgoComponent, {
        data: { riesgoMatriz: {} },
      });
      dialogRef.afterClosed().subscribe((result) => {
        const newRiesgoMatriz = result.riesgoMatriz as ListaRiesgoMatriz;
        newRiesgoMatriz.idMatriz = this.matriz.id;
        newRiesgoMatriz.idArea = this.matriz.idArea;
        newRiesgoMatriz.idPeligro = this.peligroSelected.idPeligro;
        newRiesgoMatriz.usuarioModifica = this.usuario.idUsuario;
        newRiesgoMatriz.usuarioRegistro = this.usuario.idUsuario;
        newRiesgoMatriz.idActividad = this.actividades[0].idActividad;
        newRiesgoMatriz.idRiesgo = --this.contRiesgoAdded;
        newRiesgoMatriz.observacion = '';
        newRiesgoMatriz.idMatrizRiesgo = "0";

        this.listRiesgosMatriz.push(newRiesgoMatriz);
        this.listaOperaciones.push({
          ejecucion: this.guardarRiesgoToDB,
          parametro: newRiesgoMatriz,
          nameop: "ADD"
        })
        // this.listRiesgosMatriz = this.riesgos.filter(element => element.idPeligro === this.peligroSelected.idPeligro)
        this.dataSourceMCE.data = [];
        this.tblMCE.renderRows();
        this.dataSourceMCP.data = [];
        this.tblMCP.renderRows();
        return 0;
      });
    }
  }

  eliminarRiesgoFromList() {
    if(this.riesgoFormControl.valid && this.dataSourceMCP.data.length === 0 && this.dataSourceMCE.data.length === 0){
      this.listRiesgosMatriz.forEach((elem, index) => {
        if(elem.idRiesgo === this.riesgoFormControl.value.idRiesgo ){
          // this.listRiesgoDeleted.push(elem);
          // this.listPeligrosMatriz.splice(index, 1);
          // return 0;
          if(elem.idRiesgo > 0){
            this.listaOperaciones.push({
              ejecucion: this.deleteRiesgoFromDB,
              parametro: elem,
              nameop: "DELETE"
            })
          } else {
            this.listaOperaciones.forEach((elem1, index1) => {
              if(elem1.parametro.constructor.name === elem.constructor.name && (<ListaRiesgoMatriz>elem1.parametro).idRiesgo === elem.idRiesgo){
                this.listaOperaciones.splice(index1, 1);
                return 0;
              }
            })
          }
          this.listRiesgosMatriz.splice(index, 1);
          this.dataSourceMCE.data = [];
          this.dataSourceMCP.data = [];
          return 0;
        }
      })
    }
  }

  contMCEAdded: number = 0;
  openAgregarMCE(): void {
    if( this.riesgoSelected !== undefined ){
      const dialogRef = this.dialog.open(AgregarMceComponent, {
        data: { mceRiesgo: {} },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result !== '') {
          let mceAux = result.mceRiesgo as MCERiesgo;
          mceAux.idMCE = --this.contMCEAdded;
          // mceAux.estado = this.riesgoSelected.estado;
          mceAux.estado = this.matriz.estado;
          mceAux.idMatrizRiesgo = Number(this.riesgoSelected.idMatrizRiesgo);
          mceAux.idArea = this.matriz.idArea;
          mceAux.idRiesgo = this.riesgoSelected.idRiesgo;
          mceAux.usuarioModifica = this.usuario.idUsuario;
          mceAux.usuarioRegistro = this.usuario.idUsuario;
          mceAux.observacion = '';
          this.dataSourceMCE.data.push(mceAux);
          this.dataSourceMCE.filter = "";
          this.listaOperaciones.push({
            ejecucion: this.guardarMCEToDB,
            parametro: mceAux,
            nameop: "ADD"
          })
          return 0;
        }
      });
    }
  }

  public eliminarMCE(mceDeleted: MCERiesgo) {
    let datamce = this.dataSourceMCE.data
    datamce.forEach((elem, index) => {
      if(elem.idMCE === mceDeleted.idMCE){
        if(elem.idMCE > 0){
          this.listaOperaciones.push({
            ejecucion: this.deleteMCEFromDB,
            parametro: elem,
            nameop: "DELETE"
          })
        } else {
          this.listaOperaciones.forEach((elemO, indexO) => {
            if(elemO.parametro.constructor.name === elem.constructor.name && (<MCERiesgo>elemO.parametro).idMCE === elem.idMCE){
              this.listaOperaciones.splice(indexO, 1);
              return 0;
            }
          })
        }
        datamce.splice(index, 1);
        this.dataSourceMCE.data = datamce;
        return 0;
      }
    })
  }

  contMCPAdded: number = 0;
  openAgregarMCP(): void {
    if( this.riesgoSelected !== undefined ){
      const dialogRef = this.dialog.open(AgregarMcpComponent, {
        data: { mceRiesgo: {} },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result !== '') {
          let mcpAux = result.mcpRiesgo as MCPRiesgo;
          mcpAux.idMCP = --this.contMCPAdded;
          // mcpAux.estado = this.riesgoSelected.estado;
          mcpAux.estado = this.matriz.estado;
          mcpAux.idRiesgo = this.riesgoSelected.idRiesgo;
          mcpAux.idMatrizRiesgo = Number(this.riesgoSelected.idMatrizRiesgo);
          mcpAux.idArea = this.matriz.idArea;
          mcpAux.usuarioModifica = this.usuario.idUsuario;
          mcpAux.usuarioRegistro = this.usuario.idUsuario;
          mcpAux.observacion = '';
          this.dataSourceMCP.data.push(mcpAux);
          this.dataSourceMCP.filter = "";
          // this.getMCEByRiesgoSelected();
          // this.dataSourceMCE = new MatTableDataSource<MCERiesgo>(this.mces);
          this.listaOperaciones.push({
            ejecucion: this.guardarMCPToDB,
            parametro: mcpAux,
            nameop: "ADD"
          })
          return 0;
        }
      });
    }
  }

  public eliminarMCP(mcpDeleted: MCPRiesgo) {
    let datamcp = this.dataSourceMCP.data
    datamcp.forEach((elem, index) => {
      if(elem.idMCP === mcpDeleted.idMCP){
        if(elem.idMCP > 0){
          this.listaOperaciones.push({
            ejecucion: this.deleteMCPFromDB,
            parametro: elem,
            nameop: "DELETE"
          })
        } else {
          this.listaOperaciones.forEach((elemO, indexO) => {
            if(elemO.parametro.constructor.name === elem.constructor.name && (<MCPRiesgo>elemO.parametro).idMCP === elem.idMCP){
              this.listaOperaciones.splice(indexO, 1);
              return 0;
            }
          })
        }
        datamcp.splice(index, 1);
        this.dataSourceMCP.data = datamcp;
        // this.mces.splice(index, 1);
        // this.tblMCE.renderRows();
        return 0;
      }
    })
  }

  async guardarPeligrosAndRiesgos() {
    console.log(this.listaOperaciones)
    let data = 0;
    let numElementosGuardados=0
    let index = 0;
    // this.listaOperaciones.forEach((element, index, arr) => {
    for ( const element of this.listaOperaciones ){
      data = await element.ejecucion.bind(this)(element.parametro);
      if(element.parametro.constructor.name === "PeligroMatriz"){
        for(let i=index; i<this.listaOperaciones.length; i++){
          if(this.listaOperaciones[i].parametro.constructor.name === "ListaRiesgoMatriz" && (<PeligroMatriz>element.parametro).idPeligro === (<ListaRiesgoMatriz>this.listaOperaciones[i].parametro).idPeligro ){
            (<ListaRiesgoMatriz>this.listaOperaciones[i].parametro).idPeligro = data;
          }
        }
      }
      if(element.parametro.constructor.name === "ListaRiesgoMatriz"){
        for(let i=index; i<this.listaOperaciones.length; i++){
          if(this.listaOperaciones[i].parametro.constructor.name === "MCERiesgo" && (<ListaRiesgoMatriz>element.parametro).idRiesgo === (<MCERiesgo>this.listaOperaciones[i].parametro).idRiesgo ){
            (<MCERiesgo>this.listaOperaciones[i].parametro).idMatrizRiesgo = data;
            // console.log(data)
          }
          if(this.listaOperaciones[i].parametro.constructor.name === "MCPRiesgo" && (<ListaRiesgoMatriz>element.parametro).idRiesgo === (<MCPRiesgo>this.listaOperaciones[i].parametro).idRiesgo ){
            (<MCPRiesgo>this.listaOperaciones[i].parametro).idMatrizRiesgo = data;
          }
        }
      }
      console.log(data)
      if(data>0){
        numElementosGuardados++
      }
      index++;
    }
    this.listaOperaciones = [];
    if(numElementosGuardados>0){
      this.showMessage("Éxito al guardar los peligros y riesgos")
      this.router.navigate([Variables.path.bandejaSolicitudMaterial]);
    }
  }

  openSeleccionarActividad(): void {
    if(this.puestoFormControl.valid){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        listActividadesSelected: null,
        usuario: this.usuario,
        matriz: this.matriz,
        puesto: this.puestoFormControl.value
      };
      const dialogRef = this.dialog.open(ActividadesComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((result) => {
        if (result !== undefined) {
          this.actividades = [result.listActividadesSelected];
          console.log(this.actividades)
          console.log(this.matriz)
          // this.getPeligros();
          // this.listPeligrosMatriz = this.peligros.filter(element => element.idActividad === this.actividades[0].idActividad)
          // this.getPeligrosByActividadSelected()
          this.peligroService
            .obtenerMatrizPeligroByIdMatriz(this.matriz.id)
            .then((peligros) => {
              // this.listPeligrosMatriz = peligros ? peligros : [];
              peligros = peligros ? peligros : [];
              peligros = peligros.filter(element => element.idActividad === this.actividades[0].idActividad);
              this.listaOperaciones.forEach((element, index) => {
                if(element.nameop === "ADD" && element.parametro.constructor.name === "PeligroMatriz" && (<PeligroMatriz>element.parametro).idActividad === this.actividades[0].idActividad){
                  console.log(element);
                  (<PeligroMatriz[]>peligros).push(<PeligroMatriz>element.parametro);
                  return 0;
                }
                (<PeligroMatriz[]>peligros).forEach((element1, index1) => {
                  if (element.nameop === "DELETE" && element.parametro.constructor.name === "PeligroMatriz" && (<PeligroMatriz>element.parametro).idActividad === this.actividades[0].idActividad){
                    console.log(element);
                    (<PeligroMatriz[]>peligros).splice(index1, 1);
                    return 0;
                  }
                });
              });
              this.listPeligrosMatriz = peligros;
              // console.log(this.listPeligrosMatriz);
            });
          this.listRiesgosMatriz = [];
          this.dataSourceMCE.data = [];
          this.dataSourceMCP.data = [];
        }
      });
    }
  }

  private deletePeligroFromDB(peligro: PeligroMatriz){
    let data = this.peligroService.eliminarPeligro(peligro);
    if (data) {
      return data;
    }
    return Promise.reject(-1);
  };

  public guardarPeligroToDB(peligro: PeligroMatriz){
    // peligro.idPeligro = 0;
    let data = this.peligroService.guardarPeligroMatriz(peligro);
    if (data) {
      return data;
    }
    return Promise.reject(-1);
  }

  private deleteRiesgoFromDB(riesgo: ListaRiesgoMatriz){
    let data = this.riesgoService.eliminarRiesgo(riesgo);
    if (data) {
      return data;
    }
    return Promise.reject(-1);
  };

  public guardarRiesgoToDB(riesgo: ListaRiesgoMatriz){
    // riesgo.idMatrizRiesgo = "0";
    let data = this.riesgoService.guardarRiesgoMatriz(riesgo);
    if (data) {
      return data;
    }
    return Promise.reject(-1);
  }

  private deleteMCEFromDB(mce: MCERiesgo){
    let data = this.riesgoService.eliminarMCERiesgo(mce);
    if (data) {
      return data;
    }
    return Promise.reject(-1);
  };

  public guardarMCEToDB(mce: MCERiesgo){
    // mce.idMCE = 0;
    let data = this.riesgoService.guardarMCERiesgo(mce);
    if (data) {
      return data;
    }
    return Promise.reject(-1);
  }

  private deleteMCPFromDB(mcp: MCPRiesgo){
    let data = this.riesgoService.eliminarMCPRiesgo(mcp);
    if (data) {
      return data;
    }
    return Promise.reject(-1);
  };

  public guardarMCPToDB(mcp: MCPRiesgo){
    // mcp.idMCP = 0;
    let data = this.riesgoService.guardarMCPRiesgo(mcp);
    if (data) {
      return data;
    }
    return Promise.reject(-1);
  }

  async guardarRiesgoMatrizFromDB(riesgoGuardar: ListaRiesgoMatriz) {
    let listaRiesgoMatriz: ListaRiesgoMatriz = new ListaRiesgoMatriz();
    listaRiesgoMatriz.idMatriz = this.matriz.id;
    listaRiesgoMatriz.idMatrizRiesgo = '';
    listaRiesgoMatriz.idArea = riesgoGuardar.idArea;
    listaRiesgoMatriz.idActividad = 0; // Pendiente por revisar
    listaRiesgoMatriz.idPeligro = this.peligroSelected.idPeligro;
    listaRiesgoMatriz.riesgo = riesgoGuardar.riesgo;
    listaRiesgoMatriz.rPG = 0;
    listaRiesgoMatriz.rPDH = 0;
    listaRiesgoMatriz.rPMCE = 0;
    listaRiesgoMatriz.rPPG = 0;
    listaRiesgoMatriz.rPNE = 0;
    listaRiesgoMatriz.rPP = 0;
    listaRiesgoMatriz.rPIdNivelRiesgo = 1;
    listaRiesgoMatriz.rRG = 0;
    listaRiesgoMatriz.rRDH = 0;
    listaRiesgoMatriz.rRMCE = 0;
    listaRiesgoMatriz.rRPG = 0;
    listaRiesgoMatriz.rRNE = 0;
    listaRiesgoMatriz.rRP = 0;
    listaRiesgoMatriz.rRIdNivelRiesgo = 1;
    listaRiesgoMatriz.observacion = '';
    listaRiesgoMatriz.usuarioRegistro = this.usuario.usuarioRegistro;
    listaRiesgoMatriz.fechaRegistro = riesgoGuardar.fechaRegistro;
    listaRiesgoMatriz.usuarioModifica = this.usuario.usuarioModifica;
    listaRiesgoMatriz.fechaModifica = riesgoGuardar.fechaModifica;

    let data = await this.riesgoService.guardarRiesgoMatriz(listaRiesgoMatriz);
    if (data > 0) {
      return data;
    }
    return null;
  }

  async updateMatrizEstado() {
    let data = await this.matrizservice.updateMatrizEstado(
      this.matriz.id,
      'JA'
    );
    if (data && data >= 0) {
      return data;
    }
    return null;
  }

  showMessage(text: string) {
    const alertRef = this.dialog.open(AlertComponent, {
      width: '250px',
      data: { mensaje: text },
    });
  }
}
