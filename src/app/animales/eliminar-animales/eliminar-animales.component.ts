import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ZooService } from 'src/app/zoo.service';

@Component({
  selector: 'app-eliminar-animales',
  templateUrl: './eliminar-animales.component.html',
  styleUrls: ['./eliminar-animales.component.css']
})
export class EliminarAnimalesComponent implements OnInit {

  codigo: String;
  nombre: String;
  especie: String;
  fechaNacimiento: String;
  fechaIngreso: String;
  zooService: ZooService;

  constructor(http : HttpClient) { 
    this.codigo = "";
    this.nombre = "";
    this.especie = "";
    this.fechaNacimiento = "";
    this.fechaIngreso = "";
    this.zooService = new ZooService(http);
  }

  ngOnInit(): void {
  }

}
