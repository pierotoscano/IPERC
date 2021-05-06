import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { PeligroService } from '../../shared/services/peligro.service';
import { PeligroMatriz } from 'src/app/shared/models/fisics/PeligroMatriz';

import { RiesgoService } from '../../shared/services/riesgo.service';
import { RiesgoMatriz } from 'src/app/shared/models/fisics/RiesgoMatriz';

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
import { MatTableDataSource } from '@angular/material/table';
import { ListaRiesgoMatriz } from 'src/app/shared/models/fisics/ListaRiesgoMatriz';
import { Matriz } from 'src/app/shared/models/fisics/Matriz';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from 'src/app/shared/models/fisics/Usuario';

@Component({
  selector: 'app-peligros-y-riesgos',
  templateUrl: './peligros-y-riesgos.component.html',
  styleUrls: ['./peligros-y-riesgos.component.scss'],
})
export class PeligrosYRiesgosComponent implements OnInit {  
  private _matriz = new BehaviorSubject<Matriz>(null);
  peligroSelected: PeligroMatriz;
  riesgoSelected: RiesgoMatriz;
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
    this.dataSourceMCE = new MatTableDataSource<MCERiesgo>();
    this.dataSourceMCP = new MatTableDataSource<MCPRiesgo>();
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
    this.riesgos = [];
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
    this.getMCE();
    this.getMCP();
    this.getPeligros();
    this.getRiesgos();
  }
  
  getPuestos(): void {
    this.puestoservice
      .obtenerMatrizPuestoTestByIdMatriz(this.matriz.id)
      .then((puestos) => {
        let puestosAux = puestos ? puestos : [];
        this.puestos = puestosAux.filter( elem => elem.idArea === this.matriz.idArea)
      });
  }


  getRiesgos(): void {
    this.riesgoService
      .obtenerMatrizRiesgoByIdMatriz(this.matriz.id)
      .then((riesgosMatriz) => {
        this.riesgos = riesgosMatriz ? riesgosMatriz : [];
        // console.log(this.listRiesgosMatriz);
      });
  }

  // getActividades(): void {
  //   this.matrizservice.obtenerActividadMatriz().then((actividades) => {
  //     this.actividades = actividades ? actividades.slice(0, 1) : [];
  //   });
  // }

  getPeligros(): void {
    this.peligroService
      .obtenerMatrizPeligroByIdMatriz(this.matriz.id)
      .then((peligros) => {
        this.peligros = peligros ? peligros : [];
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
      this.getRiesgosByPeligroSelected();
    } else {
      this.listRiesgosMatriz = [];
      this.dataSourceMCE.data = [];
      this.dataSourceMCP.data = [];
    }
  }

  getPeligrosByActividadSelected(): void {
    let listPeligrosMatriz = this.peligros ? this.peligros : [];
    this.listPeligrosMatriz = listPeligrosMatriz.filter(element => element.idActividad === this.actividades[0].idActividad);
    console.log(listPeligrosMatriz);
  }

  getRiesgosByPeligroSelected(): void {
    let listRiesgosMatriz = this.riesgos ? this.riesgos : [];
    this.listRiesgosMatriz = listRiesgosMatriz.filter(element => element.idPeligro === this.peligroSelected.idPeligro);
    console.log(listRiesgosMatriz);
  }

  changeRiesgo(value: RiesgoMatriz): void {
    this.riesgoSelected = value;
    if (this.riesgoSelected !== undefined){
      this.getMCEByRiesgoSelected();
      this.getMCPByRiesgoSelected();
    } else {
    this.dataSourceMCE = new MatTableDataSource<MCERiesgo>([]);
    this.dataSourceMCP = new MatTableDataSource<MCPRiesgo>([]);
    }
  }

  getMCEByRiesgoSelected(): void {
    let mceList = this.mces.filter(element => parseInt(element.idRiesgo) === this.riesgoSelected.idRiesgo);
    this.dataSourceMCE = new MatTableDataSource<MCERiesgo>(mceList);
  }

  getMCPByRiesgoSelected(): void {
    let mcpList = this.mcps.filter(element => parseInt(element.idRiesgo) === this.riesgoSelected.idRiesgo);
    this.dataSourceMCP = new MatTableDataSource<MCPRiesgo>(mcpList);
  }

  getMCE(): void {
    this.riesgoService
      .obtenerMCERiesgo(this.matriz.id)
      .then((mces) => {
        this.mces = mces ? mces : [];
      });
  }

  getMCP(): void {
    this.riesgoService
      .obtenerMCPRiesgo(this.matriz.id)
      .then((mcps) => {
        this.mcps = mcps ? mcps : [];
      });
  }

  // getRiesgos(): void {
  //   this.matrizservice.obtenerPeligroMatriz().then((peligros) => {
  //     this.peligros = peligros ? peligros : [];
  //   });
  // }

  openAgregarMCE(): void {
    if( this.riesgoSelected !== undefined ){
      const dialogRef = this.dialog.open(AgregarMceComponent, {
        data: { mceRiesgo: {} },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result !== '') {
          let mceAux = result.mceRiesgo as MCERiesgo;
          mceAux.idMCE = 0;
          mceAux.estado = this.riesgoSelected.estado;
          mceAux.idRiesgo = `${this.riesgoSelected.idRiesgo}`;
          
          mceAux.idArea = this.matriz.idArea;
          mceAux.usuarioModifica = this.usuario.idUsuario;
          mceAux.usuarioRegistro = this.usuario.idUsuario;
          mceAux.observacion = '';
          this.mces.push(mceAux);
          this.getMCEByRiesgoSelected();
          // this.dataSourceMCE = new MatTableDataSource<MCERiesgo>(this.mces);
        }
      });
    }
  }

  openAgregarMCP(): void {
    if( this.riesgoSelected !== undefined ){
      const dialogRef = this.dialog.open(AgregarMcpComponent, {
        data: { mcpRiesgo: {} },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result !== '') {
          let mcpAux = result.mcpRiesgo as MCPRiesgo;
          mcpAux.idMCP = 0;
          mcpAux.estado = this.riesgoSelected.estado;
          mcpAux.idRiesgo = `${this.riesgoSelected.idRiesgo}`;
          
          mcpAux.idArea = this.matriz.idArea;
          mcpAux.usuarioModifica = this.usuario.idUsuario;
          mcpAux.usuarioRegistro = this.usuario.idUsuario;
          mcpAux.observacion = '';
          this.mcps.push(mcpAux);
          this.getMCPByRiesgoSelected();
          // this.dataSourceMCP = new MatTableDataSource<MCPRiesgo>(this.mcps);
        }
      });
    }
  }

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
        newPeligroMatriz.observacion = '';

        this.peligros.push(newPeligroMatriz);
        this.listPeligrosMatriz = this.peligros.filter(element => element.idActividad === this.actividades[0].idActividad)
        this.listRiesgosMatriz = [];
        this.dataSourceMCE.data = [];
        this.dataSourceMCP.data = [];
        // console.log(result);
      });
    }
  }
  
  eliminarPeligroFromList() {
    if(this.peligroFormControl.valid && this.listRiesgosMatriz.length === 0){
      this.listPeligrosMatriz.forEach((elem, index) => {
        if(elem.idPeligro === this.puestoFormControl.value.idPeligro ){
          this.listPeligroDeleted.push(elem);
          this.listPeligrosMatriz.splice(index, 1);
          return 0;
        }
      })
    }
  }

  // async eliminarPeligroFromBack() {
  //   if(this.peligroFormControl.valid && this.listRiesgosMatriz.length > 0){
  //     let data = await this.puestoservice.eliminarPuesto(this.puestoFormControl.value);
  //     if (data && data > 0) {
  //       return data;
  //     }
  //     return null;
  //   }
  // }

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
        newRiesgoMatriz.observacion = '';

        this.riesgos.push(newRiesgoMatriz);
        this.listRiesgosMatriz = this.riesgos.filter(element => element.idPeligro === this.peligroSelected.idPeligro)
        this.dataSourceMCE.data = [];
        this.dataSourceMCP.data = [];
        console.log(result);
      });
    }
  }

  eliminarRiesgoFromList() {
    if(this.riesgoFormControl.valid && this.dataSourceMCP.data.length === 0 && this.dataSourceMCE.data.length === 0){
      this.listRiesgosMatriz.forEach((elem, index) => {
        if(elem.idRiesgo === this.riesgoFormControl.value.idRiesgo ){
          this.listRiesgoDeleted.push(elem);
          this.listPeligrosMatriz.splice(index, 1);
          return 0;
        }
      })
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
          // this.getPeligros();
          this.listPeligrosMatriz = this.peligros.filter(element => element.idActividad === this.actividades[0].idActividad)
          this.listRiesgosMatriz = [];
          this.dataSourceMCE.data = [];
          this.dataSourceMCP.data = [];
            // .then(() => this.getRiesgos())
            // .then(() => {
            //   this.getMCE();
            //   this.getMCP();
            // })
        }
      });
    }
  }


  guardarPeligrosAndRiesgos() {
    if(this.mces.length > 0 &&
      this.mcps.length > 0){
        this.guardarListMCERiesgos();
        this.guardarListMCPRiesgos();
    }

    if(this.mceEliminados.length > 0 &&
      this.mcpEliminados.length > 0){
        this.eliminarListMCERiesgos();
        this.eliminarListMCPRiesgos();
    }

    if(this.riesgos.length > 0){
      this.guardarRiesgos();
    }

    if(this.listRiesgoDeleted.length > 0){
      // this.eliminarRiesgo();
    }

    
    if(this.peligros.length > 0){
      this.guardarPeligroMatriz();
    }

    if(this.listPeligroDeleted.length > 0){
      // this.eliminarPeligro();
    }
    this.loadDataInitPeligroRiesgos();
    this.router.navigate(['/material-bandeja-solicitud']);

    // if (
    //   this.puestoSelected &&
    //   this.peligroMatrizSelected &&
    //   this.riesgoMatrizSelected &&
    //   this.actividades.length > 0 &&
    //   this.mces.length > 0 &&
    //   this.mcps.length > 0
    // ) {
    //   this.guardarPeligroMatriz().then((dataGuardarPeligroMatriz) => {
    //     if (dataGuardarPeligroMatriz && dataGuardarPeligroMatriz > 0) {
    //       this.guardarRiesgoMatriz().then((dataGuardarRiesgoMatriz) => {
    //         if (dataGuardarRiesgoMatriz && dataGuardarRiesgoMatriz > 0) {
    //           this.guardarListMCERiesgos().then((dataGuardarListMCERiesgos) => {
    //             if (dataGuardarListMCERiesgos.length > 0) {
    //               this.guardarListMCPRiesgos().then(
    //                 (dataGuardarListMCPRiesgos) => {
    //                   if (dataGuardarListMCPRiesgos.length > 0) {
    //                     console.log('Éxito al guardar los datos');
    //                   }
    //                 }
    //               );
    //             }
    //           });
    //         }
    //       });
    //     }
    //   });
    // }
  }

  private guardarRiesgos(){
    this.riesgos.forEach((elem, i) => {
      if(elem.idRiesgo === 0){
        this.guardarRiesgoMatrizFromDB(elem);
      }
    })
  }

  private eliminarRiesgo() {
    // if(this.peligroFormControl.valid && this.listRiesgosMatriz.length > 0){
      this.listRiesgoDeleted.forEach(async element => {
        if(element.idRiesgo !== 0){
          this.eliminarRiesgoFromDB(element);
          // let data = await this.puestoservice.eliminarPuesto(element);
        }      
        // if (data && data > 0) {
        //   return data;
        // }
        // return null;
      });
    // }
  }

  private async eliminarRiesgoFromDB(riesgo: ListaRiesgoMatriz){
    let data = await this.riesgoService.eliminarRiesgo(
      riesgo
    );
    if (data > 0) {
      return data;
    }
    return null;
  }

  private guardarPeligroMatriz(){
    this.peligros.forEach(async element => {
      if(element.idPeligro === 0){
        this.guardarPeligroMatrizFromDB(element);
      }
    })
  }

  private async guardarPeligroMatrizFromDB(peligro: PeligroMatriz) {
    let data = await this.peligroService.guardarPeligroMatriz(
      peligro
    );
    if (data > 0) {
      return data;
    }
    return null;
  }

  private eliminarPeligro() {
    this.listPeligroDeleted.forEach(async element => {
      if(element.idPeligro !== 0){
        this.eliminarPeligroFromDB(element);
        // let data = await this.puestoservice.eliminarPuesto(element);
      }      
      // if (data && data > 0) {
      //   return data;
      // }
      // return null;
    });
  }
  private async eliminarPeligroFromDB(peligro: PeligroMatriz){
    let data = await this.peligroService.eliminarPeligro(
      peligro
    );
    if (data > 0) {
      return data;
    }
    return null;
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

    // let listaRiesgoMatriz: ListaRiesgoMatriz = new ListaRiesgoMatriz();
    // listaRiesgoMatriz.idMatriz = this.matriz.id;
    // listaRiesgoMatriz.idMatrizRiesgo = '';
    // listaRiesgoMatriz.idArea = this.riesgoMatrizSelected.idArea;
    // listaRiesgoMatriz.idActividad = 0; // Pendiente por revisar
    // listaRiesgoMatriz.idPeligro = this.peligroMatrizSelected.idPeligro;
    // listaRiesgoMatriz.riesgo = this.riesgoMatrizSelected.riesgo;
    // listaRiesgoMatriz.rPG = 0;
    // listaRiesgoMatriz.rPDH = 0;
    // listaRiesgoMatriz.rPMCE = 0;
    // listaRiesgoMatriz.rPPG = 0;
    // listaRiesgoMatriz.rPNE = 0;
    // listaRiesgoMatriz.rPP = 0;
    // listaRiesgoMatriz.rPIdNivelRiesgo = 1;
    // listaRiesgoMatriz.rRG = 0;
    // listaRiesgoMatriz.rRDH = 0;
    // listaRiesgoMatriz.rRMCE = 0;
    // listaRiesgoMatriz.rRPG = 0;
    // listaRiesgoMatriz.rRNE = 0;
    // listaRiesgoMatriz.rRP = 0;
    // listaRiesgoMatriz.rRIdNivelRiesgo = 1;
    // listaRiesgoMatriz.observacion = null;
    // listaRiesgoMatriz.usuarioRegistro = this.matriz.usuarioRegistro;
    // listaRiesgoMatriz.fechaRegistro = this.matriz.fechaRegistro;
    // listaRiesgoMatriz.usuarioModifica = this.matriz.usuarioModifica;
    // listaRiesgoMatriz.fechaModifica = this.matriz.fechaModifica;

    // let data = await this.riesgoService.guardarRiesgoMatriz(listaRiesgoMatriz);
    // if (data > 0) {
    //   return data;
    // }
    // return null;
  }

  async guardarListMCERiesgos() {
    let listDataGuardarMCERiesgo = [];
    for (let i = 0; i < this.mces.length; i++) {
      const mce = this.mces[i];
      if(mce.idMCE === 0){
        let dataGuardarMCERiesgo = await this.riesgoService.guardarMCERiesgo(mce);
        if (dataGuardarMCERiesgo && dataGuardarMCERiesgo > 0) {
          listDataGuardarMCERiesgo.push(dataGuardarMCERiesgo);
        }
      }
    }
    return listDataGuardarMCERiesgo;
  }

  async guardarListMCPRiesgos() {
    let listDataGuardarMCPRiesgo = [];
    for (let i = 0; i < this.mcps.length; i++) {
      const mcp = this.mcps[i];
      if(mcp.idMCP === 0){
        let dataGuardarMCPRiesgo = await this.riesgoService.guardarMCPRiesgo(mcp);
        if (dataGuardarMCPRiesgo && dataGuardarMCPRiesgo > 0) {
          listDataGuardarMCPRiesgo.push(dataGuardarMCPRiesgo);
        }
      }
    }
    return listDataGuardarMCPRiesgo;
  }

  async eliminarListMCERiesgos() {
    let listDataGuardarMCERiesgo = [];
    for (let i = 0; i < this.mceEliminados.length; i++) {
      const mce = this.mces[i];
      let dataGuardarMCERiesgo = await this.riesgoService.eliminarMCERiesgo(mce);
      // if (dataGuardarMCERiesgo && dataGuardarMCERiesgo > 0) {
      //   listDataGuardarMCERiesgo.push(dataGuardarMCERiesgo);
      // }
    }
    return listDataGuardarMCERiesgo;
  }

  async eliminarListMCPRiesgos() {
    let listDataGuardarMCPRiesgo = [];
    for (let i = 0; i < this.mcpEliminados.length; i++) {
      const mcp = this.mcps[i];
      let eliminadosMCPRiesgo = await this.riesgoService.eliminarMCPRiesgo(mcp);
      // if (eliminadosMCPRiesgo && eliminadosMCPRiesgo > 0) {
      //   listDataGuardarMCPRiesgo.push(eliminadosMCPRiesgo);
      // }
    }
    return listDataGuardarMCPRiesgo;
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
}
