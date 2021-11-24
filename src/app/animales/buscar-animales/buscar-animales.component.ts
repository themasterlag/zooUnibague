import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ZooService } from 'src/app/zoo.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-buscar-animales',
  templateUrl: './buscar-animales.component.html',
  styleUrls: ['./buscar-animales.component.css']
})

export class BuscarAnimalesComponent implements OnInit 
{

  zooService:ZooService;

  codigo: number;
  nombre: String;
  especie: String;
  fechaNacimiento: String;
  fechaIngreso: String;
  descripcion: String;
  listaHabitats : any[];
  habitatSeleccionado : number;


  constructor(http: HttpClient, private route: ActivatedRoute, private router: Router) 
  {
    this.zooService = new ZooService(http);
    this.codigo = 0;
    this.nombre = "";
    this.especie = "";
    this.fechaNacimiento = "";
    this.fechaIngreso = "";
    this.descripcion = "";

    this.listaHabitats = [];
    this.habitatSeleccionado = 0;

    this.consultarHabitats();
  }

  ngOnInit(): void {
    var codigo = this.route.snapshot.paramMap.get('codigo');
    if(codigo != null){
      this.consultarAnimales();
    }
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

  public consultarAnimales()
  {
    var tipo = "select";
    var sql = "SELECT * FROM animales WHERE codigo = " + this.codigo;

    this.zooService.llamadoHttp(tipo, sql).subscribe(
      (data:any) =>{
        if(data.success == true)
        {
          this.codigo = data.message[0].codigo;
          this.nombre = data.message[0].nombre;
          this.especie = data.message[0].especie;
          this.fechaNacimiento = data.message[0].fechaNacimiento;
          this.fechaIngreso = data.message[0].fechaIngreso;
          this.descripcion = data.message[0].descripcion;
        }
        else
        {
          Swal.fire(
            {
              title: 'Error!',
            text: 'Hubo un erro en el servidor!',
            icon: 'error',
            confirmButtonText: 'Ok'
            });
        }
  },
  (error:any) => {
    Swal.fire({
      title: 'Error!',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'Ok'
      });
    }
  );
}

}
