import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ISiteUserInfo } from '@pnp/sp/site-users/types';
import { UserService } from 'src/app/shared/services/user.service';

export type ParticipanteSelection = {
  Id: number;
  Title: string;
  Email: string;
  selected: boolean;
};

export interface DialogData {
  listParticipantesSelected: ISiteUserInfo[];
}

@Component({
  selector: 'app-asignar-participante',
  templateUrl: './asignar-participante.component.html',
  styleUrls: ['./asignar-participante.component.scss'],
})
export class AsignarParticipanteComponent implements OnInit {
  private _listParticipantes: ISiteUserInfo[];
  listParticipantesSelection: ParticipanteSelection[] = [];
  displayedColumns = ['Id', 'Title', 'Email', 'selected'];

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<AsignarParticipanteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this._listParticipantes = [];
  }

  ngOnInit(): void {
    //Buscar participantes
    this.userService.getAllSiteUsers().then((data) => {
      if (data.length > 0) {
        this._listParticipantes = data;
        data.forEach((item) => {
          this.listParticipantesSelection.push({
            Id: item.Id,
            Email: item.Email,
            Title: item.Title,
            selected: false,
          });
        });
      }
    });
  }

  addOrPutOffParticipante(idParticipante: number, condition: boolean) {
    if (condition) {
      const participanteToAdd = this._listParticipantes.find(
        (p) => p.Id == idParticipante
      );
      this.data.listParticipantesSelected.push(participanteToAdd);
    }
  }

  closeDialog() {
    this.data = null;
    this.dialogRef.close();
  }
}
