import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ZooService } from 'src/app/zoo.service';
import { HttpClient } from '@angular/common/http';
import { right } from '@popperjs/core';

interface cards {
  id: number;
  titulo: String;
  tipo:  String;
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

  datosCliente:any ={
    cedula:"",
    nombre:""
  }

  listaTickets:any[]=[];

  zooService:ZooService;

  activo:number = 0;

  listaSeleccionados:any[] =[];

  tickets:cards[] = [];

  arreglo:any[]=[];

  totalVenta:any=0;

  
  constructor(http:HttpClient) {
    this.zooService = new ZooService(http);

    var sql = "select * from tickets";
    this.zooService.llamadoHttp( "select", sql ).subscribe((data: any) => {    
      if(data.success == true){
        for (let atributo in data.mensaje) {
          this.listaTickets.push(data.mensaje[atributo])
        }            
        this.lLenarCardsDeTickets();
      }
      else{
        console.log("hubo false en webservice");
      }
    },(error:any) => { console.log(error); });

  }



  

  ngOnInit(): void {

  }


  private lLenarCardsDeTickets(){

    var posicionEnBloque = 0;
    var bloqueTickets:cards[]=[];

    for (let ticket of this.listaTickets) {
     
      var ticketCard:cards ={ id: ticket.id,  titulo: ticket.nombre,  tipo: ticket.tipo, precio: ticket.valor, cantidad: 0,  estado: true }

      bloqueTickets.push(ticketCard);
      posicionEnBloque++;
      
      if( posicionEnBloque == 4  ){
        this.arreglo.push(bloqueTickets); 
        bloqueTickets=[];
        posicionEnBloque=0;
      }

    }; 

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
      this.listaSeleccionados.forEach((element,index) => {
        if (element.id == id) {
          respuesta = { indice: index, ticket: element };
        }
      });
    }
   
    return respuesta
  }

  public agregar(id:number){
    var ticket:any = this.encontrar(id,0);
    if (ticket != null) {
      ticket.estado =false;
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
    var respuesta:any = this.encontrar(id,1);
    if (respuesta != null) {
      respuesta.ticket.estado =true;
      respuesta.ticket.cantidad =0;
      this.listaSeleccionados.splice(respuesta.indice,1);
      this.calcularTotal();
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


  public verDetalleTicket(id:number){
    var sql = "select * from habitats H inner join detallesTickets DT on H.id=DT.idHabitat where DT.idTicket = "+id;
    this.zooService.llamadoHttp( "select", sql ).subscribe((data: any) => {    
      if(data.success == true){

        var ticket:any = this.encontrar(id,0);

        var infoTickethtml:String=
        "<div class='row'><div class='col-3 text-start'><strong>Nombre:</strong></div><div class='col-9 text-end'>" + ticket.titulo +"</div></div>"+
        "<div class='row'><div class='col-3 text-start'><strong>Tipo:</strong></div><div class='col-9 text-end'>" + ticket.tipo +"</div></div>"+
        "<div class='row'><div class='col-3 text-start'><strong>Valor:</strong></div><div class='col-9 text-end'>$ " + ticket.precio +"</div></div>"+
        "<BR/>";

        var listaHabitatsHtmml:string=
        "<div class='row'><div class='col-12'><strong>HABITATS EN RECORRIDO</strong></div></div>"+
        "<div class='row'>"+
          "<div class='col-4'><strong>Nombre</strong></div>"+
          "<div class='col-4'><strong>Tipo</strong></div>"+
          "<div class='col-4'><strong>No. Animales</strong></div>"+
        "</div>";
        
        for (let elemento in data.mensaje) {
          listaHabitatsHtmml += 
          "<div class='row'>"+
            "<div class='col-4 text-start'>" + data.mensaje[elemento].nombre + "</div>"+
            "<div class='col-4'>" + data.mensaje[elemento].tipo + "</div>"+
            "<div class='col-4'>" + data.mensaje[elemento].cantidadMaxanimales + "</div>"+
          "</div>";
        }            
        
        Swal.fire({
          title: '<strong><u>Información Del Ticket</u></strong>',
          html:
            infoTickethtml + listaHabitatsHtmml,
          showCloseButton: true,
          showConfirmButton: false
        });

      }
      else{
        console.log("hubo false en webservice");
      }
    },(error:any) => { console.log(error); });
  }


  public generarFactura(){
    if(this.datosCliente.cedula=="" || this.datosCliente.nombre==""){
      alert("Debe ingresar los datos del cliente");
    }
    else{
      var valorTotal:number=0;
      var sqlDetalles:string[]=[];

      for (let registro of this.listaSeleccionados) {
        valorTotal = valorTotal + (registro.precio * registro.cantidad);

        sqlDetalles.push(
          "INSERT INTO detallesFacturas ("+
            "idFactura,"+
            "idTicket,"+
            "valor,"+
            "cantidad,"+
            "valorTotal"+
          ") values ("+
            "@idFactura,"+
            registro.id + ","+
            registro.precio + ","+
            registro.cantidad + ","+
            (registro.precio * registro.cantidad) +
          ");"
        );

      }         

      var sql = 
      "INSERT INTO facturas ("+
        "usuarioEmpleado, "+
        "cedulaCliente, "+
        "nombreCliente, "+
        "valorTotal, "+
        "fechaVenta "+
      ") values ("+
        "1,"+
        this.datosCliente.cedula + ","+
        "'"+this.datosCliente.nombre + "',"+
        valorTotal + ","+
        "CURDATE()"+
      ")";


      this.zooService.llamadoHttp( "insert", sql ).subscribe((dataEnc: any) => {    
        if(dataEnc.success == true){

          for (let sqlDetalle of sqlDetalles) {

            let regex = /\@idFactura/gi;
            sqlDetalle = sqlDetalle.replace(regex, dataEnc.mensaje.id);  
            console.log(sqlDetalle);


            this.zooService.llamadoHttp( "insert", sqlDetalle ).subscribe((dataDet: any) => {    
              if(dataDet.success == true){

                console.log(dataDet);
      
              }
              else{
                console.log("hubo false en webservice");
              }
            },(error:any) => { console.log(error); });    

          }

        }
        else{
          console.log("hubo false en webservice");
        }
      },(error:any) => { console.log(error); });    
      
      
    }

  }

}
