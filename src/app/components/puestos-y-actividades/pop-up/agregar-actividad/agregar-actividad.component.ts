import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { RiesgoService } from 'src/app/shared/services/riesgo.service';
import { TipoRiesgo } from 'src/app/shared/models/fisics/TipoRiesgo';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatrizActividad } from 'src/app/shared/models/fisics/MatrizActividad';
import { MatTable } from '@angular/material/table';

export interface DialogData {
  nuevaActividad: MatrizActividad;
}
// export interface Fruit {
//   name: string;
// }

@Component({
  selector: 'app-agregar-actividad',
  templateUrl: './agregar-actividad.component.html',
  styleUrls: ['./agregar-actividad.component.scss']
})
export class AgregarActividadComponent implements OnInit {

  // toppings = new FormControl();

  visible = true;
  selectable = true;
  removable = true;
  formAddActividad: FormGroup = new FormGroup({
    descripcion: new FormControl(''),
    tipoRiesgo: new FormControl('')
  });
  
  separatorKeysCodes: number[] = [ENTER, COMMA];
  maquinaCtrl = new FormControl();
  herramientaCtrl = new FormControl();
  equipoCtrl = new FormControl();
  productoCtrl = new FormControl();
  // filteredFruits: Observable<string[]>;
  // fruits: string[] = ['Lemon'];
  equipos: string[] = [];
  productos: string[] = [];
  maquinas: string[] = [];
  herramientas: string[] = [];

  riesgotipos: TipoRiesgo[] = [];
  
  // allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('maquinaInput') maquinaInput: ElementRef<HTMLInputElement>;
  @ViewChild('herramientaInput') herramientaInput: ElementRef<HTMLInputElement>;
  @ViewChild('equipoInput') equipoInput: ElementRef<HTMLInputElement>;
  @ViewChild('productoInput') productoInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  

  addActividad(){  
    if(this.formAddActividad.status === 'INVALID')
    {
      // display error in your form
    }else{
        console.log(this.formAddActividad)
        // this.dialog.closeAll(); // Close opened diaglo
      // do whatever you want to do with your data
    }
  }

  addHerramienta(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.herramientas.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
    this.herramientaCtrl.setValue(null);
  }
  removeHerramienta(fruit: string): void {
    const index = this.herramientas.indexOf(fruit);
    if (index >= 0) {
      this.herramientas.splice(index, 1);
    }
  }
  // selectedHerramienta(event: MatAutocompleteSelectedEvent): void {
  //   this.herramientas.push(event.option.viewValue);
  //   this.herramientaInput.nativeElement.value = '';
  //   this.herramientaCtrl.setValue(null);
  // }

  addEquipo(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.equipos.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
    this.equipoCtrl.setValue(null);
  }
  removeEquipo(fruit: string): void {
    const index = this.equipos.indexOf(fruit);
    if (index >= 0) {
      this.equipos.splice(index, 1);
    }
  }
  // selectedEquipo(event: MatAutocompleteSelectedEvent): void {
  //   this.equipos.push(event.option.viewValue);
  //   this.equipoInput.nativeElement.value = '';
  //   this.equipoCtrl.setValue(null);
  // }

  addMaquina(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.maquinas.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
    this.maquinaCtrl.setValue(null);
  }
  removeMaquina(maquina: string): void {
    const index = this.maquinas.indexOf(maquina);
    if (index >= 0) {
      this.maquinas.splice(index, 1);
    }
  }
  // selectedMaquina(event: MatAutocompleteSelectedEvent): void {
  //   this.maquinas.push(event.option.viewValue);
  //   this.maquinaInput.nativeElement.value = '';
  //   this.maquinaCtrl.setValue(null);
  // }

  addProducto(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.productos.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
    this.productoCtrl.setValue(null);
  }
  removeProducto(fruit: string): void {
    const index = this.productos.indexOf(fruit);
    if (index >= 0) {
      this.productos.splice(index, 1);
    }
  }
  // selectedProducto(event: MatAutocompleteSelectedEvent): void {
  //   this.productos.push(event.option.viewValue);
  //   this.productoInput.nativeElement.value = '';
  //   this.productoCtrl.setValue(null);
  // }


  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  // }
  
  // private _actividad: MatrizActividad;

  constructor(
    private riesgoService: RiesgoService,
    public dialogRef: MatDialogRef<AgregarActividadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {

    // this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
    //     startWith(null),
    //     map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  }

  ngOnInit(): void {
    // this.getHerramientas();
    this.getTipoRiesgos();
    // this.data.nuevaActividad = new MatrizActividad(0);
  }
  
  getTipoRiesgos():void{
    this.riesgoService.obtenerTipoRiesgo().then((riesgotipos) => {
      this.riesgotipos = riesgotipos ? riesgotipos : [];
    });
  }
  
  closeDialog() {
    this.data = null;
    this.dialogRef.close();
  }
  
  saveDialog() {
    this.data.nuevaActividad.actividad = this.formAddActividad.controls["descripcion"].value.trim();
    this.data.nuevaActividad.idTipoActividad = this.formAddActividad.controls["tipoRiesgo"].value;
    this.data.nuevaActividad.herramienta = this.herramientas.join(',');
    this.data.nuevaActividad.equipo = this.equipos.join(',');
    this.data.nuevaActividad.maquina = this.maquinas.join(',');
    this.data.nuevaActividad.producto = this.productos.join(',');

    this.data.nuevaActividad.fechaModifica = new Date();
    this.data.nuevaActividad.fechaRegistro = new Date();
    this.data.nuevaActividad.observacion = '';
    this.dialogRef.close(this.data);
  }

}
