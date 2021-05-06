import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ISiteUserInfo } from '@pnp/sp/site-users/types';
import { ParticipanteData } from 'src/app/shared/models/fisics/ParticipanteData';

export type DialogData = {
  listParticipantes: ParticipanteData[] | ISiteUserInfo[];
  dialogGuardarVisita: boolean;
};

@Component({
  selector: 'app-ver-participante',
  templateUrl: './ver-participante.component.html',
  styleUrls: ['./ver-participante.component.scss'],
})
export class VerParticipanteComponent implements OnInit {
  dialogGuardarVisita: boolean;
  displayedColumns = ['Id', 'Title', 'Email'];
  displayedColumnsCheck = ['idParticipante', 'usuario', 'email'];

  constructor(
    public dialogRef: MatDialogRef<VerParticipanteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.dialogGuardarVisita = data.dialogGuardarVisita;
  }

  ngOnInit(): void {}

  closeDialog() {
    this.data = null;
    this.dialogRef.close();
  }
}
