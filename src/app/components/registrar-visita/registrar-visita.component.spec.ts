import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegistrarVisitaComponent } from './registrar-visita.component';

describe('RegistrarVisitaComponent', () => {
  let component: RegistrarVisitaComponent;
  let fixture: ComponentFixture<RegistrarVisitaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarVisitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
