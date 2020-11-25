import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { WebServiceService } from './../services/web-service.service';
import { LoadingController } from '@ionic/angular';
import { delay, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-lista-cultivos',
  templateUrl: './lista-cultivos.page.html',
  styleUrls: ['./lista-cultivos.page.scss'],
})
export class ListaCultivosPage implements OnInit {

  arrayCultivos = []



  constructor(private router: Router, public servidor: WebServiceService, private loadingCtrl: LoadingController) { }

  ngOnInit() {

  }
  async ionViewWillEnter() {
    this.arrayCultivos = [];
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
      "IDUsuario": this.servidor.getID()
    }

    this.servidor.enviarDatos(datos, "/obtenerPlantios").pipe(
      finalize(() => loading.dismiss())
    ).subscribe((data) => {
      for (let plantio in data) {
        this.arrayCultivos.push(data[plantio]);
      }
      console.log(data)
    }, (err) => {
      alert("Fallo" + err);
      console.log(err)
    });

    console.log("ok");
    console.log(this.arrayCultivos)
    

    for (let cultivo of this.arrayCultivos) {


      var datosRegistro = {
        "IDUsuario": this.servidor.getID(),
        "IDPlantio": cultivo.plantioid
      }
      let gdd_a = 0;
      let dias = "";
      let etapa;

      this.servidor.enviarDatos(datosRegistro, "/obtenerRegistros").subscribe((reg) => {
        console.log(reg);

        for (let registro in reg) {
          gdd_a += reg[registro].GradosDiasCrecimiento;
          dias = registro;
          etapa = reg[registro].EtapaVegetativa;
        }
      }, (err) => {
        alert("Fallo" + err);
        console.log(err)
      });

      cultivo.gdd_a=gdd_a;
      cultivo.dias=dias;
      cultivo.etapa=etapa;
      console.log("gg")
      console.log(this.arrayCultivos);

    }

  }

  accion(event, id_cultivo) {
    if (event.target.value.includes("Nuevo Registro")) {
      console.log(event)
      let datos: NavigationExtras = {
        state: {
          id: id_cultivo
        }
      };
      this.router.navigate(['/form-registro'], datos);
    }
    else if (event.target.value.includes("Gráficas")) {
      this.router.navigate(['/graficas']);
    }
    event.target.value = "";
  }

}
