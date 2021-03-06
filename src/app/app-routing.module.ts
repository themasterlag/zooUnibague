import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentaComponent } from "src/app/taquilla/venta/venta.component";
import { DevolucionComponent } from "src/app/taquilla/devolucion/devolucion.component";
import { LoginComponent } from './login/login.component';
import {UsuariosComponent} from 'src/app/usuarios/usuarios.component';
import { AnimalesComponent} from './animales/animales.component';
import { RegistrarPersonasComponent } from './usuarios/registrar-personas/registrar-personas.component';
import { FormularioTicketComponent } from './tickets/formulario-ticket/formulario-ticket.component';
import { ListaTicketComponent } from './tickets/lista-ticket/lista-ticket.component';
import { ListarAnimalesComponent } from './animales/listar-animales/listar-animales.component';
import { RegistroAnimalesComponent } from './animales/registro-animales/registro-animales.component';
import { EliminarAnimalesComponent } from './animales/eliminar-animales/eliminar-animales.component';
import { BuscarAnimalesComponent } from './animales/buscar-animales/buscar-animales.component';
import { ListarusuarioComponent } from './listarusuario/listarusuario.component';
import { CrearHabitatComponent } from './habitats/crear-habitat/crear-habitat.component';
import { ListaHabitatsComponent } from './habitats/lista-habitats/lista-habitats.component';



const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'venta', component: VentaComponent },
  { path: 'devolucion', component: DevolucionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'animales', component: AnimalesComponent },
  { path: 'eliminar-animales', component: EliminarAnimalesComponent},
  { path: 'listar-animales', component: ListarAnimalesComponent},
  { path: 'registrar-animales', component: RegistroAnimalesComponent},
  { path: 'buscar-animales', component: BuscarAnimalesComponent},
  { path: 'registrar-personas', component: RegistrarPersonasComponent},
  { path: 'crear-ticket/:id', component: FormularioTicketComponent},
  { path: 'litar-ticket', component: ListaTicketComponent},
  { path: 'listar-usuario', component: ListarusuarioComponent},
  { path: 'crear-habitat/:id', component: CrearHabitatComponent},
  { path: 'listar-habitats', component: ListaHabitatsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
