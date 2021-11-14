import { Component, OnInit } from '@angular/core';
import { ServiciosService} from 'src/app/login/service/servicios.service';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent 
{
  title = 'zooUnibague';
  zooService: ServiciosService;
  contrasena:String;
  email:String;

 constructor(http: HttpClient,private router:Router) 
 {
   this.contrasena="";
   this.email="";
   this.zooService = new ServiciosService(http); 
  }


  onLogin() 
  {
    if(this.email.includes("@")==false || this.email.includes(".")==false)
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
    var sql = "select * from persona where pwd='" + this.contrasena + "' and email='"+this.email.toLowerCase()+"';";
    this.zooService.llamadoHttp(tipo, sql).subscribe((data: any) => 
    {
      if(data.success == true)
      {
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
        Swal.fire({
          title: 'Error!',
          text: "Al parecer este usuario no está registrado o ingresó mal los datos!",
          icon: 'warning',
          confirmButtonText: 'Ok',
          footer:'Esta informacion es importante'
        });
        this.router.navigate(['/login']);
      }
    }
    );

  }

}
