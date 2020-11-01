import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebServiceService {
  urlBase = "https://whispering-eyrie-69288.herokuapp.com";

  constructor(public http: HttpClient) { }

  enviarDatos(datos, directorioUrl) {
    let options = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return this.http.post(this.urlBase + directorioUrl, datos, options);
  }

  dameDatos(directorioUrl) {
    return this.http.get(this.urlBase + directorioUrl);
  }


}
