import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VerParticipanteComponent } from './ver-participante.component';

describe('VerParticipanteComponent', () => {
  let component: VerParticipanteComponent;
  let fixture: ComponentFixture<VerParticipanteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VerParticipanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
