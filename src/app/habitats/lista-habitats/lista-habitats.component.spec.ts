import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaHabitatsComponent } from './lista-habitats.component';

describe('ListaHabitatsComponent', () => {
  let component: ListaHabitatsComponent;
  let fixture: ComponentFixture<ListaHabitatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaHabitatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaHabitatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
