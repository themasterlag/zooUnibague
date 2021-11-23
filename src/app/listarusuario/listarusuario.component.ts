import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ZooService } from 'src/app/zoo.service';
import Swal from 'sweetalert2';

interface Usuario{
  id:number,
  tipoUsuario:String,
  nombreUsuario:String,
  rol:String
  personaExclusiva:String
}
@Component({
  selector: 'app-listarusuario',
  templateUrl: './listarusuario.component.html',
  styleUrls: ['./listarusuario.component.css']
})
export class ListarusuarioComponent implements OnInit {

  zooService: ZooService;
  
  listaUsuarios:Usuario[] = [];

  constructor(http:HttpClient, private route: ActivatedRoute, private router: Router)
   {
    this.zooService = new ZooService(http);
   

   }

  ngOnInit(): void 
  {
    this.consultarListaUsuarios();
  }

  public consultarListaUsuarios(){
    var tipo = "select";
    var sql = "SELECT * FROM usuarios";

    this.listaUsuarios = [];

    this.zooService.llamadoHttp(tipo, sql).subscribe(
      (data:any) =>{
        if(data.success == true){
          for (let i in data.mensaje) {
            this.listaUsuarios.push(data.mensaje[i]);
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

  public eliminar(nombreUsuario:String){
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
        var sql = "DELETE FROM usuarios where nombreUsuario = " + nombreUsuario;
        Swal.fire({
          title:'Eliminado!',
          html: '<i class="fas fa-spinner fa-pulse"></i>',
          icon: 'info',
          confirmButtonText: 'Ok'
        });
        this.zooService.llamadoHttp(tipo, sql).subscribe(
          (data:any) =>{
            if(data.success == true){
              this.consultarListaUsuarios();
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
