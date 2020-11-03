import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-lista-cultivos',
  templateUrl: './lista-cultivos.page.html',
  styleUrls: ['./lista-cultivos.page.scss'],
})
export class ListaCultivosPage implements OnInit {

  arrayCultivos=[]


  constructor(private router: Router) {
    this.arrayCultivos.push({
      'id':'1',
      'nombre': 'ranch',
      'ubicacion':'rnch cano'
    });
    this.arrayCultivos.push({
      'id':'2',
      'nombre': 'otro',
      'ubicacion':'rnch otro'
    });
    this.arrayCultivos.push({
      'id':'3',
      'nombre': 'puto el que lo lea',
      'ubicacion':'rnch otro'
    });
   }

  ngOnInit() {
  }

  accion(event, id_cultivo){
    if(event.target.value.includes("Nuevo Registro")){
      let datos: NavigationExtras = {
        state: {
          id: id_cultivo
        }
      };
      this.router.navigate(['form-registro'], datos);
    }
  }

}
