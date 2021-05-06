import {
  Component,
  Injectable,
  OnChanges,
  OnInit,
  Pipe,
  PipeTransform,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { MotivoService } from '../../shared/services/motivo.service';
import { TipoMotivo } from '../../shared/models/fisics/TipoMotivo';

import { UbicacionService } from '../../shared/services/ubicacion.service';

import { SupervisorService } from 'src/app/shared/services/supervisor.service';
import { Usuario } from 'src/app/shared/models/fisics/Usuario';

import { MatrizService } from '../../shared/services/matriz.service';

import { SolicitudMatrizService } from 'src/app/shared/services/solicitudmatriz.service';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SolicitudMatriz } from 'src/app/shared/models/fisics/SolicitudMatriz';
import { Matriz } from 'src/app/shared/models/fisics/Matriz';
import { Variables } from 'src/app/shared/variables';
import { LoginService } from 'src/app/shared/services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';
import { Ubicacion } from 'src/app/shared/models/fisics/Ubicacion';

export type Empresa = {
  idEmpresa: number;
  empresa: string;
};

export type Centro = {
  idCentro: number;
  centro: string;
  idEmpresa: number;
};

export type Area = {
  idArea: number;
  area: string;
  idCentro: number;
  idEmpresa: number;
};

export type Alcance = {
  idAlcance: number;
  alcance: string;
  idArea: number;
  idCentro: number;
  idEmpresa: number;
};

export type Proceso = {
  idProceso: number;
  proceso: string;
  idAlcance: number;
  idArea: number;
  idCentro: number;
  idEmpresa: number;
};
@Component({
  selector: 'app-enviar-solicitud',
  templateUrl: './enviar-solicitud.component.html',
  styleUrls: ['./enviar-solicitud.component.scss'],
})
export class EnviarSolicitudComponent implements OnInit,OnChanges {
  empresas: Empresa[] = [];
  alcances: Alcance[] = [];
  procesos: Proceso[] = [];
  centros: Centro[] = [];
  areas: Area[] = [];
  supervisores: Usuario[] = [];
  tipomotivos: TipoMotivo[] = [];
  usuarioLogged: Usuario;

  listEmpresas: Empresa[] = [];
  listCentros: Centro[] = [];
  listAreas: Area[] = [];
  listAlcances: Alcance[] = [];
  listProcesos: Proceso[] = [];
  listUbicaciones: Ubicacion[] = [];

  datosMaestros = {
    maestroFLujoEtapa: [
      {
        Title: 'Solicitar Matriz Riesgo',
        EtapaHabilitado: true,
        Id: 1,
      },
      {
        Title: 'Asignación de Supervisor',
        EtapaHabilitado: true,
        Id: 2,
      },
      {
        Title: 'Registro de Puestos y Actividades',
        EtapaHabilitado: true,
        Id: 3,
      },
      {
        Title: 'Registro de Visitas',
        EtapaHabilitado: true,
        Id: 4,
      },
      {
        Title: 'Registro de Peligros, Riesgos y Medidas de Control',
        EtapaHabilitado: true,
        Id: 5,
      },
    ],
  };
  ubicaciones: Ubicacion[] = [];
  empresascombo: Empresa[] = [];
  alcancescombo: Alcance[] = [];
  procesoscombo: Proceso[] = [];
  centroscombo: Centro[] = [];
  areascombo: Area[] = [];
  // @ViewChild(MatSort) sort: MatSort;
  // dataSource: MatTableDataSource<MatrizActividad>;
  // limit: number = 1000;

  maestroFlujoEtapaActual = {
    Id: 1,
  };

  //Parámetros genéricos
  solicitudMatrizSelected: SolicitudMatriz;
  matrizSelected: Matriz;
  idSolicitudMatrizSelected: string;

  estadoSolicitud = null;
  estadoMatriz = null;
  formularioBloqueado: boolean = false;
  nuevaSolicitud: boolean = false;
  formCabeceraSolicitud: FormGroup;
  formGuardarSolicitudMatriz: FormGroup;

  constructor(
    private tipomotivoservice: MotivoService,
    private supervisorService: SupervisorService,
    private ubicacionService: UbicacionService,
    private matrizservice: MatrizService,
    private solicitudMatrizService: SolicitudMatrizService,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private roudter: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {
    this.getUserLogged();
    this.idSolicitudMatrizSelected = route.snapshot.params['idSolicitudMatriz']; // Obtener de la URL, en caso que sea null se registrará una nueva solicitud
    this.formGuardarSolicitudMatriz = this.formBuilder.group({
      empresa: new FormControl({
        value: '',
        disabled: this.formularioBloqueado,
      }),
      proceso: new FormControl(
        { value: '', disabled: this.formularioBloqueado },
        [Validators.required]
      ),
      centro: new FormControl(
        { value: '', disabled: this.formularioBloqueado },
        [Validators.required]
      ),
      solicitante: new FormControl(
        { value: '', disabled: this.formularioBloqueado },
        [Validators.required]
      ),
      area: new FormControl({ value: '', disabled: this.formularioBloqueado }, [
        Validators.required,
      ]),
      tipoMotivo: new FormControl(
        { value: '', disabled: this.formularioBloqueado },
        [Validators.required]
      ),
      alcance: new FormControl(
        { value: '', disabled: this.formularioBloqueado },
        [Validators.required]
      ),
      motivo: new FormControl(
        { value: '', disabled: this.formularioBloqueado },
        [Validators.required]
      ),
    });
    this.formCabeceraSolicitud = this.formBuilder.group({
      idsolicitud: new FormControl({ value: '' }),
      idmatriz: new FormControl({ value: '' }),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.matrizSelected)
  }

  // handleScroll = (scrolled: boolean) => {
  //   // console.timeEnd('lastScrolled');
  //   scrolled ? this.getData() : _noop();
  //   // console.time('lastScrolled');
  // }

  // getData() {
  //   const data: Element[] = this.dataSource
  //     ? [...this.dataSource.data, ...this.actividades]
  //     : [];
  //   this.dataSource = new MatTableDataSource(data);
  //   // this.dataSource.sort = this.sort;
  // }

  // hasMore = () => !this.dataSource || this.dataSource.data.length < this.limit;

  ngOnInit(): void {
    this.obtenerCombos();
    this.obtenerCascadeCombos();
    //Obtener datos de la solicitud
    if (this.idSolicitudMatrizSelected) {
      this.solicitudMatrizService
        .obtenerSolicitudMatriz(
          true,
          new Date(2021, 0, 1),
          new Date(),
          this.idSolicitudMatrizSelected
        )
        .then((solicitudesMatriz) => {
          let listSolicitudesMatriz = solicitudesMatriz
            ? solicitudesMatriz
            : [];
          listSolicitudesMatriz.forEach((solicitudMatriz) => {
            if (solicitudMatriz.id === this.idSolicitudMatrizSelected) {
              this.solicitudMatrizSelected = solicitudMatriz;
              console.log(this.solicitudMatrizSelected);

              this.formCabeceraSolicitud.controls['idsolicitud'].setValue(
                this.solicitudMatrizSelected.id
              );
              this.formCabeceraSolicitud.controls['idmatriz'].setValue(
                this.solicitudMatrizSelected.idMatriz
              );
              this.formGuardarSolicitudMatriz.controls['centro'].setValue(
                this.solicitudMatrizSelected.idCentro
              );
              // this.formGuardarSolicitudMatriz.controls["empresa"].setValue(this.solicitudMatrizSelected.);
              // this.formGuardarSolicitudMatriz.controls["proceso"].setValue(this.solicitudMatrizSelected.);
              this.formGuardarSolicitudMatriz.controls['centro'].setValue(
                this.solicitudMatrizSelected.idCentro
              );
              this.formGuardarSolicitudMatriz.controls['solicitante'].setValue(
                this.solicitudMatrizSelected.idSolicitante
              );
              this.formGuardarSolicitudMatriz.controls['area'].setValue(
                this.solicitudMatrizSelected.idArea
              );
              this.formGuardarSolicitudMatriz.controls['tipoMotivo'].setValue(
                this.solicitudMatrizSelected.idTipoMotivo
              );
              // this.formGuardarSolicitudMatriz.controls["alcance"].setValue(this.solicitudMatrizSelected.);
              this.formGuardarSolicitudMatriz.controls['motivo'].setValue(
                this.solicitudMatrizSelected.motivo
              );

              this.matrizSelected = new Matriz(
                this.solicitudMatrizSelected.idMatriz
              );
              this.matrizSelected.idArea = this.solicitudMatrizSelected.idArea;
              this.setCombosValue();
              return false;
            }
          });
          //Establecer los valores de los combos
          this.setCombosValue();
          this.setCascadeCombosValue();

          if (this.solicitudMatrizSelected.idMatriz) {
            //Obtener la matriz
            console.log('Existe matriz');
            this.matrizservice.obtenerMatriz().then((matrices) => {
              let listMatrices = matrices ? matrices : [];

              this.matrizSelected = listMatrices.find(
                (m) => m.id == this.solicitudMatrizSelected.idMatriz
              );
              console.log(this.matrizSelected);
            });
          }
        });
    } else {
      this.nuevaSolicitud = true;
    }
  }

  obtenerCombos(): void {
    this.getTipoMotivos();
    this.getSolicitantes();
  }

  //Actualizar campos de selección
  obtenerCascadeCombos() {
    this.ubicacionService.obtenerUbicaciones().then((ubicaciones) => {
      this.listUbicaciones = ubicaciones ? ubicaciones : [];

      let listProcesos: Proceso[] = this.listUbicaciones.map((u) => {
        return {
          idProceso: u.idProceso,
          proceso: u.proceso,
          idAlcance: u.idAlcance,
          idArea: u.idArea,
          idCentro: u.idCentro,
          idEmpresa: u.idEmpresa,
        };
      });
      this.listProcesos = listProcesos.filter(
        (proceso, index, list) =>
          list.findIndex(
            (p) =>
              p.idProceso == proceso.idProceso &&
              p.proceso == proceso.proceso &&
              p.idAlcance == proceso.idAlcance &&
              p.idArea == proceso.idArea &&
              p.idCentro == proceso.idCentro &&
              p.idEmpresa == proceso.idEmpresa
          ) == index
      );

      let listAlcances: Alcance[] = this.listUbicaciones.map((u) => {
        return {
          idAlcance: u.idAlcance,
          alcance: u.alcance,
          idArea: u.idArea,
          idCentro: u.idCentro,
          idEmpresa: u.idEmpresa,
        };
      });
      this.listAlcances = listAlcances.filter(
        (alcance, index, list) =>
          list.findIndex(
            (a) =>
              a.idAlcance == alcance.idAlcance &&
              a.alcance == alcance.alcance &&
              a.idArea == alcance.idArea &&
              a.idCentro == alcance.idCentro &&
              a.idEmpresa == alcance.idEmpresa
          ) == index
      );

      let listAreas: Area[] = this.listUbicaciones.map((u) => {
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
            (a) =>
              a.idArea == area.idArea &&
              a.area == area.area &&
              a.idCentro == area.idCentro &&
              a.idEmpresa == area.idEmpresa
          ) == index
      );

      let listCentros = this.listUbicaciones.map((u) => {
        return {
          idCentro: u.idCentro,
          centro: u.centro,
          idEmpresa: u.idEmpresa,
        };
      });
      this.listCentros = listCentros.filter(
        (centro, index, list) =>
          list.findIndex(
            (c) =>
              c.idCentro == centro.idCentro &&
              c.centro == centro.centro &&
              c.idEmpresa == centro.idEmpresa
          ) == index
      );

      let listEmpresas = this.listUbicaciones.map((u) => {
        return {
          idEmpresa: u.idEmpresa,
          empresa: u.empresa,
        };
      });
      this.listEmpresas = listEmpresas.filter(
        (empresa, index, list) =>
          list.findIndex((e) => e.idEmpresa == empresa.idEmpresa) == index
      );

      this.empresas = this.listEmpresas;
    });
  }

  setCombosValue() {
    this.formGuardarSolicitudMatriz.controls['solicitante'].setValue(
      this.solicitudMatrizSelected.idSolicitante
    );
    this.formGuardarSolicitudMatriz.controls['tipoMotivo'].setValue(
      this.solicitudMatrizSelected.idTipoMotivo
    );
    this.formGuardarSolicitudMatriz.controls['motivo'].setValue(
      this.solicitudMatrizSelected.motivo
    );
  }

  setCascadeCombosValue() {
    this.ubicacionService
      .obtenerUbicaciones(this.solicitudMatrizSelected.id)
      .then((ubicaciones) => {
        let listUbicaciones = ubicaciones ? ubicaciones : [];
        let ubicacion = listUbicaciones[0];

        //Llenado de los demás combos
        this.procesos = this.listProcesos;
        this.alcances = this.listAlcances;
        this.areas = this.listAreas;
        this.centros = this.listCentros;

        this.formGuardarSolicitudMatriz.controls['empresa'].setValue(
          ubicacion.idEmpresa
        );

        this.refreshCentros();
        this.formGuardarSolicitudMatriz.controls['centro'].setValue(
          ubicacion.idCentro
        );

        this.refreshAreas();
        this.formGuardarSolicitudMatriz.controls['area'].setValue(
          ubicacion.idArea
        );

        this.refreshAlcances();
        this.formGuardarSolicitudMatriz.controls['alcance'].setValue(
          ubicacion.idAlcance
        );

        this.refreshProceso();
        this.formGuardarSolicitudMatriz.controls['proceso'].setValue(
          ubicacion.idProceso
        );
      });
  }

  refreshCentros() {
    const idEmpresa = this.formGuardarSolicitudMatriz.value.empresa;
    this.centros = [];
    this.centros = this.listCentros.filter(
      (centro) => centro.idEmpresa == idEmpresa
    );
  }

  refreshAreas() {
    const idCentro = this.formGuardarSolicitudMatriz.value.centro;
    const idEmpresa = this.formGuardarSolicitudMatriz.value.empresa;
    this.areas = [];
    this.areas = this.listAreas.filter(
      (area) => area.idCentro == idCentro && area.idEmpresa == idEmpresa
    );
  }

  refreshAlcances() {
    const idArea = this.formGuardarSolicitudMatriz.value.area;
    const idCentro = this.formGuardarSolicitudMatriz.value.centro;
    const idEmpresa = this.formGuardarSolicitudMatriz.value.empresa;
    this.alcances = [];
    this.alcances = this.listAlcances.filter(
      (alcance) =>
        alcance.idArea == idArea &&
        alcance.idCentro == idCentro &&
        alcance.idEmpresa == idEmpresa
    );
  }

  refreshProceso() {
    const idAlcance = this.formGuardarSolicitudMatriz.value.alcance;
    const idArea = this.formGuardarSolicitudMatriz.value.area;
    const idCentro = this.formGuardarSolicitudMatriz.value.centro;
    const idEmpresa = this.formGuardarSolicitudMatriz.value.empresa;
    this.procesos = [];
    this.procesos = this.listProcesos.filter(
      (proceso) =>
        proceso.idAlcance == idAlcance &&
        proceso.idArea == idArea &&
        proceso.idCentro == idCentro &&
        proceso.idEmpresa
    );
  }

  getSolicitantes(): void {
    this.supervisorService.obtenerUsuariosPorRol('JA').then((supervisores) => {
      this.supervisores = supervisores ? supervisores : [];
    });
  }

  getTipoMotivos(): void {
    this.tipomotivoservice.obtenerTipoMotivo().then((tipomotivos) => {
      this.tipomotivos = tipomotivos ? tipomotivos : [];
    });
  }

  guardarSolicitudMatriz(): void {
    const estado = 'SN';
    const fechaModifica = new Date();
    const fechaRegistro = new Date();
    const idEmpresa = this.formGuardarSolicitudMatriz.value.empresa;
    const idCentro = this.formGuardarSolicitudMatriz.value.centro;
    const idArea = this.formGuardarSolicitudMatriz.value.area;
    const idAlcance = this.formGuardarSolicitudMatriz.value.alcance;
    const idProceso = this.formGuardarSolicitudMatriz.value.proceso;
    const idSolicitante = this.formGuardarSolicitudMatriz.value.solicitante;
    const idSolicitudMatriz = '';
    const idSupervisor = '0';
    const idTipoMotivo = this.formGuardarSolicitudMatriz.value.tipoMotivo;
    const motivo = this.formGuardarSolicitudMatriz.value.motivo;
    const tipo = 'SO';
    const usuarioModifica = 'xternal';
    const usuarioRegistro = 'xternal';

    const idUbicacion = this.listUbicaciones.find(
      (u) =>
        u.idEmpresa == idEmpresa &&
        u.idCentro == idCentro &&
        u.idArea == idArea &&
        u.idAlcance == idAlcance &&
        u.idProceso == idProceso
    ).idUbicacion;

    const solicitudMatriz: SolicitudMatriz = new SolicitudMatriz();
    solicitudMatriz.estado = estado;
    solicitudMatriz.fechaModifica = fechaModifica;
    solicitudMatriz.fechaRegistro = fechaRegistro;
    solicitudMatriz.idArea = idUbicacion;
    solicitudMatriz.idSolicitante = idSolicitante;
    solicitudMatriz.id = idSolicitudMatriz;
    solicitudMatriz.idSupervisor = idSupervisor;
    solicitudMatriz.idTipoMotivo = idTipoMotivo;
    solicitudMatriz.motivo = motivo;
    solicitudMatriz.tipo = tipo;
    solicitudMatriz.usuarioModifica = usuarioModifica;
    solicitudMatriz.usuarioRegistro = usuarioRegistro;
    this.solicitudMatrizService
      .guardarSolicitudMatriz(solicitudMatriz)
      .then((data) => {
        let idSolicitudMatrizInserted = data;
        if (idSolicitudMatrizInserted == 2) {
          this.showMessage(
            'Ya existe una solicitud en proceso para el area seleccionada.'
          );
        } else if (idSolicitudMatrizInserted == 0) {
          this.showMessage(
            'Ya existe una solicitud y matriz en proceso para el area seleccionada.'
          );
        } else {
          this.showMessage(
            'Éxito al registrar la solicitud: ' + idSolicitudMatrizInserted
          );
          this.roudter.navigate([Variables.path.bandejaSolicitudMaterial]);
          /*
          //Obtener la solicitudMatriz guardada
          this.solicitudMatrizService
            .obtenerSolicitudMatriz()
            .then((solicitudesMatriz) => {
              let listSolicitudesMatriz = solicitudesMatriz
                ? solicitudesMatriz
                : [];
              listSolicitudesMatriz.forEach((solicitudMatriz) => {
                if (solicitudMatriz.id == this.idSolicitudMatrizSelected) {
                  this.solicitudMatrizSelected = solicitudMatriz;
                  return false;
                }
              });
            });
            */
        }
      });
  }

  updateSolicitudMatriz(solicitudMatrizUpdated) {
    this.solicitudMatrizSelected = solicitudMatrizUpdated;
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

  showMessage(text: string) {
    const alertRef = this.dialog.open(AlertComponent, {
      width: '250px',
      data: { mensaje: text },
    });
  }
  // obtenerListaDesplegablesPorTipo(tipo:string): MaestroDesplegables[]{
  //   let listaDesplegables = [];
  //   if(this.datosMaestros != null){
  //     listaDesplegables = new List<MaestroDesplegables>(this.datosMaestros.maestroDesplegables).Where(x => {
  //       return x.TipoText == tipo}).OrderBy(x => x.Title).ToArray();
  //   }
  //   return listaDesplegables;
  // }
}
