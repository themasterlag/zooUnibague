import { Component, OnInit } from '@angular/core';
import { ZooService } from 'src/app/zoo.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


interface Factura {
  numero: number;
  usuarioEmpleado: string;
  cedulaCliente: number;
  nombreCliente: string;
  valorTotal: number;
  fechaVenta: Date;
  fechaDevolucion: Date;
  nota: string;
}
@Component({
  selector: 'app-devolucion',
  templateUrl: './devolucion.component.html',
  styleUrls: ['./devolucion.component.css']
})

export class DevolucionComponent implements OnInit {

  zooService:ZooService;

  cantidadVentas:number = 0;
  cantidadDevoluciones:number = 0;

  listaVentas:Factura[] = [];

  constructor(http:HttpClient, private route: ActivatedRoute, private router: Router){
    this.zooService = new ZooService(http);
    if( localStorage.getItem("usuario") == null){
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.consultarVentas();
  }
 
  public consultarVentas(){
    var tipo = "select";
    var sql = "SELECT * FROM facturas";

    this.cantidadVentas = 0;
    this.cantidadDevoluciones = 0;
    this.listaVentas = [];

    this.zooService.llamadoHttp(tipo, sql).subscribe(
      (data:any) =>{
        if(data.success == true){
          for (let i in data.mensaje) {
            if(data.mensaje[i].fechaDevolucion == null){
              this.cantidadVentas++;
            }              
            else{
              this.cantidadDevoluciones++;
            }
            this.listaVentas.push(data.mensaje[i]);
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


  devolverVenta( id:number ){
    // 2021-05-25 00:00:00
    var pad = function(num:any) { return ('00'+num).slice(-2) };
    let date = new Date();
    let fecha = date.getUTCFullYear()    + '-' +
            pad(date.getUTCMonth() + 1)  + '-' +
            pad(date.getUTCDate())       + ' ' +
            pad(date.getUTCHours())      + ':' +
            pad(date.getUTCMinutes())    + ':' +
            pad(date.getUTCSeconds());

    var tipo = "update";
    var sql = "UPDATE facturas SET fechaDevolucion ='"+ fecha +"' WHERE numero = "+id;

    Swal.fire({
      title: 'Está seguro?',
      text: "Esta seguro que desea devolver la venta!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, devolver!'
    }).then((result) => {
      if (result.value) {
        this.zooService.llamadoHttp(tipo, sql).subscribe(
          (data:any) =>{
            if(data.success == true){
              Swal.fire(
                'Devuelto!',
                'La venta ha sido devuelta.',
                'success'
              );
              this.consultarVentas();
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
