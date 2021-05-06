import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BandejaSolicitudComponent } from './bandeja-solicitud.component';

describe('BandejaSolicitudComponent', () => {
  let component: BandejaSolicitudComponent;
  let fixture: ComponentFixture<BandejaSolicitudComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BandejaSolicitudComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandejaSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
