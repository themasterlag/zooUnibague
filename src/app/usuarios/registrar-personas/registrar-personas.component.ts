import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistroService } from 'src/app/usuarios/registrar-personas/registro.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  ocultarContrasena()
  {
    var contra = document.getElementById('pass');
    contra?.setAttribute('type','password');
  }

  mostrarContrasena()
  {
    var contra = document.getElementById('pass');
    contra?.setAttribute('type','text');
  }



  insertarPersonas() {
    var tipo = "insert";
    var sql = "INSERT INTO persona(nombre,apellido,edad,fechaNacimiento,id,genero,telefono,usuario,pwd,email) VALUES('" + this.nombre + "','" + this.apellido + "'," + this.edad + ",'" + this.fechaDeNacimiento + "'," + this.cedula + ",'" + this.genero + "'," + this.telefono + ",'" + this.usuario + "','" + this.contrasena + "','" + this.email + "');";
    if(this.verificarPersonas()==false)
      {
        Swal.fire({
          title: 'Error!',
          text: "Debe rellenar todos los campos",
          icon: 'warning',
          confirmButtonText: 'Ok',
          footer:'No olvidar'
        }); 
        return;   
      }
      if(this.email.includes("@")==false)
      {
        Swal.fire({
          title: 'Error!',
          text: "Debe ingresar un correo correcto",
          icon: 'warning',
          confirmButtonText: 'Ok',
          footer:'Error de digitación'
        });
        return;
      }
    else if(this.nombre!="" && this.contrasena!="" && this.edad!=0 && this.fechaDeNacimiento!="" && this.cedula!=0
     && this.genero!="" && this.telefono!=0 && this.usuario!="" && this.contrasena!="" && this.email!="")
      {
        this.zooService.llamadoHttp(tipo, sql).subscribe((data: any) => 
        {
          Swal.fire({
            title: 'Registrado',
            text: "Se ha registrado con éxito",
            icon: 'success',
            confirmButtonText: 'Ok',
            footer:'Esta informacion es importante'
          });
          this.router.navigate(['/login']);
        },
        );
        
        
        
      }
  }
}
