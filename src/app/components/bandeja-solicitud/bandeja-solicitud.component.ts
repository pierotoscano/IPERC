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
import { MatTable } from '@angular/material/table';

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
  dataSourceSolicitudesMatriz: SolicitudMatriz[] = [];
  displayedColumnsProjects: string[] = [
    'Solicitud',
    'Matriz',
    'Area',
    'Solicitante',
    'Supervisor',
    'TipoMotivo',
    'Motivo',
    'Estado'
  ];

  resultsLength = 15;
  isLoadingResults = true;
  isRateLimitReached = false;
  isFilterApplied = false;
  formBuscarSolicitudes: FormGroup;
  estadoSolicitudMatriz: string;
  _etapa: string;

  // userAdministrator = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('sidenavfiltros', { static: true }) public myNav: MatSidenav;

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
    this.estadoSolicitudMatriz = route.snapshot.params['etapa'];
    // console.log(this.estadoSolicitudMatriz)
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
    const estadoMatriz = undefined;
    const page = 0;
    const rows = 0;

    this.solicitudMatrizService
      .obtenerSolicitudMatriz(
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
        this.dataSourceSolicitudesMatriz = listSolicitudesMatriz
          ? listSolicitudesMatriz
          : [];
        this.tableSolicitudesMatriz.renderRows();
      })
      .finally(() => this._spinner.hide());
  }  

  ngOnInit() {
    this.formBuscarSolicitudes = this.formBuilder.group({
      idSolicitud: new FormControl(null),
      idMatriz: new FormControl(null),
      idArea: new FormControl(null),
      idTipoMotivo: new FormControl(null),
      idSolicitante: new FormControl(null),
      idEstado: new FormControl(null),
      supervisor: new FormControl(null),
      fechaInicio: new FormControl(new Date(), [Validators.required]),
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
    if(this.estadoSolicitudMatriz === undefined){
      this.solicitudMatrizService
      .obtenerSolicitudMatriz(
        true,
        new Date(1, 0, 2021),
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
        this.dataSourceSolicitudesMatriz = listSolicitudesMatriz
          ? listSolicitudesMatriz
          : [];
      })
      .finally(() => this._spinner.hide());
    } else {
      let estadoSolicitud = this.estadoSolicitudMatriz.slice(0,1) === "S" ? this.estadoSolicitudMatriz : "SA";
      let estadoMatriz = this.estadoSolicitudMatriz.slice(0,1) === "S" ? undefined : this.estadoSolicitudMatriz;
      this.solicitudMatrizService
      .obtenerSolicitudMatriz(
        true,
        new Date(1, 0, 2021),
        new Date(),
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        estadoSolicitud,
        estadoMatriz
      )
      .then((listSolicitudesMatriz) => {
        this.dataSourceSolicitudesMatriz = listSolicitudesMatriz
          ? listSolicitudesMatriz
          : [];
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
    this.dataSourceSolicitudesMatriz = [];
    this.getSolicitudesMatriz();
  }
/*
  exportarExcel() {
    const titleData: string[] = [
      'Solicitud',
      'Matriz',
      'Área',
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
