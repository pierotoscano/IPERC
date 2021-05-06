import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeligroMatriz } from 'src/app/shared/models/fisics/PeligroMatriz';

export interface DialogData {
  peligroMatriz: PeligroMatriz;
}

@Component({
  selector: 'app-agregar-peligro',
  templateUrl: './agregar-peligro.component.html',
  styleUrls: ['./agregar-peligro.component.scss'],
})
export class AgregarPeligroComponent implements OnInit {
  peligroMatriz: PeligroMatriz;
  formAddPeligro: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder
  ) {
    this.data.peligroMatriz = new PeligroMatriz();
    this.data.peligroMatriz.idPeligro = 0;
  }

  ngOnInit(): void {
    this.formAddPeligro = this.formBuilder.group({
      peligroData: new FormControl('', [Validators.required]),
    });
  }

  addNewPeligro() {
    if (this.formAddPeligro.valid) {
      this.data.peligroMatriz.peligro = this.formAddPeligro.value.peligroData;
      // this.data.peligroMatriz.fechaModifica = new Date();
      this.data.peligroMatriz.fechaModifica = new Date();
      this.data.peligroMatriz.fechaRegistro = new Date();
    }
  }
}
