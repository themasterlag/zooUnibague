import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HabitatsComponent } from './habitats/habitats.component';
import { AnimalesComponent } from './animales/animales.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { TaquillaComponent } from './taquilla/taquilla.component';
import { ReportesComponent } from './reportes/reportes.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { VentaComponent } from './taquilla/venta/venta.component';
import { DevolucionComponent } from './taquilla/devolucion/devolucion.component';
import { RegistroAnimalesComponent } from './animales/registro-animales/registro-animales.component';
import { ListarAnimalesComponent } from './animales/listar-animales/listar-animales.component';
import { EliminarAnimalesComponent } from './animales/eliminar-animales/eliminar-animales.component';
import { RegistrarPersonasComponent } from './usuarios/registrar-personas/registrar-personas.component';
import { TicketsComponent } from './tickets/tickets.component';
import { FormularioTicketComponent } from './tickets/formulario-ticket/formulario-ticket.component';
import { ListaTicketComponent } from './tickets/lista-ticket/lista-ticket.component';
import { BuscarAnimalesComponent } from './animales/buscar-animales/buscar-animales.component';


@NgModule({
  declarations: [
    AppComponent,
    HabitatsComponent,
    AnimalesComponent,
    UsuariosComponent,
    TaquillaComponent,
    ReportesComponent,
    LoginComponent,
    MenuComponent,
    VentaComponent,
    DevolucionComponent,
    RegistroAnimalesComponent,
    ListarAnimalesComponent,
    EliminarAnimalesComponent,
    RegistrarPersonasComponent,
    TicketsComponent,
    FormularioTicketComponent,
    ListaTicketComponent,
    BuscarAnimalesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
