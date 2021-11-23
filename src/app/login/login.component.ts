import { Component, OnInit } from '@angular/core';
import { ZooService } from 'src/app/zoo.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent 
{
  title = 'zooUnibague';
  zooService: ZooService;
  contrasena: String;
  email: String;

  constructor(http: HttpClient, private router: Router) 
  {
    this.contrasena = "";
    this.email = "";
    this.zooService = new ZooService(http);

    
    if( localStorage.getItem("usuario") != null){
      this.router.navigate(['/venta']);
    }

    this.zooService.validarMenu();
  }
  
  ngOnInit() {
    this.zooService.validarMenu();
  }

  mostrarContrasena()
  {
    var contra = document.getElementById('password');
    contra?.setAttribute('type', 'text');
  }

  ocultarContrasena()
  {
    var contra = document.getElementById('password');
    contra?.setAttribute('type', 'password');
  }


  onLogin() 
  {

    if (this.email.includes("@") == false || this.email.includes(".") == false) 
    {
      Swal.fire({
        title: 'Error!',
        text: "Ingrese el email correcto!",
        icon: 'warning',
        confirmButtonText: 'Ok',
      });
      return;
    }
    var tipo = "select";
    var sql = "select * from persona where pwd='" + this.contrasena + "' and email='" + this.email.toLowerCase() + "';";
    this.zooService.llamadoHttp(tipo, sql).subscribe((data: any) => 
    {
      if (data.success == true) 
      {
        for (let i in data.mensaje) 
        {
          var contra = data.mensaje[0].pwd;
          var email = data.mensaje[0].email;
          if (contra == this.contrasena &&  email == this.email) 
          {
            this.zooService.setUsuarioLogeado(data.mensaje[0].usuario);
            localStorage.setItem('usuario', data.mensaje[0].usuario);
            Swal.fire({
              title: 'Éxito!',
              text: "Ha ingresado con éxito!",
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            this.router.navigate(['/venta']);
          }
          else 
          {
            this.zooService.setUsuarioLogeado(null);
            Swal.fire({
              title: 'Error!',
              text: "Al parecer este usuario no está registrado o ingresó mal los datos!",
              icon: 'warning',
              confirmButtonText: 'Ok',
              footer: 'Esta informacion es importante'
            });
            this.router.navigate(['/login']);

          }
        }
      }
    });
  }
}
