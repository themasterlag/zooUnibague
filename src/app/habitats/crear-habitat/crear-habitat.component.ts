import { Component, OnInit } from '@angular/core';
import { ZooService } from 'src/app/zoo.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

interface Habitat{
  id:number,
  nombre:String,
  tipo:number,
  cantidadMaxanimales:number
}
@Component({
  selector: 'app-crear-habitat',
  templateUrl: './crear-habitat.component.html',
  styleUrls: ['./crear-habitat.component.css']
})
export class CrearHabitatComponent implements OnInit {
  zooService:ZooService;

  habitat:Habitat = {
    id:0,
    nombre:"",
    tipo:0,
    cantidadMaxanimales:0
  }

  listaTipos:any[] = []

  constructor(http:HttpClient, private route: ActivatedRoute, private router: Router){
    this.zooService = new ZooService(http);
    if( localStorage.getItem("usuario") == null){
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.habitat = {
      id:0,
      nombre:"",
      tipo:0,
      cantidadMaxanimales:0
    }

    this.listaTipos = [];
    this.consultarListaTipos();

    var id = this.route.snapshot.paramMap.get('id');
    if(id != null && id != "null"){
      this.consultarHabitat(id);
    }
  }


  consultarHabitat(id:String){
    var tipo = "select";
    var sql = "SELECT * FROM habitats WHERE id = "+id;
    this.zooService.llamadoHttp(tipo, sql).subscribe(
      (data:any)=>{
        if(data.success == true){
          this.habitat = data.mensaje[0];
        }
        else{
          Swal.fire({
            title: 'Error',
            text: 'No se pudo consultar el habitat',
            icon: 'error'
          })
        }
      }
    );
  }

  consultarListaTipos(){
    var tipo = "select";
    var sql = "SELECT * FROM tiposHabitas";
    this.zooService.llamadoHttp(tipo, sql).subscribe(
      (data:any)=>{
        if(data.success == true){
          for (let i in data.mensaje) {
            this.listaTipos.push(data.mensaje[i]);
          }
        }
        else{
          Swal.fire({
            title: 'Error',
            text: 'No se pudo consultar la lista de tipos de habitats',
            icon: 'error'
          })
        }
      }
    );
  }

  guardar(){
    if(this.habitat.nombre == "" || this.habitat.cantidadMaxanimales == 0 || this.habitat.tipo == 0){
      Swal.fire({
        title: 'Error',
        text: 'No puede dejar campos vacíos',
        icon: 'error'
      })
    }
    else{
      var tipo = "avanzado";
      var sql = "INSERT INTO habitats (nombre, tipo, cantidadMaxanimales) VALUES ('"+this.habitat.nombre+"', '"+this.habitat.tipo+"', "+this.habitat.cantidadMaxanimales+")";
      var sql2 = "UPDATE habitats SET nombre = '"+this.habitat.nombre+"', tipo = '"+this.habitat.tipo+"', cantidadMaxanimales = "+this.habitat.cantidadMaxanimales+" WHERE id = " + this.habitat.id + "; ";
      this.zooService.llamadoHttp(tipo,  this.habitat.id != 0? sql2: sql).subscribe(
        (data:any)=>{
          if(data.success == true){
            Swal.fire({
              title: 'Correcto',
              text: 'Se guardó el habitat',
              icon: 'success'
            })
            this.router.navigate(['/habitats']);
          }
          else{
            Swal.fire({
              title: 'Error',
              text: 'No se pudo guardar el habitat',
              icon: 'error'
            })
          }
        }
      );
    }
  }
}
