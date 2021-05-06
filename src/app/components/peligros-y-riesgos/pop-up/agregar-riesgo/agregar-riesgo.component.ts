import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListaRiesgoMatriz } from 'src/app/shared/models/fisics/ListaRiesgoMatriz';
import { RiesgoMatriz } from 'src/app/shared/models/fisics/RiesgoMatriz';

export interface DialogData {
  riesgoMatriz: ListaRiesgoMatriz;
}

@Component({
  selector: 'app-agregar-riesgo',
  templateUrl: './agregar-riesgo.component.html',
  styleUrls: ['./agregar-riesgo.component.scss'],
})
export class AgregarRiesgoComponent implements OnInit {
  riesgoMatriz: ListaRiesgoMatriz;
  formAddRiesgo: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder
  ) {
    this.data.riesgoMatriz = new ListaRiesgoMatriz();
    this.data.riesgoMatriz.idRiesgo = 0;
  }

  ngOnInit(): void {
    this.formAddRiesgo = this.formBuilder.group({
      riesgoData: new FormControl('', [Validators.required]),
    });
  }

  addNewRiesgo() {
    if (this.formAddRiesgo.valid) {
      this.data.riesgoMatriz.riesgo = this.formAddRiesgo.value.riesgoData;
      this.data.riesgoMatriz.fechaModifica = new Date();
      this.data.riesgoMatriz.fechaRegistro = new Date();
    }
  }
}
