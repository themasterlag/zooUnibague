import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

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
    DevolucionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
