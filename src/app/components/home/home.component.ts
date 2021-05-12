import { Component, OnInit, ApplicationRef, NgZone, HostListener, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { SpinnerVisibilityService } from 'ng-http-loader';
import { Location, SlicePipe } from '@angular/common';
import { slideInAnimation } from '../../route-animations';
//import * as $ from 'jquery';
import { Configuration } from '../../shared/models/fisics/Configuration';
import {
  NavigationEnd,
  NavigationStart,
  RoutesRecognized,
  ActivationStart,
} from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';

import { Deferred } from 'ts-deferred';

import { environment } from '../../../environments/environment';

import { FormularioAT } from '../../shared/pages/formularioAT';

// import { IStatistics } from '../../shared/models/fisics/IStatistics';
import { MasterLogic } from '../../shared/models/logics/MasterLogic';


import { MasterService } from '../../shared/services/master.service';
import { MaestroFLujoEtapa } from '../../shared/models/fisics/MaestroFLujoEtapa';
import { MaestroMaterialService } from '../../shared/services/maestromaterial.service';
import { MaestroMaterialFilter } from 'src/app/shared/models/fisics/MaestroMaterialFilter';
import { PagedItemCollection, Item } from '@pnp/sp/items';
import { MaestroMaterial } from '../../shared/models/fisics/MaestroMaterial';
import { Variables } from '../../shared/variables';
import { Funciones } from '../../shared/funciones';

// import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
// import { Color, Label, SingleDataSet } from 'ng2-charts';
import { FormControl } from '@angular/forms';

import { MatrizService } from '../../shared/services/matriz.service';
import { SolicitudMatriz } from 'src/app/shared/models/fisics/SolicitudMatriz';
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';

import { IndicadoresService } from '../../shared/services/indicadores.service';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/shared/services/login.service';
import { Usuario } from 'src/app/shared/models/fisics/Usuario';

// import { AccesoService } from '../../shared/services/user.service';
// import { Puesto } from '../../shared/models/fisics/Puesto';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [slideInAnimation], // register the animation
})
export class HomeComponent extends FormularioAT implements OnInit {



  @ViewChild('sidenav') sidenav: MatSidenav;


  dataSourceIndicadoresMatriz: any[] = [];
  cards: any[] = [
    {
      contador: 7,
      indicador: "Mis solicitudes Pendientes",
      id: 0,
      show: false,
      footer: "PENDIENTES"
    },
    {
      contador: 5,
      indicador: "Mis solicitudes finalizadas",
      id: 0,
      show: false,
      footer: "FINALIZADAS"
    },
    {
      contador: 10,
      indicador: "Mis solicitudes en proceso",
      id: 0,
      show: false,
      footer: "EN PROCESO"
    },
    {
      contador: 0,
      indicador: "",
      id: 0,
      show: false,
      footer: "APROBADAS"
    },
    {
      contador: 0,
      indicador: "",
      id: 0,
      show: false,
      footer: "PENDIENTES"
    },
    {
      contador: 0,
      indicador: "",
      id: 0,
      show: false,
      footer: "EN PROCESO"
    },
    {
      contador: 0,
      indicador: "",
      id: 0,
      show: false,
      footer: "PARA APROBACIÓN"
    },
    {
      contador: 0,
      indicador: "",
      id: 0,
      show: false,
      footer: "APROBADAS"
    },
    {
      contador: 0,
      indicador: "",
      id: 0,
      show: false,
      footer: "PENDIENTES"
    },
    {
      contador: 0,
      indicador: "",
      id: 0,
      show: false,
      footer: "EN PROCESO"
    },
    {
      contador: 0,
      indicador: "",
      id: 0,
      show: false,
      footer: "PARA APROBACIÓN"
    },
    {
      contador: 0,
      indicador: "",
      id: 0,
      show: false,
      footer: "PUBLICADAS"
    },
    {
      contador: 0,
      indicador: "",
      id: 0,
      show: false,
      footer: "NO PUBLICADAS"
    }
  ]

  // contadoresSolicitudesMatrices = {
  //   solicitudesEnPendientes: {
  //     id: 0,
  //     valor: 0,
  //     presente: false,
  //     indicador: ""
  //   },
  //   solicitudesFinalizadas: {
  //     id: 0,
  //     valor: 0,
  //     presente: false,
  //     indicador: ""
  //   },
  //   matricesEnProceso: {
  //     id: 0,
  //     valor: 0,
  //     presente: false,
  //     indicador: ""
  //   },
  //   matricesAprobadas: {
  //     id: 0,
  //     valor: 0,
  //     presente: false,
  //     indicador: ""
  //   },
  //   matricesEnEjecucion: {
  //     id: 0,
  //     valor: 0,
  //     presente: false,
  //     indicador: ""
  //   }
  // }

  // esMiembroId: boolean;
  // currentUserName: string = '';
  // currentUserPictureUrl = '';
  // currentUserEmail = '';
  // statistics: IStatistics;
  // solicitudesEnProceso: number;
  // solicitudesEnPendientes: number;
  // solicitudesCerradas: number;
  // solicitudesVencidas: number;
  nuevaSolicitud: boolean = true;
  usuarioLogged: Usuario;

  // barChartOptions: ChartOptions = {
  //   responsive: true,
  // };

  // items = [
  //   {name: 'Mis Solicitudes pendientes', cols: 1, rows: 2, contador: 3, style:"color:blue", description: 'PENDIENTES'},
  //   {name: 'Mis Solicitudes Finalizadas', cols: 1, rows: 2, contador: 15, style:"color:orange", description: 'FINALIZADAS'},
  //   {name: 'Mis Matrices en Proceso', cols: 1, rows: 2, contador: 10, style:"color:blue", description: 'EN PROCESO'},
  //   {name: 'Mis Matrices Aprobadas', cols: 1, rows: 2, contador: 4, style:"color:blue", description: 'APROBADAS'},
  //   {name: 'Mis Matrices en Ejecución', cols: 1, rows: 2, contador: 5, style:"color:blue", description: 'VENCIDAS'}
  // ]

  // pieChartOptions: ChartOptions = {
  //   responsive: true,
    // plugins: {
    //   datalabels: {
    //     formatter: (value, ctx) => {
    //       const label = ctx.chart.data.labels[ctx.dataIndex];
    //       console.log(value);
    //       console.log(label);
    //       return label.toString().replace(value, '').trim();
    //     },
    //   },
    // }
  // };
  // pieChartPlugins = [/*pluginDataLabels*/];

  // pieChartLabel: Label[];
  // pieChartData: SingleDataSet;
  // pieChartColors: Color[] = [
  //   {
  //     backgroundColor: [/*Variables.colores.Flujo.Creadas, */Variables.colores.Flujo.EnProceso, Variables.colores.Flujo.Cerradas],
  //     hoverBackgroundColor: [/*Variables.colores.Flujo.Creadas, */Variables.colores.Flujo.EnProceso, Variables.colores.Flujo.Cerradas],
  //   }
  // ];

  // barChartLabels: Label[];
  // barChartLabelsPorMes: Label[];
  // barChartType: ChartType = 'bar';
  // barChartLegend = true;
  // barChartPlugins = [];
  // barChartData: ChartDataSets[];
  // barChartDataPorMes: ChartDataSets[];

  // maestroMaterial: MaestroMaterial[];
  // formControlAnnio: FormControl;
  // anniosSelect: number[];

  // screenWidth: any;

  /*

  toggleExpand() {
    if ($('mat-sidenav-container').hasClass('position-fixed')) {
      //$("#suiteBarDelta").removeClass("topbar-hide");
      $('#suiteBarDelta').addClass('topbar-show');
      $('mat-toolbar.main-toolbar').removeClass('position-fixed');
      $('mat-toolbar.main-toolbar').addClass('position-relative');
      $('mat-sidenav-container').removeClass('position-fixed');
      $('mat-sidenav-container').addClass('position-relative');
      // $('main').removeClass('paddingtop70');
    } else {
      //$("#suiteBarDelta").slideToggle();
      //$("#suiteBarDelta").addClass("topbar-hide");
      $('#suiteBarDelta').removeClass('topbar-show');
      $('mat-toolbar.main-toolbar').addClass('position-fixed');
      $('mat-toolbar.main-toolbar').removeClass('position-relative');
      $('mat-sidenav-container').addClass('position-fixed');
      $('mat-sidenav-container').removeClass('position-relative');
      // $('main').addClass('paddingtop70');
    }
  }
*/

  constructor(
    public applicationRef: ApplicationRef,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    public router: Router,
    public masterService: MasterService,
    public zone: NgZone,
    public _spinner: SpinnerVisibilityService,
    private maestroMaterialService: MaestroMaterialService,
    private matrizService: MatrizService,
    private indicadoresService: IndicadoresService,
    private loginService: LoginService
  ) {
    super('Home', applicationRef, dialog, route, router, masterService, zone, _spinner);
    // console.log(JSON.stringify(this.loginService.getUserLogged()));
    this.getUserLogged()
    // this.esMiembroId = false;
    // this.formControlAnnio = new FormControl(0);
    // this.getScreenSize();
    this.getDashboardData();
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
    this.usuarioLogged.rol = usuarioFromSession._rol;//"JA";
    this.usuarioLogged.selected = usuarioFromSession._selected;
    this.usuarioLogged.tipo = usuarioFromSession._tipo;
    this.usuarioLogged.usuario = usuarioFromSession._usuario;
    this.usuarioLogged.usuarioModifica = usuarioFromSession._usuarioModifica;
    this.usuarioLogged.usuarioRegistro = usuarioFromSession._usuarioRegistro;
  }

  getDashboardData(): void{
    this.indicadoresService
      // .obtenerDashboardData("xternal", this.loggedUser.rol)
      .obtenerDashboardData(this.usuarioLogged.idUsuario, this.usuarioLogged.rol)
      .then((listSolicitudesMatriz) => {
        this.dataSourceIndicadoresMatriz = listSolicitudesMatriz
          ? listSolicitudesMatriz
          : [];
        this.dataSourceIndicadoresMatriz.forEach(
          (element, number, array) => {
            this.cards[element.id - 1].id = element.id;
            this.cards[element.id - 1].indicador = element.indicador;
            this.cards[element.id - 1].contador = element.valor;
            this.cards[element.id - 1].show = true;
          }
        )
      }).finally(() => this._spinner.hide());

  }


  // @HostListener('window:resize', ['$event'])
  // getScreenSize(event?): void {
  //   this.screenWidth = window.innerWidth;
  // }

  // state$: Observable<object>;
  ngOnInit() {
    // this.cargarDatosPagina();
    // this.state$ = this.route.paramMap
    //   .pipe(map(() => window.history.state))
  }

  // cargarDatosPagina() {
  //   // this.mostrarProgreso();
  //   // this.statistics = <IStatistics>{};
  //   this.obtenerMaestrosYDatos().then(
  //     () => {
        // console.log('log');

        // this.currentUserName = this.datosMaestros.currentUser.Title;
        // this.currentUserPictureUrl = "assets/img/faces/userprofile.png"; //this.datosMaestros.currentUser.PictureUrl;
        // this.currentUserEmail = this.datosMaestros.currentUser.Email;

  //       this.ocultarProgreso();
  //     },
  //     err => this.guardarLog(err)
  //   );
  // }

  // obtenerMaestrosYDatos(): Promise<boolean> {
  //   //debugger;
  //   const d: Deferred<boolean> = new Deferred<boolean>();

  //   this.masterService
  //     .getDatosMaestros()
  //     .subscribe((masterLogic: MasterLogic) => {
  //       if (masterLogic.isDatos) {
  //         this.datosMaestros = masterLogic;
  //         d.resolve(true);
  //       }
  //     });

  //   return d.promise;
  // }

  // public irPaginaExterna(
  //   nombrePagina: string,
  //   parametroQueryString: string,
  //   valorQueryString: string
  // ) {
  //   const url =
  //     // environment.getRutaBaseApp() +
  //     nombrePagina;// +
  //   //'?' +
  //   //parametroQueryString +
  //   //'=' +
  //   //valorQueryString;

  //   //window.open(url, '_blank');
  //   this.router.navigate([url])
  // }

}
