import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistroService } from 'src/app/usuarios/registrar-personas/registro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-personas',
  templateUrl: './registrar-personas.component.html',
  styleUrls: ['./registrar-personas.component.css']
})
export class RegistrarPersonasComponent {
  title = 'zooUnibague';
  nombre: String;
  apellido: String;
  edad: number;
  fechaDeNacimiento: String;
  genero: String;
  cedula: number;
  telefono: number;
  usuario: String;
  contrasena: String;
  email: String;
  zooService: RegistroService;

  constructor(http: HttpClient, private router: Router) {
    this.nombre = "";
    this.apellido = "";
    this.edad = 0;
    this.fechaDeNacimiento = "";
    this.cedula = 0;
    this.genero = "";
    this.telefono = 0;
    this.usuario = "";
    this.contrasena = "";
    this.email = "";
    this.zooService = new RegistroService(http);
  }

  verificarPersonas()
  {
    if(this.nombre==""||this.contrasena==""||this.edad==0||this.fechaDeNacimiento==""||this.cedula==0||this.genero==""||this.telefono==0||this.usuario==""||this.contrasena==""||this.email=="")
      {

        return false;
      }
      return true;

  }

  insertarPersonas() {
    var tipo = "insert";
    var sql = "INSERT INTO persona(nombre,apellido,edad,fechaNacimiento,id,genero,telefono,usuario,pwd,email) VALUES('" + this.nombre + "','" + this.apellido + "'," + this.edad + ",'" + this.fechaDeNacimiento + "'," + this.cedula + ",'" + this.genero + "'," + this.telefono + ",'" + this.usuario + "','" + this.contrasena + "','" + this.email + "');";
    this.zooService.llamadoHttp(tipo, sql).subscribe((data: any) => {

      if(this.verificarPersonas()==false)
      {
        this.router.navigate(['/registrar-personas']);  
      }
      else if(this.nombre!=""&&this.contrasena!=""&&this.edad!=0&&this.fechaDeNacimiento!=""&&this.cedula!=0&&this.genero!=""&&this.telefono!=0&&this.usuario!=""&&this.contrasena!=""&&this.email!="")
      {
        this.router.navigate(['/ventas']);
      }

    },
    );

  }

}
