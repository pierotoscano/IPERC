import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MCERiesgo } from 'src/app/shared/models/fisics/MCERiesgo';
import { Responsable } from 'src/app/shared/models/fisics/Responsable';
import { ResponsableService } from 'src/app/shared/services/responsable.service';
import { MCService } from 'src/app/shared/services/mc.service';
import { TipoMC } from 'src/app/shared/models/fisics/TipoMC';

export interface DialogData {
  mceRiesgo: MCERiesgo;
}

@Component({
  selector: 'app-agregar-mce',
  templateUrl: './agregar-mce.component.html',
  styleUrls: ['./agregar-mce.component.scss'],
})
export class AgregarMceComponent implements OnInit {
  formAddMCE: FormGroup;
  listResponsables: Responsable[];
  listTiposMC: TipoMC[];

  constructor(
    private formBuilder: FormBuilder,
    private responsableService: ResponsableService,
    private mcService: MCService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    data.mceRiesgo = null;
  }

  ngOnInit(): void {
    this.formAddMCE = this.formBuilder.group({
      descripcion: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required]),
      responsable: new FormControl('', [Validators.required]),
    });

    this.responsableService.obtenerRespnsable().then((responsables) => {
      this.listResponsables = responsables ? responsables : [];
    });

    this.mcService.obtenerTipoMC().then((tiposMC) => {
      this.listTiposMC = tiposMC ? tiposMC : [];
    });
  }

  addMCE() {
    if (this.formAddMCE.valid) {
      const descripcion = this.formAddMCE.value.descripcion;
      const idTipo = this.formAddMCE.value.tipo as number;
      const idResponsable = this.formAddMCE.value.responsable as number;
      const tipo = this.listTiposMC.find((tipoMC) => tipoMC.idTipoMC == idTipo);
      const responsable = this.listResponsables.find(
        (responsable) => responsable.idresponsable == idResponsable
      );

      let mceRiesgo: MCERiesgo = new MCERiesgo();
      mceRiesgo.mC = descripcion;
      mceRiesgo.idTipo = idTipo.toString();
      mceRiesgo.idResponsable = idResponsable;
      mceRiesgo.tipoMC = tipo.tipoMC;
      mceRiesgo.Responsable = responsable.responsable;
      mceRiesgo.fechaModifica = new Date();
      mceRiesgo.fechaRegistro = new Date();

      this.data.mceRiesgo = mceRiesgo;
    }
  }
}
