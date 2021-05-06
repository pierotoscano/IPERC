import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormularioParametrosComponent } from './formulario-parametros.component';

describe('FormularioParametrosComponent', () => {
  let component: FormularioParametrosComponent;
  let fixture: ComponentFixture<FormularioParametrosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioParametrosComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioParametrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
