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
import { AreaFilter } from 'src/app/shared/Types';
import { IStatistics } from 'src/app/shared/models/fisics/IStatistics';
import { MaestroMaterial } from 'src/app/shared/models/fisics/MaestroMaterial';
import { MaestroMaterialFilter } from 'src/app/shared/models/fisics/MaestroMaterialFilter';
import { Matriz } from 'src/app/shared/models/fisics/Matriz';
import { SolicitudMatriz } from 'src/app/shared/models/fisics/SolicitudMatriz';
import { TipoMotivo } from 'src/app/shared/models/fisics/TipoMotivo';
import { MasterLogic } from 'src/app/shared/models/logics/MasterLogic';
import { FormularioAT } from 'src/app/shared/pages/formularioAT';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { MasterService } from 'src/app/shared/services/master.service';
import { MatrizService } from 'src/app/shared/services/matriz.service';
import { MotivoService } from 'src/app/shared/services/motivo.service';
import { SolicitudMatrizService } from 'src/app/shared/services/solicitudmatriz.service';
import { UbicacionService } from 'src/app/shared/services/ubicacion.service';
import { environment } from 'src/environments/environment';
import { AlertComponent } from '../alert/alert.component';

declare var $: any;
@Component({
  selector: 'app-duplicar-matriz',
  templateUrl: './duplicar-matriz.component.html',
  styleUrls: ['./duplicar-matriz.component.scss'],
})
export class DuplicarMatrizComponent extends FormularioAT implements OnInit {
  @ViewChild(MatTable) tableSolicitudesMatriz: MatTable<SolicitudMatriz>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('sidenavfiltros', { static: true }) public myNav: MatSidenav;

  listAreas: AreaFilter[] = [];
  listTiposMotivos: TipoMotivo[] = [];

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
    private motivoservice: MotivoService,
    private ubicacionService: UbicacionService,
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
    this.getAreas();
    this.getTipoMotivos();
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

  getAreas() {
    this.ubicacionService.obtenerUbicaciones().then((ubicaciones) => {
      const listUbicaciones = ubicaciones ? ubicaciones : [];

      let listAreas: AreaFilter[] = listUbicaciones.map((u) => {
        return {
          idArea: u.idArea,
          area: u.area,
          idCentro: u.idCentro,
          idEmpresa: u.idEmpresa,
        };
      });
      this.listAreas = listAreas.filter(
        (area, index, list) =>
          list.findIndex(
            (a) => a.idArea == area.idArea && a.area == area.area
          ) == index
      );
    });
  }

  getTipoMotivos(): void {
    this.motivoservice.obtenerTipoMotivo().then((tipomotivos) => {
      this.listTiposMotivos = tipomotivos ? tipomotivos : [];
    });
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
    try {
      const solicitudMatriz = this.dataSourceSolicitudesMatriz.find(
        (solicitud) => solicitud.id == idSolicitud
      );
      // const matrices = await this.matrizService.obtenerMatriz();
      // const listMatrices = matrices ? matrices : [];
      // const matriz = listMatrices.find((m) => m.id == solicitudMatriz.idMatriz);

      const matriz = new Matriz();
      matriz.id = solicitudMatriz.idMatriz;
      matriz.idSolicitante = solicitudMatriz.idSolicitante;
      matriz.idArea = solicitudMatriz.idArea;
      matriz.idSupervisor = solicitudMatriz.idSupervisor;
      matriz.usuarioRegistro = solicitudMatriz.usuarioRegistro
        ? solicitudMatriz.usuarioRegistro
        : '';
      matriz.fechaRegistro = new Date();

      let lastId = await this.matrizService.generarMatriz(matriz);
      if (lastId && lastId > 0) {
        this.showMessage(`Éxito al clonar la matriz ${matriz.id}`);
      } else {
        this.showMessage(`No se puede clonar la matriz`);
      }
    } catch {
      this.showMessage(`Ocurrió un error al clonar la matriz`);
    }
  }

  showMessage(text: string) {
    const alertRef = this.dialog.open(AlertComponent, {
      width: '250px',
      data: { mensaje: text },
    });
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
