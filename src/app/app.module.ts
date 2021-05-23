import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { CrearRolesComponent } from './usuarios/crear-roles/crear-roles.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { ModificarUsuarioComponent } from './usuarios/modificar-usuario/modificar-usuario.component';
import { AsignarRolComponent } from './usuarios/asignar-rol/asignar-rol.component';
import{ServiciosService} from './login/service/servicios.service';

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
    CrearRolesComponent,
    CrearUsuarioComponent,
    ModificarUsuarioComponent,
    AsignarRolComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ServiciosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
