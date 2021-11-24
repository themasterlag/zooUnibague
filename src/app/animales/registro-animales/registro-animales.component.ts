import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZooService } from 'src/app/zoo.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro-animales',
  templateUrl: './registro-animales.component.html',
  styleUrls: ['./registro-animales.component.css']
})
export class RegistroAnimalesComponent
{

  title = 'zooUnibague';
  zooService: ZooService;
  codigo: String;
  nombre: String;
  especie: String;
  fechaNacimiento: String;
  fechaIngreso: String;
  descripcion: String;
  listaHabitats : any[];
  habitatSeleccionado : number;
  
  respuesta: any;

 


  constructor(http: HttpClient) 
  {
  
    

    this.zooService = new ZooService(http);
    this.codigo = "";
    this.nombre = "";
    this.especie = "";
    this.fechaNacimiento = "";
    this.fechaIngreso = "";
    this.descripcion = "";
    this.listaHabitats = [];
    this.habitatSeleccionado = 0;

    this.consultarHabitats();
    
  }


  insertarAnimales()
  {
    var tipo = "insert";
    var sql = "insert into animales(nombre,especie,fechaNacimiento,fechaIngreso,descripcion, idHbitat) values('" + this.nombre + "','" + this.especie + "','" + this.fechaNacimiento + "','" + this.fechaIngreso + "','" + this.descripcion  + "'," + this.habitatSeleccionado + ");";
  
  
   /* this.zooService.llamadoHttp(tipo, sql).subscribe((data: any) => {
      if (data.success == true) {

        Swal.fire({
          title: 'Registrado',
          text: "Se ha registrado con éxito",
          icon: 'success',
          confirmButtonText: 'Ok',
          footer: 'Esta informacion es importante'
        });
        //this.router.navigate(['/login']);
      }
      else {
        alert("no se pudo insertar");
      }
    });
    */
    this.zooService.llamadoHttp(tipo, sql).subscribe(
      (data: any) => {
        console.log(data);

        if (data.success == true) {
          console.log(data.mensaje[0]);
          Swal.fire(
            {
              title: 'Registrado!',
            text: 'Se registro correctamente!',
            icon: 'success',
            confirmButtonText: 'Ok'
            });
        }
        else {
          console.log("hubo false en webservice");
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
    
    
    /*
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
    );*/
  }
  

 

  consultarHabitats(){
    var tipo = "select";
    var sql = "select * from habitats";

    this.zooService.llamadoHttp(tipo, sql).subscribe(
      (data: any) => {
        console.log(data);

        if (data.success == true) {

          //hace exactamente lo mismo que el otro for toca buscar la solucion del otro for
          for(let i in data.mensaje){
            this.listaHabitats.push(data.mensaje[i]);
          }
          console.log(this.listaHabitats, "listado de habitats");
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
