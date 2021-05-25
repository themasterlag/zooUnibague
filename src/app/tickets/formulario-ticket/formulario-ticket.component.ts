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
}

interface Habitat{
  id:number,
  nombre:String,
  tipo:String,
  cantidadMaxanimales:number
}

@Component({
  selector: 'app-formulario-ticket',
  templateUrl: './formulario-ticket.component.html',
  styleUrls: ['./formulario-ticket.component.css']
})
export class FormularioTicketComponent implements OnInit {

  zooService:ZooService;

  ticket:Ticket = {
    id:0,
    nombre:"",
    valor:0,
    tipo:""
  };

  listaHabitats:Habitat[] = [];

  listaHabitatsSeleccionados:Habitat[] = [];

  constructor(http:HttpClient, private route: ActivatedRoute, private router: Router){
    this.zooService = new ZooService(http);
    
  }

  ngOnInit(): void {
    this.consultarHabitats();

    var id = this.route.snapshot.paramMap.get('id');
    if(id != null){
      this.consultarTicket(id);
    }
   
  }
  public guardar(){
    console.log(this.listaHabitatsSeleccionados);
    var tipo = "avanzado";
    var sql = "INSERT INTO tickets (nombre, valor, tipo) VALUES ('"+ this.ticket.nombre +"',"+ this.ticket.valor + ",'" +this.ticket.tipo+"'); ";
    this.zooService.llamadoHttp(tipo, sql).subscribe(
      (data:any) =>{
        if(data.success == true){
          this.zooService.llamadoHttp("select","SELECT MAX(id) as id FROM tickets;").subscribe(
            (data:any) =>{
              if(data.success == true){
                this.consultarTicket(data.mensaje[0].id);

                console.log(data.mensaje,"ins");
                this.ticket.id = data.mensaje[0];
      
                var tipo = "insert";
                var sql = "INSERT INTO detallesTickets (idHabitat, idTicket) VALUES ";
                
                for (let i = 0; i < this.listaHabitatsSeleccionados.length; i++) {
                  const element = this.listaHabitatsSeleccionados[i];
              
                  sql += "(" + element.id + "," + data.mensaje[0].id + ")";
                  if (i+1<this.listaHabitatsSeleccionados.length) {
                    sql += ",";
                  }
                }
      
                this.zooService.llamadoHttp(tipo, sql).subscribe(
                  (data:any) =>{
                    if(data.success == true){
                      Swal.fire({
                        title: 'Guardado',
                        text: 'Se ha guardado con exito',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                      });
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
          );
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

  private consultarTicket(id:String){
    var tipo = "select";
    var sql = "SELECT * FROM tickets WHERE id = " + id;

    this.zooService.llamadoHttp(tipo, sql).subscribe(
      (data:any) =>{
        if(data.success == true){
          this.ticket.id = data.message[0].id;
          this.ticket.nombre = data.message[0].nombre;
          this.ticket.valor = data.message[0].valor;
          this.ticket.tipo = data.message[0].tipo;
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


  private consultarHabitats(){
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
