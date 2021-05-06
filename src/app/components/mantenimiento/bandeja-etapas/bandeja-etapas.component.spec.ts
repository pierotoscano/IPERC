import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BandejaEtapasComponent } from './bandeja-etapas.component';

describe('BandejaEtapasComponent', () => {
  let component: BandejaEtapasComponent;
  let fixture: ComponentFixture<BandejaEtapasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BandejaEtapasComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandejaEtapasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
