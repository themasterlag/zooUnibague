import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HabitatsComponent } from './habitats/habitats.component';
import { AnimalesComponent } from './animales/animales.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { TaquillaComponent } from './taquilla/taquilla.component';
import { ReportesComponent } from './reportes/reportes.component';
import { LoginComponent } from './login/login.component';
import { RegistroAnimalesComponent } from './animales/registro-animales/registro-animales.component';
import { ListarAnimalesComponent } from './animales/listar-animales/listar-animales.component';
import { EliminarAnimalesComponent } from './animales/eliminar-animales/eliminar-animales.component';


@NgModule({
  declarations: [
    AppComponent,
    HabitatsComponent,
    AnimalesComponent,
    UsuariosComponent,
    TaquillaComponent,
    ReportesComponent,
    LoginComponent,
    RegistroAnimalesComponent,
    ListarAnimalesComponent,
    EliminarAnimalesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
