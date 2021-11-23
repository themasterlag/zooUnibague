import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearHabitatComponent } from './crear-habitat.component';

describe('CrearHabitatComponent', () => {
  let component: CrearHabitatComponent;
  let fixture: ComponentFixture<CrearHabitatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearHabitatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearHabitatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
