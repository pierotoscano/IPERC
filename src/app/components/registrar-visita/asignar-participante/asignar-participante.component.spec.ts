import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AsignarParticipanteComponent } from './asignar-participante.component';

describe('AsignarParticipanteComponent', () => {
  let component: AsignarParticipanteComponent;
  let fixture: ComponentFixture<AsignarParticipanteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarParticipanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
