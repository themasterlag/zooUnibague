import { Component, OnInit } from '@angular/core';
import { ServiciosService} from 'src/app/login/service/servicios.service';
import { HttpClient } from '@angular/common/http';


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

 constructor(http: HttpClient) 
 {
   this.contrasena="";
   this.email="";
   this.zooService = new ServiciosService(http); 
  }

 onLogin() 
  {
    var tipo = "select";
    var sql = "select * from login where contraseña='" + this.contrasena+"';";
    this.zooService.llamadoHttp(tipo, sql).subscribe((data: any) => 
    {
      console.log(data);

      if (data.success == true) 
      {
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
