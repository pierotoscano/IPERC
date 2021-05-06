import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeligrosYRiesgosComponent } from './peligros-y-riesgos.component';

describe('PeligrosYRiesgosComponent', () => {
  let component: PeligrosYRiesgosComponent;
  let fixture: ComponentFixture<PeligrosYRiesgosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeligrosYRiesgosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeligrosYRiesgosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
