import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegistrarActividadComponent } from './registrar-actividad.component';

describe('RegistrarActividadComponent', () => {
  let component: RegistrarActividadComponent;
  let fixture: ComponentFixture<RegistrarActividadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarActividadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
