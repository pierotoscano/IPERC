import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuestosYActividadesComponent } from './puestos-y-actividades.component';

describe('PuestosYActividadesComponent', () => {
  let component: PuestosYActividadesComponent;
  let fixture: ComponentFixture<PuestosYActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuestosYActividadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuestosYActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
