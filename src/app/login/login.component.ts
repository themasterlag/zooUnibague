import { Component, OnInit } from '@angular/core';
import { ServiciosService} from 'src/app/login/service/servicios.service';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';



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
      console.log(data);

      if (data.success == true) 
      {
        this.router.navigateByUrl("/animales");
        console.log(data.mensaje[0]);
      }
      else 
      {
        console.log("hubo false en webservice");
      }

    },
      (error: any) => 
      {
        console.log(error);
      }
    );

  }
}
