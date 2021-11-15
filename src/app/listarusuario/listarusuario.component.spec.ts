import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarusuarioComponent } from './listarusuario.component';

describe('ListarusuarioComponent', () => {
  let component: ListarusuarioComponent;
  let fixture: ComponentFixture<ListarusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarusuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
