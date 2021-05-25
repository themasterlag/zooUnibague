import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTicketComponent } from './lista-ticket.component';

describe('ListaTicketComponent', () => {
  let component: ListaTicketComponent;
  let fixture: ComponentFixture<ListaTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
