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

  asignarSupervisor() {
    if (this.formDatosAsignarSupervisor.valid) {
      //Emplear la solicitud desde el componente padre
      const idSupervisorSelected = this.formDatosAsignarSupervisor.value
        .supervisor;

      let supervisorSelected = this.listSupervisores.find(
        (s) => s.idUsuario == idSupervisorSelected
      );

      //Asignar supervisor
      this.supervisorService
        .asignarSupervisor(
          supervisorSelected,
          this.usuario,
          this.solicitudMatriz
        )
        .then((data) => {
          if (data && data > 0) {
            //Generar matriz y guardar
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

            this.matrizService.generarMatriz(matriz).then((data) => {
              if (data && data > 0) {
                this.idMatrizSaved = data;
                this.showMessage(
                  'Éxito al asignar supervisor y generar matriz'
                );
                this.route.navigate([Variables.path.bandejaSolicitudMaterial]);
              }
            });
          }
        });
    }
  }

  async registrarCorreo() {
    //ListaCorreosCalendario
    // add an item to the list const iar:
    let today = new Date();
    /*
    Formato de id de calendario:
    aaaammdddhhmmss-idSupervisor
    */
    /*
    const idSupervisorSelected = this.formDatosAsignarSupervisor.value
      .supervisor;
    let supervisorSelected = this.listSupervisores.find(
      (s) => s.idUsuario == idSupervisorSelected
    );

    const dia = today.getDate() >= 10 ? today.getDate() : `0${today.getDate()}`;
    const mes =
      today.getMonth() + 1 >= 10
        ? today.getMonth() + 1
        : `0${today.getMonth() + 1}`;
    const anho = today.getFullYear();
    const hora =
      today.getHours() >= 10 ? today.getHours() : `0${today.getHours()}`;
    const minutos =
      today.getMinutes() >= 10 ? today.getMinutes() : `0${today.getMinutes()}`;
    const segundos =
      today.getSeconds() >= 10 ? today.getSeconds() : `0${today.getSeconds()}`;
    const idCalendario = `${anho}${mes}${dia}${hora}${minutos}${segundos}${supervisorSelected.idUsuario}`;
    const nombresApellidosSupervisor = `${supervisorSelected.apellidoPaterno} ${supervisorSelected.apellidoMaterno}, ${supervisorSelected.nombres}`;
    */

    const iar: IItemAddResult = await sp.web.lists
      .getByTitle('ListaCorreosCalendario')
      .items.add({
        Title: 'Title',
        IdCalendario: 'idCalendario', // idCalendario
        CorreoSupervisor: 'xternal2@gruporocio.com', // supervisorSelected.email
        FechaInicio: new Date(),
        FechaFin: new Date(),
        NombresApellidosSupervisor: 'Piero Toscano', // nombresApellidosSupervisor
        AsuntoSupervisor: 'Asignación de supervisor',
        Area: 'Producción',
        CorreoSolicitante: 'xternal@gruporocio.com', // Obtener email del solicitante
        AsuntoSolicitante: 'Supervisor Asignado',
        NombresApellidosSolicitante: 'Juan Perez',
      });
  }

  showMessage(text: string) {
    const alertRef = this.dialog.open(AlertComponent, {
      width: '250px',
      data: { mensaje: text },
    });
  }
}
