import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentaComponent } from "src/app/taquilla/venta/venta.component";
import { DevolucionComponent } from "src/app/taquilla/devolucion/devolucion.component";


const routes: Routes = [
  { path: '', redirectTo: '/venta', pathMatch: 'full' },
  { path: 'venta', component: VentaComponent },
  { path: 'devolucion', component: DevolucionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
