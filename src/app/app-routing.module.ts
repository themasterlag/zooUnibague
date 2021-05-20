import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentaComponent } from "src/app/taquilla/venta/venta.component";
import { DevolucionComponent } from "src/app/taquilla/devolucion/devolucion.component";
import { LoginComponent } from "src/app/login/login.component";


const routes: Routes = [
  { path: '', redirectTo: '/ventas', pathMatch: 'full' },
  { path: 'venta', component: VentaComponent },
  { path: 'devolucion', component: DevolucionComponent },
  { path : 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
