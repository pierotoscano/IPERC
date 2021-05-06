import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPeligroComponent } from './agregar-peligro.component';

describe('AgregarPeligroComponent', () => {
  let component: AgregarPeligroComponent;
  let fixture: ComponentFixture<AgregarPeligroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarPeligroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarPeligroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
