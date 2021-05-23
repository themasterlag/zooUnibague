import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServicioUsuariosService } from 'src/app/usuarios/servicio-usuarios.service';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  title = 'zooUnibague';
  zooService: ServicioUsuariosService;
  tipoUsuario: String;
  nombreUsuario: String;
  rol: String;
  personaExclusiva: String;

  respuesta: any;

  constructor(http: HttpClient) {

    this.zooService = new ServicioUsuariosService(http);
    this.tipoUsuario = "";
    this.nombreUsuario = "";
    this.rol = "";
    this.personaExclusiva = "";

  }

  insertarUsuario() {

    var tipo = "insert";
    var sql = "insert into usuarios(tipoUsuario,nombreUsuario,rol,personaExclusiva) values ('" + this.tipoUsuario + "','" + this.nombreUsuario + "','" + this.rol + "','" + this.personaExclusiva + "');";


    this.zooService.llamadoHttp(tipo, sql).subscribe(
      (data: any) => {
        console.log(data);

        if (data.success == true) {
          console.log(data.mensaje[0]);
        }
        else {
          console.log("hubo false en webservice");
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  eliminarUsuario() {

    var tipo = "delete";
    var sql = "delete FROM usuarios WHERE  nombreUsuario = '" + this.nombreUsuario + "';";


    this.zooService.llamadoHttp(tipo, sql).subscribe(
      (data: any) => {
        console.log(data);

        if (data.success == true) {
          console.log(data.mensaje[0]);
        }
        else {
          console.log("hubo false en webservice");
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  buscarUsuario() {

    var tipo = "select";
    var sql = "select * FROM vehiculo WHERE placa = '" + this.nombreUsuario + "';";


    this.zooService.llamadoHttp(tipo, sql).subscribe(
      (data: any) => {
        console.log(data);

        if (data.success == true) {
          console.log(data.mensaje[0]);
        }
        else {
          console.log("hubo false en webservice");
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }


}
