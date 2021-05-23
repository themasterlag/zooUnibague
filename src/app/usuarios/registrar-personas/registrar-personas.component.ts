import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistroService } from 'src/app/usuarios/registrar-personas/registro.service';

@Component({
  selector: 'app-registrar-personas',
  templateUrl: './registrar-personas.component.html',
  styleUrls: ['./registrar-personas.component.css']
})
export class RegistrarPersonasComponent 
{
  title = 'zooUnibague';
  nombre: String;
  apellido: String;
  edad: number;
  fechaDeNacimiento:String;
  genero: String;
  cedula: number;
  telefono: number;
  usuario: String;
  contrasena: String;
  email: String;
  zooService: RegistroService;

  constructor(http: HttpClient) 
  {
    this.nombre = "";
    this.apellido = "";
    this.edad = 0;
    this.fechaDeNacimiento ="" ;
    this.cedula = 0;
    this.genero = "";
    this.telefono = 0;
    this.usuario = "";
    this.contrasena = "";
    this.email = "";
    this.zooService = new RegistroService(http);
  }

  insertarPersonas() 
  {
    var tipo = "insert";
    var sql = "INSERT INTO persona(nombre,apellido,edad,fechaNacimiento,id,genero,telefono,usuario,pwd,email) VALUES('" + this.nombre + "','" + this.apellido + "'," + this.edad + ",'" + this.fechaDeNacimiento + "'," + this.cedula + ",'" + this.genero + "'," + this.telefono + ",'" + this.usuario + "','" + this.contrasena + "','" + this.email + "');";
    this.zooService.llamadoHttp(tipo, sql).subscribe((data: any) => 
    {
      console.log(data);

      if (data.success == true) 
      {
        console.log(data.mensaje[0]);
      }
      else {
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
