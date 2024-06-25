import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearComerciantesComponent } from './crear-comerciantes.component';

describe('CrearComerciantesComponent', () => {
  let component: CrearComerciantesComponent;
  let fixture: ComponentFixture<CrearComerciantesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearComerciantesComponent]
    });
    fixture = TestBed.createComponent(CrearComerciantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
