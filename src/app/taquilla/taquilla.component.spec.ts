import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaquillaComponent } from './taquilla.component';

describe('TaquillaComponent', () => {
  let component: TaquillaComponent;
  let fixture: ComponentFixture<TaquillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaquillaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaquillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
