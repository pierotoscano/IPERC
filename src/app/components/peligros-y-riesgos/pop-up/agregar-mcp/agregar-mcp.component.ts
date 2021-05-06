import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MCPRiesgo } from 'src/app/shared/models/fisics/MCPRiesgo';
import { Responsable } from 'src/app/shared/models/fisics/Responsable';
import { TipoMC } from 'src/app/shared/models/fisics/TipoMC';
import { MCService } from 'src/app/shared/services/mc.service';
import { ResponsableService } from 'src/app/shared/services/responsable.service';

export interface DialogData {
  mcpRiesgo: MCPRiesgo;
}

@Component({
  selector: 'app-agregar-mcp',
  templateUrl: './agregar-mcp.component.html',
  styleUrls: ['./agregar-mcp.component.scss']
})
export class AgregarMcpComponent implements OnInit {
  formAddMCP: FormGroup;
  listResponsables: Responsable[];
  listTiposMC: TipoMC[];

  constructor(
    private formBuilder: FormBuilder,
    private responsableService: ResponsableService,
    public dialogRef: MatDialogRef<AgregarMcpComponent>,
    private mcService: MCService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    data.mcpRiesgo = null;
   }

  ngOnInit(): void {
    this.formAddMCP = this.formBuilder.group({
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

  addMCP() {
    if (this.formAddMCP.valid) {
      const descripcion = this.formAddMCP.value.descripcion;
      const idTipo = this.formAddMCP.value.tipo as number;
      const idResponsable = this.formAddMCP.value.responsable as number;
      const tipo = this.listTiposMC.find((tipoMC) => tipoMC.idTipoMC == idTipo);
      const responsable = this.listResponsables.find(
        (responsable) => responsable.idresponsable == idResponsable
      );

      let mcpRiesgo: MCPRiesgo = new MCPRiesgo();
      mcpRiesgo.mC = descripcion;
      mcpRiesgo.idTipo = idTipo.toString();
      mcpRiesgo.idResponsable = idResponsable;
      mcpRiesgo.tipoMC = tipo.tipoMC;
      mcpRiesgo.Responsable = responsable.responsable;
      mcpRiesgo.fechaModifica = new Date();
      mcpRiesgo.fechaRegistro = new Date();

      this.data.mcpRiesgo = mcpRiesgo;
    }
  }
}
