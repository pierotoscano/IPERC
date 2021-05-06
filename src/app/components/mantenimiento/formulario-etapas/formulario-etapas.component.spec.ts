import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormularioEtapasComponent } from './formulario-etapas.component';

describe('FormularioEtapasComponent', () => {
  let component: FormularioEtapasComponent;
  let fixture: ComponentFixture<FormularioEtapasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioEtapasComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioEtapasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
