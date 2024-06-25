import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEstablecimientosComponent } from './crear-establecimientos.component';

describe('CrearEstablecimientosComponent', () => {
  let component: CrearEstablecimientosComponent;
  let fixture: ComponentFixture<CrearEstablecimientosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearEstablecimientosComponent]
    });
    fixture = TestBed.createComponent(CrearEstablecimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
