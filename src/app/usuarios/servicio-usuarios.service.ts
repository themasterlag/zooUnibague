import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioUsuariosService 
{

  private url:string;

  constructor(private http:HttpClient) 
  {
    this.url = "http://35.224.163.198:8081";
  }

    llamadoHttp( tipo:string, sql:string )
    {
      var body:FormData = new FormData();
      body.set("tipo",tipo);
      body.set("sql",sql);
      var respuesta:any = this.http.post( this.url, body);
      return respuesta;
    }
}