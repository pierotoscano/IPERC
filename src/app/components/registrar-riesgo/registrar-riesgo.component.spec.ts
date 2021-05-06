import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegistrarRiesgoComponent } from './registrar-riesgo.component';

describe('RegistrarRiesgoComponent', () => {
  let component: RegistrarRiesgoComponent;
  let fixture: ComponentFixture<RegistrarRiesgoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarRiesgoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarRiesgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
