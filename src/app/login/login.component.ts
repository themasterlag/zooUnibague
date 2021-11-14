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
    var tipo = "select";
    var sql = "select * from registro where pwd='" + this.contrasena + "' and email='"+this.email+"';";
    this.zooService.llamadoHttp(tipo, sql).subscribe((data: any) => 
    {
      if(data.success == true)
      {
        console.log(data.mensaje[0]);
        this.email = data.mensaje[0].email; 
        this.contrasena = data.mensaje[0].contrasena; 
        this.router.navigate(['/venta']);
      }
      else
      {
        Swal.fire({
          title: 'Error!',
          text: "Al parecer este usuario no está registrado!",
          icon: 'warning',
          confirmButtonText: 'Ok',
          footer:'Esta informacion es importante'
        });
      }
    }
    );

  }

}
