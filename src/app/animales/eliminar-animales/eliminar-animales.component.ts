import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ZooService } from 'src/app/zoo.service';

@Component({
  selector: 'app-eliminar-animales',
  templateUrl: './eliminar-animales.component.html',
  styleUrls: ['./eliminar-animales.component.css']
})
export class EliminarAnimalesComponent implements OnInit {

  title = 'zooUnibague';
  codigo: String;
  nombre: String;
  especie: String;
  fechaNacimiento: String;
  fechaIngreso: String;
  descripcion : String;
  zooService: ZooService;

  constructor(http : HttpClient) { 
    this.codigo = "";
    this.nombre = "";
    this.especie = "";
    this.fechaNacimiento = "";
    this.fechaIngreso = "";
    this.descripcion = "";
    this.zooService = new ZooService(http);
  }

  ngOnInit(): void {
  }

  eliminarAnimal() {

    var tipo = "delete";
    var sql = "delete FROM animales WHERE codigo = '" + this.codigo + "';";


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
