import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Puesto } from 'src/app/shared/models/fisics/Puesto';

export interface DialogData {
  nuevoPuesto: Puesto;
}

@Component({
  selector: 'app-agregar-puesto',
  templateUrl: './agregar-puesto.component.html',
  styleUrls: ['./agregar-puesto.component.scss'],
})
export class AgregarPuestoComponent implements OnInit {
  puestoNombre: string;
  idArea: number;
  usuarioRegistro: string;
  fechaRegistro: Date;
  usuarioModifica: string;
  fechaModifica: Date;
  
  puestoForm: FormControl = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<AgregarPuestoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}

  closeDialog() {
    this.data = null;
    this.dialogRef.close();
  }
  
  saveDialog() {
    this.data.nuevoPuesto.puesto = this.puestoForm.value;
    // this.data.nuevaActividad.actividad = this.formAddActividad.controls["descripcion"].value.trim();
    // this.data.nuevaActividad.idTipoActividad = this.formAddActividad.controls["tipoRiesgo"].value;
    // this.data.nuevaActividad.herramienta = this.herramientas.join(',');
    // this.data.nuevaActividad.equipo = this.equipos.join(',');
    // this.data.nuevaActividad.maquina = this.maquinas.join(',');
    // this.data.nuevaActividad.producto = this.productos.join(',');

    this.data.nuevoPuesto.fechaModifica = new Date();
    this.data.nuevoPuesto.fechaRegistro = new Date();
    // this.data.nuevaActividad.observacion = '';
    this.dialogRef.close(this.data);
  }
}
