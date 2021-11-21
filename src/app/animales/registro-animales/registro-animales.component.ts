import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ZooService } from 'src/app/zoo.service';

@Component({
  selector: 'app-registro-animales',
  templateUrl: './registro-animales.component.html',
  styleUrls: ['./registro-animales.component.css']
})
export class RegistroAnimalesComponent
{

  title = 'zooUnibague';
  codigo: String;
  nombre: String;
  especie: String;
  fechaNacimiento: String;
  fechaIngreso: String;
  descripcion: String;
  zooService: ZooService;


  constructor(http: HttpClient) 
  {
    this.codigo = "";
    this.nombre = "";
    this.especie = "";
    this.fechaNacimiento = "";
    this.fechaIngreso = "";
    this.descripcion = "";
    this.zooService = new ZooService(http);
  }


  insertarAnimales()
  {
    var tipo = "insert";
    var sql = "INSERT INTO animales(codigo,nombre,especie,fechaNacimiento,fechaIngreso,descripcion) VALUES('" + this.codigo + "','" + this.nombre + "','" + this.especie + "','" + this.fechaNacimiento + "','" + this.fechaIngreso + "','" + this.descripcion  + "');";
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
