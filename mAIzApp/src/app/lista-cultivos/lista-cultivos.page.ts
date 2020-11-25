import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { WebServiceService } from './../services/web-service.service';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { delay } from 'q';

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

    var funcP = await this.getPlantios(datos, loading);
    console.log("1");

    await delay(3000)

    var funcR = await this.getRegistros(funcP);
    console.log(funcR);

  }

  getPlantios(datos, loading) {
    return new Promise(resolve => {
      this.servidor.enviarDatos(datos, "/obtenerPlantios").pipe(
        finalize(() => loading.dismiss())
      ).subscribe((data) => {
        for (let plantio in data) {
          this.arrayCultivos.push(data[plantio]);
        }
        console.log("xd");
        console.log(data);
      }, (err) => {
        alert("Fallo" + err);
        console.log(err)
      });
      resolve(this.arrayCultivos);
    });
  }

  getRegistros(arreglo) {
    return new Promise(resolve => {
      delay(3000)
      console.log("ok2");
      console.log(arreglo)


      for (let cultivo of arreglo) {
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
            gdd_a += reg[registro].gradosdiascrecimiento;
            dias = registro;
            console.log(registro)
            etapa = reg[registro].etapavegetativa;
          }
        }, (err) => {
          alert("Fallo" + err);
          console.log(err)
        });

        cultivo.gdd_a = gdd_a;
        cultivo.dias = dias;
        cultivo.etapa = etapa;
        console.log("gg")
        console.log(arreglo);


      }
      console.log(this.arrayCultivos)
      this.arrayCultivos = arreglo
      console.log(this.arrayCultivos)
      resolve("2");
    });
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
      let datos: NavigationExtras = {
        state: {
          id: id_cultivo
        }
      };
      this.router.navigate(['/graficas'], datos);
    }
    else if (event.target.value.includes("Historial")) {
      let datos: NavigationExtras = {
        state: {
          id: id_cultivo
        }
      };
      this.router.navigate(['/list-registros'], datos);
    }
    event.target.value = "";
  }

}
