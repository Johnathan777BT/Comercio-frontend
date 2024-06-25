import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerEstablecimientoComponent } from './container-establecimiento.component';

describe('ContainerEstablecimientoComponent', () => {
  let component: ContainerEstablecimientoComponent;
  let fixture: ComponentFixture<ContainerEstablecimientoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerEstablecimientoComponent]
    });
    fixture = TestBed.createComponent(ContainerEstablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
