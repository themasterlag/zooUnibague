import { Component, OnInit } from '@angular/core';
import { ZooService } from 'src/app/zoo.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


interface Habitat{
  id:number,
  nombre:String,
  tipo:String,
  cantidadMaxanimales:number
}
@Component({
  selector: 'app-lista-habitats',
  templateUrl: './lista-habitats.component.html',
  styleUrls: ['./lista-habitats.component.css']
})
export class ListaHabitatsComponent implements OnInit {
  zooService:ZooService;

  listaHabitats:Habitat[] = [];


  constructor(http:HttpClient, private route: ActivatedRoute, private router: Router){
    this.zooService = new ZooService(http);
    if( localStorage.getItem("usuario") == null){
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.consultarListaHabitats();

  }


  private consultarListaHabitats(){
    var tipo = "select";
    var sql = "SELECT * FROM habitats";

    this.listaHabitats = [];

    this.zooService.llamadoHttp(tipo, sql).subscribe(
      (data:any) =>{
        if(data.success == true){
          for (let i in data.mensaje) {
            this.listaHabitats.push(data.mensaje[i]);
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

  eliminarHabitat(id:number){
    Swal.fire({
      title: 'Estas seguro?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        var tipo = "delete";
        var sql = "DELETE FROM habitats WHERE id = " + id;

        this.zooService.llamadoHttp(tipo, sql).subscribe(
          (data:any) =>{
            if(data.success == true){
              Swal.fire({
                title: 'Eliminado!',
                text: 'Habitat eliminado correctamente!',
                icon: 'success',
                confirmButtonText: 'Ok'
              });
              this.consultarListaHabitats();
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
    });
  }
}
