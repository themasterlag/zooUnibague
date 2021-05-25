import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ZooService } from 'src/app/zoo.service';
import Swal from 'sweetalert2';


interface Animales{
  codigo: String;
  nombre: String;
  especie: String;
  fechaNacimiento: String;
  fechaIngreso: String;
  descripcion: String;

}


@Component({
  selector: 'app-buscar-animales',
  templateUrl: './buscar-animales.component.html',
  styleUrls: ['./buscar-animales.component.css']
})

export class BuscarAnimalesComponent implements OnInit 
{

  zooService:ZooService;

  animales:Animales = {
    codigo: "",
    nombre: "",
    especie: "",
    fechaNacimiento: "",
    fechaIngreso: "",
    descripcion: ""

  };

  constructor(http: HttpClient, private route: ActivatedRoute, private router: Router) 
  {
    this.zooService = new ZooService(http);
  }

  ngOnInit(): void {
    var codigo = this.route.snapshot.paramMap.get('codigo');
    if(codigo != null){
      this.consultarAnimales(codigo);
    }
  }

  public consultarAnimales(codigo:String)
  {
    var tipo = "select";
    var sql = "SELECT * FROM animales WHERE codigo = " + codigo;

    this.zooService.llamadoHttp(tipo, sql).subscribe(
      (data:any) =>{
        if(data.success == true)
        {
          this.animales.codigo = data.message[0].codigo;
          this.animales.nombre = data.message[0].nombre;
          this.animales.especie = data.message[0].especie;
          this.animales.fechaNacimiento = data.message[0].fechaNacimiento;
          this.animales.fechaIngreso = data.message[0].fechaIngreso;
          this.animales.descripcion = data.message[0].descripcion;
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
