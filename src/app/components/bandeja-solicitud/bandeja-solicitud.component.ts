import {
  Component,
  OnInit,
  ViewChild,
  ApplicationRef,
  NgZone,
  NgModule,
} from '@angular/core';
import { Deferred } from 'ts-deferred';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormularioAT } from 'src/app/shared/pages/formularioAT';
// import { IStatistics } from 'src/app/shared/models/fisics/IStatistics';
import { MasterService } from 'src/app/shared/services/master.service';
import { MasterLogic } from 'src/app/shared/models/logics/MasterLogic';
import { MatPaginator } from '@angular/material/paginator';
import { MaestroMaterial } from 'src/app/shared/models/fisics/MaestroMaterial';
import { MaestroMaterialFilter } from 'src/app/shared/models/fisics/MaestroMaterialFilter';

import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
//import * as $ from 'jquery';
import { PagedItemCollection } from '@pnp/sp/items';
import { Lookup } from 'src/app/shared/models/fisics/base/Lookup';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatSidenav } from '@angular/material/sidenav';

import { SpinnerVisibilityService } from 'ng-http-loader';

import { Variables } from '../../../../src/app/shared/variables';

import { ExcelService } from '../../shared/services/excel.service';
import { MatrizService } from '../../shared/services/matriz.service';

import { SolicitudMatriz } from 'src/app/shared/models/fisics/SolicitudMatriz';
import { AreaService } from '../../shared/services/area.service';
import { Area } from 'src/app/shared/models/fisics/Area';
import { TipoMotivo } from 'src/app/shared/models/fisics/TipoMotivo';
import { MotivoService } from 'src/app/shared/services/motivo.service';
import { SolicitudMatrizService } from 'src/app/shared/services/solicitudmatriz.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/shared/models/fisics/Usuario';
import { LoginService } from 'src/app/shared/services/login.service';

declare var $: any;


@Component({
  selector: 'app-bandeja-solicitud',
  templateUrl: './bandeja-solicitud.component.html',
  styleUrls: ['./bandeja-solicitud.component.scss'],
})
export class BandejaSolicitudComponent extends FormularioAT implements OnInit {
  @ViewChild(MatTable) tableSolicitudesMatriz: MatTable<SolicitudMatriz>;
  esMiembroId: boolean;
  currentUserName: string = '';
  // statistics: IStatistics;

  datosMaestros: MasterLogic = new MasterLogic();
  tableQuery: any = {
    order: '',
    direction: '',
    pagesize: 5,
    limit: this.obtenerParametro('limit') || 5,
    page: this.obtenerParametro('page') || 1,
    filter: this.obtenerParametro('filter') || new MaestroMaterialFilter(),
  };
  isOpenMenu: boolean = false;
  promise: Promise<void>;
  projects: MaestroMaterial[] = [];
  materiales_paged: PagedItemCollection<any[]>;
  // materiales_paged_history: IDictionary = {};
  materiales_paged_history: PagedItemCollection<any[]>[];
  page_last: number = -1;
  itemCount: number;

  dataSourceProjects: MaestroMaterial[] = [];
  // dataSourceSolicitudesMatriz: SolicitudMatriz[] = [];

  dataSourceSolicitudesMatriz: MatTableDataSource<SolicitudMatriz> = new MatTableDataSource<SolicitudMatriz>([]);
  displayedColumnsProjects: string[] = [
    'Solicitud',
    'Matriz',
    'Area',
    'Solicitante',
    'Supervisor',
    'TipoMotivo',
    'Motivo',
    'Estado',
    'Visita'
  ];

  resultsLength = 15;
  isLoadingResults = true;
  isRateLimitReached = false;
  isFilterApplied = false;
  formBuscarSolicitudes: FormGroup;
  estadoSolicitudMatriz: number;
  _etapa: string;

  // userAdministrator = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('sidenavfiltros', { static: true }) public myNav: MatSidenav;
  usuarioLogged: Usuario;


  constructor(
    public applicationRef: ApplicationRef,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    public router: Router,
    public masterService: MasterService,
    public zone: NgZone,
    public _spinner: SpinnerVisibilityService,
    public matrizService: MatrizService,
    private areaservice: AreaService,
    private tipomotivoservice: MotivoService,
    public excelService: ExcelService,
    public solicitudMatrizService: SolicitudMatrizService,
    public formBuilder: FormBuilder
  ) {
    super(
      'Consulta de Solicitudes',
      applicationRef,
      dialog,
      route,
      router,
      masterService,
      zone,
      _spinner
    );

    // this.loggedUser = this.loginService.getUserLogged();
    this.esMiembroId = false;
    this.estadoSolicitudMatriz = parseInt(route.snapshot.params['etapa']);
    // this.loggedUser = this.loginService.getUserLogged();
    // console.log(this.estadoSolicitudMatriz)
  }

  getUserLogged() {
    let usuarioFromSession = JSON.parse(
      sessionStorage.getItem('usuarioLogged')
    );
    this.usuarioLogged = new Usuario();
    this.usuarioLogged.apellidoMaterno = usuarioFromSession._apellidoMaterno;
    this.usuarioLogged.apellidoMaterno = usuarioFromSession._apellidoMaterno;
    this.usuarioLogged.apellidoPaterno = usuarioFromSession._apellidoPaterno;
    this.usuarioLogged.email = usuarioFromSession._email;
    this.usuarioLogged.estado = usuarioFromSession._estado;
    this.usuarioLogged.fechaModifica = usuarioFromSession._fechaModifica;
    this.usuarioLogged.fechaRegistro = usuarioFromSession._fechaRegistro;
    this.usuarioLogged.idLogin = usuarioFromSession._idLogin;
    this.usuarioLogged.idUbicacion = usuarioFromSession._idUbicacion;
    this.usuarioLogged.idUsuario = usuarioFromSession._idUsuario;
    this.usuarioLogged.key = usuarioFromSession._key;
    this.usuarioLogged.nombres = usuarioFromSession._nombres;
    this.usuarioLogged.rol = usuarioFromSession._rol;
    this.usuarioLogged.selected = usuarioFromSession._selected;
    this.usuarioLogged.tipo = usuarioFromSession._tipo;
    this.usuarioLogged.usuario = usuarioFromSession._usuario;
    this.usuarioLogged.usuarioModifica = usuarioFromSession._usuarioModifica;
    this.usuarioLogged.usuarioRegistro = usuarioFromSession._usuarioRegistro;
  }

  buscarSolicitudes() {
    const fechaInicio: Date = this.formBuscarSolicitudes.value.fechaInicio;
    const fechaFin: Date = this.formBuscarSolicitudes.value.fechaFin;
    const idSolicitudMatriz = this.formBuscarSolicitudes.value.idSolicitud
      ? this.formBuscarSolicitudes.value.idSolicitud
      : undefined;
    const idMatriz = this.formBuscarSolicitudes.value.idMatriz
      ? this.formBuscarSolicitudes.value.idMatriz
      : undefined;
    const area = this.formBuscarSolicitudes.value.idArea
      ? this.formBuscarSolicitudes.value.idArea
      : undefined;
    const idTipoMotivo = this.formBuscarSolicitudes.value.idTipoMotivo
      ? this.formBuscarSolicitudes.value.idTipoMotivo
      : undefined;
    const solicitante = this.formBuscarSolicitudes.value.idSolicitante
      ? this.formBuscarSolicitudes.value.idSolicitante
      : undefined;
    const estado = this.formBuscarSolicitudes.value.idEstado
        ? this.formBuscarSolicitudes.value.idEstado
        : undefined;
    const supervisor = this.formBuscarSolicitudes.value.supervisor
      ? this.formBuscarSolicitudes.value.supervisor
      : undefined;
    const estadoSolicitud = estado;
    const estadoMatriz = this.formBuscarSolicitudes.value.estadoMatriz;
    const page = 0;
    const rows = 0;

    this.solicitudMatrizService
      .obtenerSolicitudMatrizByListEstadosMatriz(
        true,
        fechaInicio,
        fechaFin,
        idSolicitudMatriz,
        idMatriz,
        area,
        idTipoMotivo,
        solicitante,
        supervisor,
        estadoSolicitud,
        estadoMatriz,
        page,
        rows
      )
      .then((listSolicitudesMatriz) => {
        this.dataSourceSolicitudesMatriz.data = listSolicitudesMatriz
          ? listSolicitudesMatriz
          : [];
        this.tableSolicitudesMatriz.renderRows();
      })
      .finally(() => this._spinner.hide());
  }

  ngOnInit() {
    this.getUserLogged();
    // this.usuarioLogged
    // this.estadoSolicitudMatriz
    this.formBuscarSolicitudes = this.formBuilder.group({
      idSolicitud: new FormControl(null),
      idMatriz: new FormControl(null),
      idArea: new FormControl(null),
      idTipoMotivo: new FormControl(null),
      idSolicitante: new FormControl(null),
      idEstado: new FormControl(null),
      supervisor: new FormControl(null),
      estadoMatriz: new FormControl(null),
      fechaInicio: new FormControl(new Date(new Date().getFullYear(), 0, 1), [Validators.required]),
      fechaFin: new FormControl(new Date(), [Validators.required]),
    });

    //Obtener datos de las solicitudes
    this.getTipoMotivos();
    this.getAreas();
    this.getSolicitudesMatriz();
    // console.log("material-bandeja-solicitud")

  }

  tipomotivos: TipoMotivo[];
  areas: Area[] = [];
  getAreas(): void {
    this.areaservice.obtenerArea().then((areas) => {
      this.areas = areas ? areas : [];
    });
  }

  getTipoMotivos(): void {
    this.tipomotivoservice.obtenerTipoMotivo().then((tipomotivos) => {
      this.tipomotivos = tipomotivos ? tipomotivos : [];
    });
  }

  getSolicitudesMatriz(): void {
    if(isNaN(this.estadoSolicitudMatriz)){
      this.solicitudMatrizService
      .obtenerSolicitudMatriz(
        true,
        new Date(new Date().getFullYear(), 0, 1),
        new Date(),
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      )
      .then((listSolicitudesMatriz) => {
        this.dataSourceSolicitudesMatriz.data = listSolicitudesMatriz
          ? listSolicitudesMatriz
          : [];
      })
      .finally(() => this._spinner.hide());
    } else {
      let estadoSolicitud = undefined;
      let estadoMatriz = undefined;
      let idSolicitante = undefined;
      let idSupervisor = undefined;

      switch(this.estadoSolicitudMatriz){
        case 0:
          this.formBuscarSolicitudes.controls["idEstado"].setValue("SN");
          estadoSolicitud = "SN"
          this.formBuscarSolicitudes.controls["idSolicitante"].setValue(this.usuarioLogged.usuario);
          idSolicitante = this.usuarioLogged.usuario;
        break;
        case 1:
          this.formBuscarSolicitudes.controls["idEstado"].setValue("SF");
          estadoSolicitud = "SF";
          this.formBuscarSolicitudes.controls["idSolicitante"].setValue(this.usuarioLogged.usuario);
          idSolicitante = this.usuarioLogged.usuario;
        break;
        case 2:
          this.formBuscarSolicitudes.controls["estadoMatriz"].setValue(["MC", "JS", "MO", "GA", "MP"]);
          estadoMatriz = "MC,JS,MO,GA,MP";
          this.formBuscarSolicitudes.controls["idSolicitante"].setValue(this.usuarioLogged.usuario);
          idSolicitante = this.usuarioLogged.usuario;
        break;
        case 3:
          this.formBuscarSolicitudes.controls["estadoMatriz"].setValue(["MA"]);
          estadoMatriz = "SF";
          this.formBuscarSolicitudes.controls["idSolicitante"].setValue(this.usuarioLogged.usuario);
          idSolicitante = this.usuarioLogged.usuario;
        break;
        case 4:
          this.formBuscarSolicitudes.controls["estadoMatriz"].setValue(["MC"]);
          estadoMatriz = "MC";
          this.formBuscarSolicitudes.controls["supervisor"].setValue(this.usuarioLogged.usuario);
          idSupervisor = this.usuarioLogged.usuario;
        break;
        case 5:
          this.formBuscarSolicitudes.controls["estadoMatriz"].setValue(["MC"]);
          estadoMatriz = "MC";
          this.formBuscarSolicitudes.controls["supervisor"].setValue(this.usuarioLogged.usuario);
          idSupervisor = this.usuarioLogged.usuario;
        break;
        case 6:
          this.formBuscarSolicitudes.controls["estadoMatriz"].setValue(["JS", "MO", "GA", "MA"]);
          estadoMatriz = "JS,MO,GA,MA";
          this.formBuscarSolicitudes.controls["supervisor"].setValue(this.usuarioLogged.usuario);
          idSupervisor = this.usuarioLogged.usuario;
        break;
        case 7:
          this.formBuscarSolicitudes.controls["estadoMatriz"].setValue(["MP"]);
          estadoMatriz = "MP";
          this.formBuscarSolicitudes.controls["supervisor"].setValue(this.usuarioLogged.usuario);
          idSupervisor = this.usuarioLogged.usuario;
        break;
        case 8:
          this.formBuscarSolicitudes.controls["idEstado"].setValue("SN");
          estadoSolicitud = "SN";
        break;
        case 9:
          this.formBuscarSolicitudes.controls["estadoMatriz"].setValue(["MC", "JS"]);
          estadoMatriz  = "MC,JS";
        break;
        case 10:
          this.formBuscarSolicitudes.controls["estadoMatriz"].setValue(["MO", "GA"]);
          estadoMatriz = "MO,GA";
        break;
        case 11:
          this.formBuscarSolicitudes.controls["estadoMatriz"].setValue(["MP"]);
          estadoMatriz = "MP";
        break;
        case 12:
          this.formBuscarSolicitudes.controls["estadoMatriz"].setValue(["MA"]);
          estadoMatriz = "MA";
        break;
      }
      // let estadoSolicitud = this.estadoSolicitudMatriz.slice(0,1) === "S" ? this.estadoSolicitudMatriz : "SA";
      // let estadoMatriz = this.estadoSolicitudMatriz.slice(0,1) === "S" ? undefined : this.estadoSolicitudMatriz;
      this.solicitudMatrizService
      .obtenerSolicitudMatriz(
        true,
        new Date(new Date().getFullYear(), 0, 1),
        new Date(),
        undefined,
        undefined,
        undefined,
        undefined,
        idSolicitante,
        idSupervisor,
        estadoSolicitud,
        estadoMatriz,
        // estadoSolicitud,
        // estadoMatriz
      )
      .then((listSolicitudesMatriz) => {
        let solmatAux = listSolicitudesMatriz
          ? listSolicitudesMatriz
          : [];

          if (this.estadoSolicitudMatriz === 4){
            this.dataSourceSolicitudesMatriz.data = solmatAux.filter(
              e => {
                  return (e.visita === "NO");
            })
          } else if (this.estadoSolicitudMatriz === 5){
            this.dataSourceSolicitudesMatriz.data = solmatAux.filter(
              e => {
                  return (e.visita === "SI");
            })
          } else {
            this.dataSourceSolicitudesMatriz.data = solmatAux
          }
        this.dataSourceSolicitudesMatriz.filter = "";
      })
      .finally(() => this._spinner.hide());
    }
  }

  public irPaginaExterna(
    nombrePagina: string,
    parametroQueryString: string,
    valorQueryString: string
  ) {
    const url =
      environment.getRutaBaseApp() +
      nombrePagina +
      '?' +
      parametroQueryString +
      '=' +
      valorQueryString;

    window.open(url, '_blank');
  }

  openSidenavMenu() {
    this.myNav.toggle();
    $('.my-left-sidenav').show();
    this.openMenu();
  }

  closeSidenavMenu() {
    this.myNav.toggle();
    $('.my-left-sidenav').hide();
  }

  openMenu() {
    this.isOpenMenu = true;
  }

  closeMenu() {
    this.isOpenMenu = false;
  }
  onKeydownCodigo(event) {
    if (event.key === 'Enter') {
      this.closeSidenavMenu();
    }
  }

  reload() {
    this._spinner.show();
    this.dataSourceSolicitudesMatriz.data = [];
    this.getSolicitudesMatriz();
  }
/*
  exportarExcel() {
    const titleData: string[] = [
      'Solicitud',
      'Matriz',
      '??rea',
      'Solicitante',
      'Supervisor',
      'Tipo',
      'Estado',
    ];
    let data = this.dataSourceSolicitudesMatriz.map((solicitudMatriz) => {
      return {
        solicitud: solicitudMatriz.id,
        matriz: solicitudMatriz.matriz,
        area: solicitudMatriz.area,
        solicitante: solicitudMatriz.solicitante,
        supervisor: solicitudMatriz.supervisor,
        tipo: solicitudMatriz.tipo,
        descEstado: solicitudMatriz.descEstado,
      };
    });
    this.excelService.generateBasicExcel(
      'Solicitudes',
      'Solicitudes matriz',
      data,
      titleData
    );
  }
  */
}

export interface IDictionary {
  [key: number]: PagedItemCollection<any[]>;
}
