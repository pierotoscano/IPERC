import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarRiesgoComponent } from './agregar-riesgo.component';

describe('AgregarRiesgoComponent', () => {
  let component: AgregarRiesgoComponent;
  let fixture: ComponentFixture<AgregarRiesgoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarRiesgoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarRiesgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
