import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitatsComponent } from './habitats.component';

describe('HabitatsComponent', () => {
  let component: HabitatsComponent;
  let fixture: ComponentFixture<HabitatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HabitatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
