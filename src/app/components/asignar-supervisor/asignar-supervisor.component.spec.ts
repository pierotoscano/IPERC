import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AsignarSupervisorComponent } from './asignar-supervisor.component';

describe('AsignarSupervisorComponent', () => {
  let component: AsignarSupervisorComponent;
  let fixture: ComponentFixture<AsignarSupervisorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarSupervisorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
