import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarMcpComponent } from './agregar-mcp.component';

describe('AgregarMcpComponent', () => {
  let component: AgregarMcpComponent;
  let fixture: ComponentFixture<AgregarMcpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarMcpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarMcpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
