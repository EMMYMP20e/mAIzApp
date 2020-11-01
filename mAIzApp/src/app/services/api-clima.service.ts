import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiClimaService {

  private urlBase = "https://api.openweathermap.org/data/2.5/onecall?";
  private appid = "e8ebb442ead20a5c70be35f606861d24";

  constructor(public http: HttpClient) { }

  dameDatos(datos) {

    let params = ''

    return this.http.get(this.urlBase, {
      params: new HttpParams({
        fromObject: {
          lat: datos.lat,
          lon: datos.lon,
          exclude: datos.exclude,
          appid: this.appid
        }
      })
    });
  }
}
