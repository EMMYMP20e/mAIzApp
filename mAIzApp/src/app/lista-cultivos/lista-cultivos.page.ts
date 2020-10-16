import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-cultivos',
  templateUrl: './lista-cultivos.page.html',
  styleUrls: ['./lista-cultivos.page.scss'],
})
export class ListaCultivosPage implements OnInit {

  arrayCultivos=[]


  constructor() {
    this.arrayCultivos.push({
      'nombre': 'ranch',
      'ubicacion':'rnch cano'
    });
    this.arrayCultivos.push({
      'nombre': 'otro',
      'ubicacion':'rnch otro'
    });
    this.arrayCultivos.push({
      'nombre': 'puto el que lo lea',
      'ubicacion':'rnch otro'
    });
   }

  ngOnInit() {
  }

}
