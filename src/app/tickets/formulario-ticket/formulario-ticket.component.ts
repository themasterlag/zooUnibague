import { Component, OnInit } from '@angular/core';
import { ZooService } from 'src/app/zoo.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';


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

  cargo:boolean = false;

  constructor(http:HttpClient, private route: ActivatedRoute, private router: Router){
    this.zooService = new ZooService(http);
    if( localStorage.getItem("usuario") == null){
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.consultarListaHabitats();

    var id = this.route.snapshot.paramMap.get('id');
    if(id != null && id != "null"){
      this.consultarTicket(id);
    }
   
  }

  public guardar(){
    if(this.listaHabitatsSeleccionados.length < 1){
      Swal.fire({
        title: 'Error!',
        text: 'Debe seleccionar al menos un habitat!',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }
    console.log(this.listaHabitatsSeleccionados);
    var tipo = "avanzado";
    var sql = "INSERT INTO tickets (nombre, valor, tipo) VALUES ('"+ this.ticket.nombre +"',"+ this.ticket.valor + ",'" +this.ticket.tipo+"'); ";
    var sql2 = "UPDATE tickets SET nombre = '"+ this.ticket.nombre +"', valor = '"+ this.ticket.valor +"', tipo = '"+ this.ticket.tipo +"'WHERE id = " + this.ticket.id + "; ";
    
    this.zooService.llamadoHttp(tipo, this.ticket.id != 0? sql2: sql).subscribe(
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
          console.log(data.mensaje[0])
          this.ticket.id = data.mensaje[0].id;
          this.ticket.nombre = data.mensaje[0].nombre;
          this.ticket.valor = data.mensaje[0].valor;
          this.ticket.tipo = data.mensaje[0].tipo;

          this.consultarListaHabitatsSeleccionadas(id);
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

  private consultarListaHabitatsSeleccionadas(id:String){
    var tipo = "select";
    var sql = "SELECT * FROM detallesTickets WHERE idTicket = " + id
    this.zooService.llamadoHttp(tipo, sql).subscribe(
      (data:any) =>{
        if(data.success == true){
          for (let i in data.mensaje) {
            this.listaHabitats.forEach(element => {
              if (data.mensaje[i].id == element.id) {
                this.seleccionarHabitat(element.id);
              }
            });
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


  estaSeleccionado(id:number){
    for (let i = 0; i < this.listaHabitatsSeleccionados.length; i++) {
      const element = this.listaHabitatsSeleccionados[i];
      if(element.id == id){
        return i;
      }
    }
    return null;
  }

  encontrarHabitat(id:number){
    for (let i = 0; i < this.listaHabitats.length; i++) {
      const element = this.listaHabitats[i];
      if(element.id == id){
        return element;
      }
    }
    return null;
  }

  public seleccionarHabitat(id:number){
    console.log(id);
    var habitat = this.encontrarHabitat(id);
    if(habitat != null){
      this.listaHabitatsSeleccionados.push(habitat);
    }
    console.log(this.listaHabitatsSeleccionados);
  }

  public deseleccionarHabitat(id:number){
    console.log(id);
    var i = this.estaSeleccionado(id);
    if(i != null){
      this.listaHabitatsSeleccionados.splice(i,1);
    }
  }

}
