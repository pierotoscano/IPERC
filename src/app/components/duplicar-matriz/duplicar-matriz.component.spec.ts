import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicarMatrizComponent } from './duplicar-matriz.component';

describe('DuplicarMatrizComponent', () => {
  let component: DuplicarMatrizComponent;
  let fixture: ComponentFixture<DuplicarMatrizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuplicarMatrizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicarMatrizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
