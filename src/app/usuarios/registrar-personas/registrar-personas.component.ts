import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ZooService } from 'src/app/zoo.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



interface Registro {
  nombre: String,
  apellido: String,
  edad: number,
  fechaDeNacimiento:String,
  genero: String,
  cedula: number,
  telefono: number,
  usuario: String,
  contrasena: String,
  email: String
}

@Component({
  selector: 'app-registrar-personas',
  templateUrl: './registrar-personas.component.html',
  styleUrls: ['./registrar-personas.component.css']
})

export class RegistrarPersonasComponent implements OnInit {

  zooService: ZooService;

  register: Registro =
    {
      nombre: "",
      apellido: "",
      edad: 0,
      fechaDeNacimiento: "",
      cedula: 0,
      genero: "",
      telefono: 0,
      usuario: "",
      contrasena: "",
      email: ""
    };


  constructor(http: HttpClient, private router: Router) {


    this.zooService = new ZooService(http);
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  verificarPersonas() {
    if (this.register.nombre == "" || this.register.contrasena == "" || this.register.edad == 0 || this.register.fechaDeNacimiento.toString() == null || this.register.cedula == 0 || this.register.genero == "" || this.register.telefono == 0 || this.register.usuario == "" || this.register.contrasena == "" || this.register.email == "") {
      return false;
    }
    return true;
  }

  ocultarContrasena() {
    var contra = document.getElementById('pass');
    contra?.setAttribute('type', 'password');
  }

  mostrarContrasena() {
    var contra = document.getElementById('pass');
    contra?.setAttribute('type', 'text');
  }

  insertarPersonas() {
    var tipo = "insert";
    var sql = "INSERT INTO persona(nombre,apellido,edad,fechaNacimiento,id,genero,telefono,usuario,pwd,email) VALUES('" + this.register.nombre + "','" + this.register.apellido + "'," + this.register.edad + ",'" + this.register.fechaDeNacimiento + "'," + this.register.cedula + ",'" + this.register.genero + "'," + this.register.telefono + ",'" + this.register.usuario + "','" + this.register.contrasena + "','" + this.register.email.toLowerCase() + "');";
    if (this.register.nombre.includes("0") == true || this.register.nombre.includes("1") == true || this.register.nombre.includes("2") == true || this.register.nombre.includes("3") == true || this.register.nombre.includes("4") == true ||
      this.register.nombre.includes("4") == true || this.register.nombre.includes("5") == true || this.register.nombre.includes("7") == true || this.register.nombre.includes("8") == true || this.register.nombre.includes("9") == true) {
      Swal.fire({
        title: 'Error!',
        text: "Debe ingresar nombre correcto",
        icon: 'warning',
        confirmButtonText: 'Ok',
        footer: 'Error de digitación'
      });
      return;
    }
    if (this.register.apellido.includes("0") == true || this.register.apellido.includes("1") == true || this.register.apellido.includes("2") == true || this.register.apellido.includes("3") == true || this.register.apellido.includes("4") == true ||
      this.register.apellido.includes("4") == true || this.register.apellido.includes("5") == true || this.register.apellido.includes("6") == true || this.register.apellido.includes("7") == true || this.register.apellido.includes("8") == true || this.register.apellido.includes("9") == true) {
      Swal.fire({
        title: 'Error!',
        text: "Debe ingresar apellido correcto",
        icon: 'warning',
        confirmButtonText: 'Ok',
        footer: 'Error de digitación'
      });
      return;
    }
    if (this.verificarPersonas() == false) {
      Swal.fire({
        title: 'Error!',
        text: "Debe rellenar todos los campos",
        icon: 'warning',
        confirmButtonText: 'Ok',
        footer: 'No olvidar'
      });
      return;
    }
    if (this.register.email.includes("@") == false || this.register.email.includes(".") == false) {
      Swal.fire({
        title: 'Error!',
        text: "Debe ingresar un correo correcto",
        icon: 'warning',
        confirmButtonText: 'Ok',
        footer: 'Error de digitación'
      });
      return;
    }
    else {
        this.zooService.llamadoHttp(tipo, sql).subscribe((data: any) => {
          if (data.success == true) {

            Swal.fire({
              title: 'Registrado',
              text: "Se ha registrado con éxito",
              icon: 'success',
              confirmButtonText: 'Ok',
              footer: 'Esta informacion es importante'
            });
            this.router.navigate(['/login']);
          }
          else {
            alert("no se pudo insertar");
          }
        });



    }
  }
}
