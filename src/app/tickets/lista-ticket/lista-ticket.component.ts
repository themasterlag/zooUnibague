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

  listaHabitats:Habitat[] = [];


  constructor(http:HttpClient, private route: ActivatedRoute, private router: Router){
    this.zooService = new ZooService(http);
    
  }

  ngOnInit(): void {
    this.consultarListaTickets();
    this.consultarListaHabitats();
  }

  public consultarListaTickets(){
    var tipo = "select";
    var sql = "SELECT * FROM tickets";

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
            text: 'Hubo un erro en el servidor!',
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


  private consultarListaHabitats(){
    var tipo = "select";
    var sql = "SELECT * FROM habitats";

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
            text: 'Hubo un erro en el servidor!',
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
