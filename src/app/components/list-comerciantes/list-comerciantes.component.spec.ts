import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComerciantesComponent } from './list-comerciantes.component';

describe('ListComerciantesComponent', () => {
  let component: ListComerciantesComponent;
  let fixture: ComponentFixture<ListComerciantesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListComerciantesComponent]
    });
    fixture = TestBed.createComponent(ListComerciantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
