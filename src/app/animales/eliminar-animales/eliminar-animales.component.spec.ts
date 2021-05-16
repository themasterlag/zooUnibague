import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarAnimalesComponent } from './eliminar-animales.component';

describe('EliminarAnimalesComponent', () => {
  let component: EliminarAnimalesComponent;
  let fixture: ComponentFixture<EliminarAnimalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarAnimalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarAnimalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
