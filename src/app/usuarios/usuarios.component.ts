import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ServicioUsuariosService} from 'src/app/usuarios/servicio-usuarios.service';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent 
{
  title = 'zooUnibague';
zooService:ServicioUsuariosService;
tipoUsuario:String;
 nombreUsuario:String; 
 rol:String;
  personaExclusiva:String;

respuesta:any;

constructor(http:HttpClient){
  
  this.zooService = new ServicioUsuariosService(http);
  this.tipoUsuario="";
  this. nombreUsuario="";
  this. rol="";
  this.personaExclusiva= "";
  
}

llamadoRol(){
 
  var tipo = "insert";
  var sql = "insert into usuarios(tipoUsuario,nombreUsuario,rol,personaExclusiva) values ('" + this.tipoUsuario+ "','"+ this.nombreUsuario+ "','"+ this.rol + "','"+ this.personaExclusiva+"');";

 
  this.zooService.llamadoHttp( tipo, sql ).subscribe(  
    (data: any) => {  
      console.log(data); 
      
      if(data.success == true){ 
        console.log(data.mensaje[0]); 
      }
      else{
        console.log("hubo false en webservice");
      }
    },
    (error:any) => { 
      console.log(error); 
    }
  );
}


}
