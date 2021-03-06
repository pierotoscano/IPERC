import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BandejaParametrosComponent } from './bandeja-parametros.component';

describe('BandejaParametrosComponent', () => {
  let component: BandejaParametrosComponent;
  let fixture: ComponentFixture<BandejaParametrosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BandejaParametrosComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandejaParametrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
