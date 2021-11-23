import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable(
  {
  providedIn: 'root'
})
export class ZooService 
{

  private url:string;

  verMenu:boolean = false;
  usuarioLogeado:any;

  constructor(private http:HttpClient) 
  {
    this.url = "http://35.224.163.198:8081";
    this.usuarioLogeado = null;
  }

  llamadoHttp( tipo:string, sql:string )
  {
    var body:FormData = new FormData();
    body.set("tipo",tipo);
    body.set("sql",sql);
    var respuesta:any = this.http.post( this.url, body);
    return respuesta;
  }

  setUsuarioLogeado( usuario:any ){ 
    this.usuarioLogeado = usuario;
  }

  getUsuarioLogeado(){
    console.log(this.usuarioLogeado);
    return this.usuarioLogeado;
  }

  validarMenu(){
    let usuario = localStorage.getItem("usuario");
    if(usuario != null){
      this.verMenu = true;
    }
    else{
      this.verMenu = false;
    }
  }

  getVerMenu(){
    return this.verMenu;
  }
}
