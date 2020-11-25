import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebServiceService } from './../services/web-service.service';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { delay } from 'q';

@Component({
  selector: 'app-list-registros',
  templateUrl: './list-registros.page.html',
  styleUrls: ['./list-registros.page.scss'],
})
export class ListRegistrosPage implements OnInit {

  public id_plantio: any;

  arrayRegistros= [];


  constructor(private router: Router, public servidor: WebServiceService, private loadingCtrl: LoadingController) {

    if (this.router.getCurrentNavigation().extras.state.id != null) {
      this.id_plantio=this.router.getCurrentNavigation().extras.state.id;
      console.log(this.router.getCurrentNavigation().extras.state.id)

    }
    else {
      console.log("id null")
    }
   }

   ngOnInit(){}
   

  async ionViewWillEnter() {
    this.arrayRegistros = [];
    const loading = await this.loadingCtrl.create({
      animated: true,
      spinner: 'dots',
      message: 'Accesando Servidor',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: false
    });
    await loading.present()

    var datos = {
      "IDUser":this.servidor.getID(),
      "IDPlantio":this.id_plantio
    }
    this.servidor.enviarDatos(datos, "/obtenerRegistros").pipe(
      finalize(() => loading.dismiss())
    ).subscribe((data) => {
      for (let registro in data) {
        data[registro].fecha=data[registro].fecharegistro.slice(0,10);
        this.arrayRegistros.push(data[registro]);
      }
      console.log(data)
    }, (err) => {
      alert("Fallo" + err);
      console.log(err)
    });

  }

}
