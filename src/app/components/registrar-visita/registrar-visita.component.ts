import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ISiteUserInfo } from '@pnp/sp/site-users/types';
import { Funciones } from 'src/app/shared/funciones';
import { SolicitudMatriz } from 'src/app/shared/models/fisics/SolicitudMatriz';
import { SolicitudMatrizService } from 'src/app/shared/services/solicitudmatriz.service';
import { ParticipanteService } from 'src/app/shared/services/participante.service';
import { Visita } from '../../shared/models/fisics/Visita';
import { VisitaService } from '../../shared/services/visita.service';
import { ConstanteService } from 'src/app/shared/services/constante.service';
import { AsignarParticipanteComponent } from './asignar-participante/asignar-participante.component';
import { VerParticipanteComponent } from './ver-participante/ver-participante.component';
import { ParticipanteValue } from 'src/app/shared/Types';
import { Participante } from 'src/app/shared/models/fisics/Participante';
import { ParticipanteData } from 'src/app/shared/models/fisics/ParticipanteData';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/shared/models/fisics/Usuario';
import { AlertComponent } from '../alert/alert.component';
import { Variables } from 'src/app/shared/variables';

import { sp } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import { IItemAddResult } from '@pnp/sp/items';
import { Constante } from 'src/app/shared/models/fisics/Constante';
import { BehaviorSubject } from 'rxjs';

export type VisitaDetails = {
  visita: Visita;
  participantes: ISiteUserInfo[] | ParticipanteData[];
};

export type SolicitudData = {
  solicitud: SolicitudMatriz;
  visitas: MatTableDataSource<VisitaDetails>;
};
// visitas: VisitaDetails[];

@Component({
  selector: 'app-registrar-visita',
  templateUrl: './registrar-visita.component.html',
  styleUrls: ['./registrar-visita.component.scss'],
})
export class RegistrarVisitaComponent implements OnInit {
  @Input() solicitudMatriz: SolicitudMatriz;
  @Input() usuario: Usuario;
  solicitudData: SolicitudData;

  formAddVisita: FormGroup;
  fechaInicioControl: FormControl;
  fechaFinControl: FormControl;

  verParticipantesToSave: boolean = true;

  listVisitas: Visita[] = [];
  displayedColumns: string[] = [
    'opcion',
    'position',
    'idVisita',
    'inicioVisita',
    'finVisita',
    'participantes',
  ];

  @ViewChild(MatTable) tblSolicitudVisitas: MatTable<VisitaDetails>;

  listParticipantes = [];
  idSolicitudMatrizSelected: string;

  private _etapa = new BehaviorSubject<number>(null);
  @Input()
  set etapa(value){
    this._etapa.next(value);
  }
  get etapa(){
    return this._etapa.getValue();
  }

  constructor(
    private formBuilder: FormBuilder,
    private participanteService: ParticipanteService,
    private visitaService: VisitaService,
    private constanteService: ConstanteService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {
    //Obtener los datos de la solicitud
    this.solicitudData = {
      solicitud: this.solicitudMatriz,
      visitas: new MatTableDataSource<VisitaDetails>(),
      // visitas: []
    };
    this.fechaInicioControl = new FormControl('', [Validators.required]);
    this.fechaFinControl = new FormControl('', [Validators.required]);

    this.idSolicitudMatrizSelected = route.snapshot.params['idSolicitudMatriz'];
  }

  ngOnInit(): void {
    this.formAddVisita = this.formBuilder.group({
      fechaInicio: this.fechaInicioControl,
      fechaFin: this.fechaFinControl,
    });

    if (this.idSolicitudMatrizSelected !== null) {
      this.visitaService
        .obtenerVisita(this.idSolicitudMatrizSelected)
        .then((visitas) => {
          let visitasAux = visitas ? visitas : [];
          let visitaDetailsAux: VisitaDetails[] = [];
          if (visitasAux.length > 0) {
            visitasAux.forEach((element) => {
              visitaDetailsAux.push({
                visita: element,
                participantes: [],
              });
            });

            visitaDetailsAux.forEach((visitaDetail) => {
              this.participanteService
                .obtenerParticipantes(visitaDetail.visita.idVisita)
                .then((participantes) => {
                  let listParticipantes = participantes ? participantes : [];
                  visitaDetail.participantes = listParticipantes;
                })
                .then(() => {
                  this.verParticipantesToSave = false;
                  this.solicitudData.visitas = new MatTableDataSource<VisitaDetails>(
                    visitaDetailsAux
                  );
                });
            });
          } else {
            this.solicitudData.visitas = new MatTableDataSource<VisitaDetails>(
              visitaDetailsAux
            );
          }
        });
    }
  }

  addVisitaToSolicitud(): void {
    const fechaInicio: Date = this.formAddVisita.value.fechaInicio;
    const fechaFin: Date = this.formAddVisita.value.fechaFin;

    if (this.formAddVisita.valid) {
      let visitaData: Visita = new Visita();
      visitaData.idVisita = '';
      visitaData.idSolicitudMatriz = this.solicitudMatriz.id;
      visitaData.idArea = this.solicitudMatriz.idArea;
      visitaData.idCentro = this.solicitudMatriz.idCentro;
      visitaData.inicioVisita = fechaInicio;
      visitaData.finVisita = fechaFin;
      visitaData.estado = 'VC';
      visitaData.usuarioRegistro = this.usuario.idUsuario;
      visitaData.fechaRegistro = new Date();
      visitaData.usuarioModifica = this.usuario.idUsuario;
      visitaData.fechaModifica = new Date();

      let visita: VisitaDetails = {
        visita: visitaData,
        participantes: [],
      };

      this.solicitudData.visitas.data.push(visita);
      this.tblSolicitudVisitas.renderRows();
      this.tblSolicitudVisitas.renderRows();
    }
  }

  removeVisitaToSolicitud(position): void {
    this.solicitudData.visitas.data.splice(position, 1);
    this.tblSolicitudVisitas.renderRows();
  }

  openAsignarParticipante(index): void {
    const dialogRef = this.dialog.open(AsignarParticipanteComponent, {
      autoFocus: false,
      data: { listParticipantesSelected: [] },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != null) {
        this.solicitudData.visitas.data[index].participantes =
          result.listParticipantesSelected;
      }
    });
  }

  openVerParticipante(index): void {
    const listParticipantes = this.solicitudData.visitas.data[index]
      .participantes;
    const dialogRef = this.dialog.open(VerParticipanteComponent, {
      autoFocus: false,
      data: { listParticipantes, dialogForSave: this.verParticipantesToSave },
    });
  }

  formatDate(date: Date): string {
    return Funciones.dateTimeFormatDDMMYYYYHHMM(date);
  }

  async grabarSolicitud() {
    let saveState = true;

    const constantes = await this.constanteService.obtenerConstante();
    let listConstantes = constantes ? constantes : [];

    const asuVisitaCoordinada = listConstantes.find(
      (c) => c.id == 'AsuVisitaCoordinada'
    );

    const listResults = await Promise.all(
      this.solicitudData.visitas.data.map(async (visitaDetails) => {
        try {
          const idVisitaSaved = await this.visitaService.guardarVisita(
            visitaDetails.visita
          );

          if (idVisitaSaved && idVisitaSaved > 0) {
            const resultGuardarParticipantes = await this.participanteService.guardarListParticipantes(
              idVisitaSaved.toString(),
              visitaDetails.participantes as ISiteUserInfo[]
            );

            if (resultGuardarParticipantes == 0) {
              const fechaInicio = visitaDetails.visita.inicioVisita;
              const fechaFin = visitaDetails.visita.finVisita;

              //Enviar correo a participantes:
              let stateFlujo: boolean = true;
              const listParticipantes: ISiteUserInfo[] = [];
              visitaDetails.participantes.forEach((participante) => {
                if (this.isISiteUserInfo(participante)) {
                  listParticipantes.push(participante);
                }
              });

              const listResultsGuardarVisitaSP = await Promise.all(
                listParticipantes.map(async (participante) => {
                  const resultGuardarVisitaSP = await this.guardarVisitaSP(
                    asuVisitaCoordinada,
                    fechaInicio,
                    fechaFin,
                    participante
                  );

                  return resultGuardarVisitaSP ? resultGuardarVisitaSP : null;
                })
              );

              listResultsGuardarVisitaSP.every((result) => {
                if (!result) {
                  stateFlujo = false;
                  return false;
                }
              });

              if (stateFlujo) {
                return idVisitaSaved;
              } else {
                return 0;
              }
            } else {
              return 0;
            }
          } else {
            return 0;
          }
        } catch {
          return -1;
        }
      })
    );

    listResults.every((r) => {
      if (r <= 0) {
        saveState = false;
        return false;
      }
    });

    if (saveState) {
      this.showMessage('??xito al guardar la visita y sus participantes.');
      this.router.navigate([Variables.path.bandejaSolicitudMaterial]);
    } else {
      this.showMessage(
        'Ocurri?? un error al guardar la visita y sus participantes.'
      );
    }
  }

  async guardarVisitaSP(
    asuVisitaCoordinada: Constante,
    fechaInicio: Date,
    fechaFin: Date,
    participante: ISiteUserInfo
  ) {
    const iar = await sp.web.lists
      .getByTitle('ListaGuardarVisita')
      .items.add({
        Title: asuVisitaCoordinada.valor1,
        FechaInicio: fechaInicio,
        FechaFin: fechaFin,
        Correo: participante.Email,
        Asunto: asuVisitaCoordinada.valor1,
        Lugar: this.solicitudMatriz.centro,
      })
      .catch((error) => {
        console.error('Error: ' + error);
      });

    return iar;
  }

  showMessage(text: string) {
    const alertRef = this.dialog.open(AlertComponent, {
      width: '250px',
      data: { mensaje: text },
    });
  }

  isISiteUserInfo(
    participante: ISiteUserInfo | ParticipanteData
  ): participante is ISiteUserInfo {
    return (participante as ISiteUserInfo).Title != undefined;
  }
}
