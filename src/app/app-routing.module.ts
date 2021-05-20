import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentaComponent } from "src/app/taquilla/venta/venta.component";
import { DevolucionComponent } from "src/app/taquilla/devolucion/devolucion.component";
import { LoginComponent } from './login/login.component';
import { AnimalesComponent} from './animales/animales.component'


const routes: Routes = [
  { path: '', redirectTo: '/venta', pathMatch: 'full' },
  { path: 'venta', component: VentaComponent },
  { path: 'devolucion', component: DevolucionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'animales', component: AnimalesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
