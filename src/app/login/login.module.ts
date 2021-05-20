import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarUsuarioComponent } from './listar-usuario/listar-usuario.component';
/*import { LoginComponent } from "src/app/login/login.component";*/

@NgModule({
  declarations: [/*LoginComponent*/
    ListarUsuarioComponent
  ],
  imports: [
    CommonModule,
    /*LoginModule*/
  ]
})
export class LoginModule { }
