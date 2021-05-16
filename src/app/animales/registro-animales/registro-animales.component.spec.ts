import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAnimalesComponent } from './registro-animales.component';

describe('RegistroAnimalesComponent', () => {
  let component: RegistroAnimalesComponent;
  let fixture: ComponentFixture<RegistroAnimalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroAnimalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroAnimalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
