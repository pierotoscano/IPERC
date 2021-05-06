import {
  Component,
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
  @Input() matriz: Matriz;
  @Input() usuario: Usuario;
  @Output() solicitudMatrizEmitter = new EventEmitter<SolicitudMatriz>();
  @Output() matrizEmitter = new EventEmitter<Matriz>();
  formDatosAsignarSupervisor: FormGroup;
  listProcesos: Proceso[] = [];
  listSupervisores: Usuario[] = [];
  matcher: MyErrorStateMatcher;
  idMatrizSaved: number;
  matrizSaved: Matriz;
  matrizExists: boolean = false;

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

  ngOnInit(): void {
    this.formDatosAsignarSupervisor = this.formBuilder.group({
      proceso: new FormControl('', [Validators.required]),
      supervisor: new FormControl('', [Validators.required]),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.matriz.currentValue.id !== null) {
      this.matrizExists = true;
      this.formDatosAsignarSupervisor.controls['supervisor'].setValue(
        this.matriz.idSupervisor
      );
    }
    if (changes.solicitudMatriz.currentValue.id !== null) {
      // console.log(changes.solicitudMatriz.currentValue);
      // console.log(this.solicitudMatriz);
      this.asignarSupervisor();
      this.setProceso();
    }
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

  asignarSupervisor() {
    if (this.formDatosAsignarSupervisor.valid) {
      //Emplear la solicitud desde el componente padre
      const idSupervisorSelected = this.formDatosAsignarSupervisor.value
        .supervisor;
      const idProcesoSelected = this.formDatosAsignarSupervisor.value.proceso;

      let supervisorSelected = this.listSupervisores.find(
        (s) => s.idUsuario == idSupervisorSelected
      );
      let procesoSelected = this.listProcesos.find(
        (p) => p.idProceso == idProcesoSelected
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
                //Enviar email y evento para el solicitante y supervisor
                /*
                let emailSolicitante: IEmailProperties = {
                  To: ['xternal@gruporocio.onmicrosoft.com'],
                  Subject: `Supervisor asignado`,
                  Body: `<p style="margin: 0; font-size: 13px;">Estimado ${this.solicitudMatriz.solicitante}</p>
                  <br>
                  <p style="margin: 0; font-size: 13px;">Se le ha asignado el supervisor ${supervisorSelected.apellidoPaterno} ${supervisorSelected.apellidoMaterno}, ${supervisorSelected.nombres}.</p>
                  <br>
                  <p style="margin: 0; font-size: 13px;">Por favor comuníquese con él (ella) para realizar la coordinación de visita a la planta.</p>`,
                  AdditionalHeaders: {
                    'content-type': 'text/html',
                  },
                };

                this.masterService.enviarCorreo(emailSolicitante).then(
                  (resp) => console.log('Correo enviado al solicitante'),
                  (err) =>
                    console.error('Error al enviar correo al solicitante')
                );

                //Enviar email para el supervisor asignado
                let emailSupervisor: IEmailProperties = {
                  To: [supervisorSelected.email],
                  Subject: `Asignación Matriz Riesgo`,
                  Body: `<p style="margin: 0; font-size: 13px;">Estimado ${supervisorSelected.apellidoPaterno} ${supervisorSelected.apellidoMaterno}, ${supervisorSelected.nombres}</p>
                  <br>
                  <p style="margin: 0; font-size: 13px;">Ha sido asignado para ejecutar el proceso de ${procesoSelected.proceso} .</p>`,
                };

                this.masterService.enviarCorreo(emailSupervisor).then(
                  (resp) => console.log('Correo enviado al supervisor'),
                  (err) => console.error('Error al enviar correo al supervisor')
                );
                */

                //Obtener la solicitud actualizada
                /*
                this.solicitudMatrizService
                  .obtenerSolicitudMatriz()
                  .then((solicitudesMatriz) => {
                    let listSolicitudesMatriz = solicitudesMatriz
                      ? solicitudesMatriz
                      : [];
                    listSolicitudesMatriz.forEach((solicitudMatriz) => {
                      if (solicitudMatriz.id == this.solicitudMatriz.id) {
                        this.solicitudMatriz = solicitudMatriz;
                        this.solicitudMatrizEmitter.emit(this.solicitudMatriz);
                      }
                    });
                  });
                  */

                //Obtener la matriz registrada
                /*
                this.matrizService.obtenerMatriz().then((matrices) => {
                  let listMatrices = matrices ? matrices : [];
                  listMatrices.forEach((matriz) => {
                    if (matriz.id == this.idMatrizSaved.toString()) {
                      this.matrizSaved = matriz;
                      return false;
                    }
                  });
                });*/
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
