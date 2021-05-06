import {
  ApplicationRef,
  Component,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PagedItemCollection } from '@pnp/sp/items';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Funciones } from 'src/app/shared/funciones';
import { IStatistics } from 'src/app/shared/models/fisics/IStatistics';
import { MaestroMaterial } from 'src/app/shared/models/fisics/MaestroMaterial';
import { MaestroMaterialFilter } from 'src/app/shared/models/fisics/MaestroMaterialFilter';
import { Matriz } from 'src/app/shared/models/fisics/Matriz';
import { SolicitudMatriz } from 'src/app/shared/models/fisics/SolicitudMatriz';
import { MasterLogic } from 'src/app/shared/models/logics/MasterLogic';
import { FormularioAT } from 'src/app/shared/pages/formularioAT';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { MasterService } from 'src/app/shared/services/master.service';
import { MatrizService } from 'src/app/shared/services/matriz.service';
import { SolicitudMatrizService } from 'src/app/shared/services/solicitudmatriz.service';
import { environment } from 'src/environments/environment';

declare var $: any;
@Component({
  selector: 'app-duplicar-matriz',
  templateUrl: './duplicar-matriz.component.html',
  styleUrls: ['./duplicar-matriz.component.scss'],
})
export class DuplicarMatrizComponent extends FormularioAT implements OnInit {
  @ViewChild(MatTable) tableSolicitudesMatriz: MatTable<SolicitudMatriz>;
  esMiembroId: boolean;
  currentUserName: string = '';
  statistics: IStatistics;

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
    'Estado',
    'Opcion',
  ];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  isFilterApplied = false;

  formBuscarSolicitudes: FormGroup;

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
    public solicitudMatrizService: SolicitudMatrizService,
    public excelService: ExcelService,
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

    this.esMiembroId = false;
  }

  ngOnInit() {
    this.formBuscarSolicitudes = this.formBuilder.group({
      idSolicitud: new FormControl(null),
      idMatriz: new FormControl(null),
      idArea: new FormControl(null),
      idTipoMotivo: new FormControl(null),
      idSolicitante: new FormControl(null),
      supervisor: new FormControl(null),
      fechaInicio: new FormControl(new Date(), [Validators.required]),
      fechaFin: new FormControl(new Date(), [Validators.required]),
    });
    // debugger;
    // this.mostrarProgreso();

    //Obtener datos de las solicitudes
    //this.getSolicitudesMatriz();
    // console.log("material-bandeja-solicitud")
  }

  getSolicitudesMatriz() {
    this.solicitudMatrizService
      .obtenerSolicitudMatriz(true)
      .then((listSolicitudesMatriz) => {
        this.dataSourceSolicitudesMatriz = listSolicitudesMatriz
          ? listSolicitudesMatriz
          : [];
      })
      .finally(() => this._spinner.hide());
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
    const supervisor = this.formBuscarSolicitudes.value.supervisor
      ? this.formBuscarSolicitudes.value.supervisor
      : undefined;
    const estadoSolicitud = undefined;
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

  async duplicarMatriz(idSolicitud) {
    const solicitudMatriz = this.dataSourceSolicitudesMatriz.find(
      (solicitud) => solicitud.id == idSolicitud
    );
    const matriz = new Matriz();
    matriz.id = solicitudMatriz.idMatriz;
    matriz.solicitante = solicitudMatriz.solicitante;
    matriz.idArea = solicitudMatriz.idArea;
    matriz.idSupervisor = solicitudMatriz.idSupervisor;
    matriz.usuarioRegistro = solicitudMatriz.usuarioRegistro;
    matriz.fechaRegistro = solicitudMatriz.fechaRegistro;
    let lastId = await this.matrizService.generarMatriz(matriz);
    if (lastId && lastId > 0) {
      console.log('Éxito al clonar');
    } else {
      console.log('Error al clonar');
    }
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
