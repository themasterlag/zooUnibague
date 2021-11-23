import { Component, OnInit } from '@angular/core';
import { ZooService } from 'src/app/zoo.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

interface Ticket{
  id:number,
  nombre:String,
  valor:number,
  tipo:String
  estado:String
}


interface Habitat{
  id:number,
  nombre:String,
  tipo:String,
  cantidadMaxanimales:number
}

@Component({
  selector: 'app-lista-ticket',
  templateUrl: './lista-ticket.component.html',
  styleUrls: ['./lista-ticket.component.css']
})
export class ListaTicketComponent implements OnInit {

  zooService:ZooService;

  listaTickets:Ticket[] = [];

  nombreUsuario: String;

  constructor(http:HttpClient, private route: ActivatedRoute, private router: Router){
    this.zooService = new ZooService(http);
    if( localStorage.getItem("usuario") == null){
      this.router.navigate(['/login']);
    }
    this.nombreUsuario = "";
  }

  ngOnInit(): void {
    this.consultarListaTickets();
  }
 
  public consultarListaTickets(){
    var tipo = "select";
    var sql = "SELECT * FROM tickets";

    this.listaTickets = [];

    this.zooService.llamadoHttp(tipo, sql).subscribe(
      (data:any) =>{
        if(data.success == true){
          for (let i in data.mensaje) {
            this.listaTickets.push(data.mensaje[i]);
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


  public eliminar(id:number){
    var tipo = "delete";
    var sql = "DELETE FROM tickets where id = " + id;
    Swal.fire({
      title:'Eliminado!',
      html: '<i class="fas fa-spinner fa-pulse"></i>',
      icon: 'info',
      confirmButtonText: 'Ok'
    });
    this.zooService.llamadoHttp(tipo, sql).subscribe(
      (data:any) =>{
        if(data.success == true){
          this.consultarListaTickets();
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

}
