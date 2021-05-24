import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


interface cards {
  id: number;
  titulo: String;
  precio: number;
  cantidad: number;
  estado: boolean;
}


@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css'],
})

export class VentaComponent implements OnInit {

  activo:number = 0;

  listaSeleccionados:any[] =[];

  tickets:cards[] = [];

  arreglo:any[]=[];


  totalVenta:any=0;

  
  constructor() { }

  

  ngOnInit(): void {
    var con = 0;        

    for (let j = 0; j < 3; j++) {
      this.tickets = [];

      for (let i = 0; i < 4; i++) {
        con += 1;
        this.tickets.push({
          id:(con-1),
          titulo:"Ticket " + (con),
          precio: (con)*1000+100,          
          cantidad:0,
          estado:true
        })
      }
      this.arreglo.push(this.tickets); 
    }


    console.log(this.arreglo);

  }

  public slide(tipo:number){
    if(tipo == 1){
      this.activo ++;
      if (this.activo > this.arreglo.length-1) {
        this.activo = 0;
      }
    }
    else{
      this.activo--;
      if (this.activo < 0) {
        this.activo = this.arreglo.length-1;
      }
    }
  }


  public encontrar(id:number, caso:number){
    var respuesta = null;
    if (caso == 0) {
      this.arreglo.forEach((element) => {
        for (let i = 0; i < element.length; i++) {
          if(element[i].id == id){
            respuesta = element[i];
          }
        }
      });
    }
    else if (caso ==1) {
      this.listaSeleccionados.forEach(element => {
        if (element.id == id) {
          respuesta = element
        }
      });
    }
   
    return respuesta
  }

  public agregar(id:number){
    var ticket = this.encontrar(id,0);
    if (ticket != null) {
      this.listaSeleccionados.push(ticket);
    }
    else{
      Swal.fire({
        title: 'Error!',
        text: 'No se pudo agregar',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
    console.log(this.listaSeleccionados);
  }

  public eliminar(id:number){
    var ticket = this.encontrar(id,1);
    if (ticket != null) {
      this.listaSeleccionados.splice(ticket,1);
    }
    else{
      Swal.fire({
        title: 'Error!',
        text: 'No se pudo eliminar',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
    console.log(this.listaSeleccionados);
  }

  public calcularTotal(){
    this.totalVenta = 0;
    this.listaSeleccionados.forEach(element => {
      this.totalVenta += element.precio * element.cantidad;
    });
  }

}
