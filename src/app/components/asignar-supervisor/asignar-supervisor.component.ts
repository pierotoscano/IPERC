import {
  AfterContentInit,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Proceso } from 'src/app/shared/models/fisics/Proceso';
import { Usuario } from 'src/app/shared/models/fisics/Usuario';
import { Matriz } from 'src/app/shared/models/fisics/Matriz';

import { ProcesoService } from 'src/app/shared/services/proceso.service';
import { SolicitudMatrizService } from 'src/app/shared/services/solicitudmatriz.service';

import { SupervisorService } from 'src/app/shared/services/supervisor.service';
import { MyErrorStateMatcher } from 'src/app/shared/validators/global.validator';
import { IEmailProperties } from '@pnp/sp/sputilities';
import { SolicitudMatriz } from 'src/app/shared/models/fisics/SolicitudMatriz';
import { Funciones } from 'src/app/shared/funciones';
import { MasterService } from 'src/app/shared/services/master.service';
import { MatrizService } from 'src/app/shared/services/matriz.service';
import { ConstanteService } from 'src/app/shared/services/constante.service';

import { sp } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import { IItemAddResult } from '@pnp/sp/items';
import { UbicacionService } from 'src/app/shared/services/ubicacion.service';
import { Router } from '@angular/router';
import { Variables } from 'src/app/shared/variables';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-asignar-supervisor',
  templateUrl: './asignar-supervisor.component.html',
  styleUrls: ['./asignar-supervisor.component.scss'],
})
export class AsignarSupervisorComponent implements OnInit, OnChanges {
  @Input() solicitudMatriz: SolicitudMatriz;
  @Input() matriz: Matriz = null;
  @Input() usuario: Usuario;
  @Output() solicitudMatrizEmitter = new EventEmitter<SolicitudMatriz>();
  @Output() matrizEmitter = new EventEmitter<Matriz>();
  formDatosAsignarSupervisor: FormGroup;
  listProcesos: Proceso[] = [];
  listSupervisores: Usuario[] = [];
  matcher: MyErrorStateMatcher;
  idMatrizSaved: number;
  matrizSaved: Matriz;

  constructor(
    private formBuilder: FormBuilder,
    private procesoService: ProcesoService,
    private supervisorService: SupervisorService,
    private solicitudMatrizService: SolicitudMatrizService,
    private matrizService: MatrizService,
    private masterService: MasterService,
    private ubicacionService: UbicacionService,
    private constanteService: ConstanteService,
    private route: Router,
    private dialog: MatDialog
  ) {
    this.matcher = new MyErrorStateMatcher();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let matrizCurrent: Matriz = changes.matriz
      ? changes.matriz.currentValue
        ? changes.matriz.currentValue.id
          ? (changes.matriz.currentValue as Matriz)
          : null
        : null
      : null;
    let solicitudMatrizCurrent: SolicitudMatriz = changes.solicitudMatriz
      ? changes.solicitudMatriz.currentValue
        ? changes.solicitudMatriz.currentValue.id
          ? (changes.solicitudMatriz.currentValue as SolicitudMatriz)
          : null
        : null
      : null;

    this.matriz = matrizCurrent;
    this.solicitudMatriz = solicitudMatrizCurrent;

    if (this.matriz) {
      this.setSupervisor();
    }
    if (this.solicitudMatriz) {
      this.setProceso();
    }
  }

  ngOnInit(): void {
    this.formDatosAsignarSupervisor = this.formBuilder.group({
      proceso: new FormControl('', [Validators.required]),
      supervisor: new FormControl('', [Validators.required]),
    });
    this.obtenerProcesos();
    this.obtenerSupervisores();
  }

  obtenerProcesos() {
    this.procesoService.obtenerProceso().then((procesos) => {
      this.listProcesos = procesos ? procesos : [];
    });
  }

  obtenerSupervisores() {
    this.supervisorService.obtenerUsuariosPorRol('SS').then((usuarios) => {
      this.listSupervisores = usuarios ? usuarios : [];
    });
  }

  setProceso() {
    this.ubicacionService
      .obtenerUbicaciones(this.solicitudMatriz.id)
      .then((ubicaciones) => {
        let listUbicaciones = ubicaciones ? ubicaciones : [];
        let ubicacion = listUbicaciones[0];
        console.log(ubicacion);
        this.formDatosAsignarSupervisor.controls['proceso'].setValue(
          ubicacion.idProceso
        );
      });
  }

  setSupervisor() {
    this.formDatosAsignarSupervisor.controls['supervisor'].setValue(
      this.matriz.idSupervisor
    );
  }

  async asignarSupervisor() {
    if (this.formDatosAsignarSupervisor.valid) {
      const idSupervisorSelected = this.formDatosAsignarSupervisor.value
        .supervisor;

      let supervisorSelected = this.listSupervisores.find(
        (s) => s.idUsuario == idSupervisorSelected
      );

      try {
        const resultAsignacion = await this.supervisorService.asignarSupervisor(
          supervisorSelected,
          this.usuario,
          this.solicitudMatriz
        );

        if (resultAsignacion && resultAsignacion > 0) {
          const resultGeneracion = await this.generarMatriz(supervisorSelected);
          if (resultGeneracion && resultGeneracion > 0) {
            const resultAsignarSupervisorSP = await this.asignarSupervisorSP(
              supervisorSelected
            );
            if (resultAsignarSupervisorSP) {
              this.showMessage(
                `Éxito al asignar supervisor y generar matriz: ${resultGeneracion}`
              );
              this.route.navigate([Variables.path.bandejaSolicitudMaterial]);
            }
          }
        }
      } catch {
        this.showMessage('Ocurrió un error durante la grabación.');
      }
    }
  }

  async generarMatriz(supervisorSelected: Usuario) {
    const idArea = this.solicitudMatriz.idArea;
    const idSupervisor = supervisorSelected.idUsuario;
    const usuarioRegistro = this.usuario.idUsuario;
    const fechaRegistro = new Date();

    let matriz = new Matriz();
    matriz.id = '';
    matriz.idSolicitante = this.solicitudMatriz.idSolicitante;
    matriz.idArea = idArea;
    matriz.idSupervisor = idSupervisor;
    matriz.usuarioRegistro = usuarioRegistro;
    matriz.fechaRegistro = fechaRegistro;

    return this.matrizService.generarMatriz(matriz);
  }

  async asignarSupervisorSP(supervisorSelected: Usuario) {
    const constantes = await this.constanteService.obtenerConstante();
    let listConstantes = constantes ? constantes : [];

    const asuSupervisorAsignado = listConstantes.find(
      (c) => c.id == 'AsuSupervisorAsignado'
    );
    const asuAsigMatrizRiesgo = listConstantes.find(
      (c) => c.id == 'AsuAsigMatrizRiesgo'
    );

    const iar: IItemAddResult = await sp.web.lists
      .getByTitle('ListaAsignarSupervisor')
      .items.add({
        Title: asuSupervisorAsignado.valor1,
        CorreoSupervisor: supervisorSelected.email,
        AsuntoSupervisor: asuSupervisorAsignado.valor1,
        NombreSupervisor: supervisorSelected.nombres,
        Area: this.solicitudMatriz.area,
        CorreoSolicitante: this.solicitudMatriz.emailSupervisor,
        AsuntoSolicitante: asuAsigMatrizRiesgo.valor1,
        NombreSolicitante: this.solicitudMatriz.solicitante,
      });

    return iar;
  }

  showMessage(text: string) {
    const alertRef = this.dialog.open(AlertComponent, {
      width: '250px',
      data: { mensaje: text },
    });
  }

  //Tester para PowerAutomate
  async testNotificarSolicitudMatriz() {
    const iar: IItemAddResult = await sp.web.lists
      .getByTitle('ListaNotificarSolicitudMatriz')
      .items.add({
        Title: 'Title',
        Correo: 'xternal2@gruporocio.com',
        Asunto: 'Notificar Solicitud Matriz TEST',
        Area: 'Producción',
        Motivo: 'Motivo nuevo',
        Plazo: '2 días',
        Link:
          'https://gruporocio.sharepoint.com/sites/CatalogoGR/SitePages/Inicio.aspx',
      });

    console.log(iar);
  }

  async testGuardarAsignacion() {
    const iar: IItemAddResult = await sp.web.lists
      .getByTitle('ListaGuardarAsignacion')
      .items.add({
        Title: 'Title',
        AsuntoCalendario: 'Guardar Asignación TEST',
        FechaInicio: new Date(),
        FechaFin: new Date(),
        Tarea: 'Tarea',
        CorreoSupervisor: 'xternal2@gruporocio.com',
        AsuntoSupervisor: 'Asunto Supervisor TEST',
        NombresSupervisor: 'xternal',
        CorreoResponsable: 'xternal2@gruporocio.com',
        AsuntoResponsable: 'Asunto responsable TEST',
        NombresResponsable: 'xternal2',
      });

    console.log(iar);
  }

  async testGuardarEvidencia() {
    const iar: IItemAddResult = await sp.web.lists
      .getByTitle('ListaGuardarEvidencia')
      .items.add({
        Title: 'Title',
        Correo: 'xternal2@gruporocio.com',
        Asunto: 'Asunto Guardar Evidencia TEST',
        UserNameDestinatario: 'xternal',
        UserNameEvidencia: 'xternal2',
        Link:
          'ttps://gruporocio.sharepoint.com/sites/CatalogoGR/SitePages/Inicio.aspx',
      });

    console.log(iar);
  }

  async testGuardarVisita() {
    const iar: IItemAddResult = await sp.web.lists
      .getByTitle('ListaGuardarVisita')
      .items.add({
        Title: 'Title',
        FechaInicio: new Date(),
        FechaFin: new Date(),
        Correo: 'xternal2@gruporocio.com',
        Asunto: 'Asunto Guardar Visita TEST',
        Lugar: 'Lima',
      });

    console.log(iar);
  }

  async testSolicitarAprobacion() {
    const iar: IItemAddResult = await sp.web.lists
      .getByTitle('ListaSolicitarAprobacion')
      .items.add({
        Title: 'Title',
        Correo: 'xternal2@gruporocio.com',
        Asunto: 'Solicitar aprobación TEST',
        UserNameDestinatario: 'xternal',
        Matriz: '21000021',
        Plazo: '2 días',
        Link:
          'https://gruporocio.sharepoint.com/sites/CatalogoGR/SitePages/Inicio.aspx',
      });

    console.log(iar);
  }

  async testFinalizarAsignacion() {
    const iar: IItemAddResult = await sp.web.lists
      .getByTitle('ListaFinalizarAsignacion')
      .items.add({
        Title: 'Title',
        Correo: 'xternal2@gruporocio.com',
        Asunto: 'Finalizar aprobación TEST',
        UserNameDestinatario: 'xternal',
        Observaciones: 'Observación',
        Link:
          'https://gruporocio.sharepoint.com/sites/CatalogoGR/SitePages/Inicio.aspx',
      });

    console.log(iar);
  }
}
