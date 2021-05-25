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



const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'venta', component: VentaComponent },
  { path: 'devolucion', component: DevolucionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'animales', component: AnimalesComponent },
  { path: 'registrar-personas', component: RegistrarPersonasComponent},
  { path: 'crear-ticket/:id', component: FormularioTicketComponent},
  { path: 'litar-ticket', component: ListaTicketComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
