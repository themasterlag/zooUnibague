import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ZooService } from 'src/app/zoo.service';
import Swal from 'sweetalert2';

interface Animal{
  codigo: String;
  nombre: String;
  especie: String;
  fechaNacimiento: String;
  fechaIngreso: String;
  descripcion: String;
}

@Component({
  selector: 'app-listar-animales',
  templateUrl: './listar-animales.component.html',
  styleUrls: ['./listar-animales.component.css']
})
export class ListarAnimalesComponent implements OnInit {

  zooService: ZooService;

  listaAnimales:Animal[] = [];

  constructor(http: HttpClient, private route: ActivatedRoute, private router: Router) { 

    this.zooService = new ZooService(http);
  }

  ngOnInit(): void {
    this.consultarListaAnimales();
  }

  public consultarListaAnimales(){

    var tipo = "select";
    var sql = "SELECT * FROM animales";

    this.listaAnimales = [];

    this.zooService.llamadoHttp(tipo, sql).subscribe(
      (data:any) =>{
        if(data.success == true){
          for (let i in data.mensaje) {
            this.listaAnimales.push(data.mensaje[i]);
          }
        }
        else{
          Swal.fire({
            title: 'Error!',
            text: 'Hubo un error en el servidor!',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      },
      (error:any) =>{
        Swal.fire({
          title: 'Error!',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    );
  }


  public eliminar(codigo:String){
    Swal.fire({
      title: '¿Está seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, eliminar!'
    }).then((result) => {
      if (result.value) {
        var tipo = "delete";
        var sql = "DELETE FROM animales WHERE codigo = '" + codigo+"';";
        Swal.fire({
          title:'Eliminado!',
          html: '<i class="fas fa-spinner fa-pulse"></i>',
          icon: 'info',
          confirmButtonText: 'Ok'
        });
        this.zooService.llamadoHttp(tipo, sql).subscribe(
          (data:any) =>{
            if(data.success == true){
              this.consultarListaAnimales();
              Swal.fire({
                title:'Eliminado!',
                text: 'Se elimino correctamente',
                icon: 'success',
                confirmButtonText: 'Ok'
              });
            }
            else{
              Swal.fire({
                title: 'Error!',
                text: data.message[0],
                icon: 'error',
                confirmButtonText: 'Ok'
              });
            }
          },
          (error:any) =>{
            Swal.fire({
              title: 'Error!',
              text: error.message,
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        );
      }
    });
  }
  

}
