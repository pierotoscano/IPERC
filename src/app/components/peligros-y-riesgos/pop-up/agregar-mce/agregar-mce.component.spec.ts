import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarMceComponent } from './agregar-mce.component';

describe('AgregarMceComponent', () => {
  let component: AgregarMceComponent;
  let fixture: ComponentFixture<AgregarMceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarMceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarMceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
