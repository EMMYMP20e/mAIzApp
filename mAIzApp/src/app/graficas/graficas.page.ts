import { delay } from 'q';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { WebServiceService } from './../services/web-service.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.page.html',
  styleUrls: ['./graficas.page.scss'],
})
export class GraficasPage implements OnInit {

  public id_plantio: any;

  public arrayGDD = [];
  public arrayV = [];

  // Data
  chartData: ChartDataSets[] = [{ data: [], label: ' ' }];
  chartLabels: Label[];

  chartDataV: ChartDataSets[] = [{ data: [], label: ' ' }];
  chartLabelsV: Label[];

  // Options
  chartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Grados Dia de Crecimiento'
    },
    pan: {
      enabled: true,
      mode: 'xy'
    },
    zoom: {
      enabled: true,
      mode: 'xy'
    }
  };
  chartOptionsV = {
    responsive: true,
    title: {
      display: true,
      text: 'Etapas Vegetativas'
    },
    pan: {
      enabled: true,
      mode: 'xy'
    },
    zoom: {
      enabled: true,
      mode: 'xy'
    }
  };
  chartColors: Color[] = [
    {
      borderColor: '#d1604c',
      backgroundColor: 'rgba(239,124,103,0.7)'
    }
  ];
  chartColorG: Color[] = [
    {
      borderColor: '#28ba62',
      backgroundColor: 'rgba(45,211,111,0.7)'
    }
  ];
  chartType = 'line';
  showLegend = false;

  // For search
  stock = '';

  array = []

  constructor(private router: Router, public servidor: WebServiceService, private loadingCtrl: LoadingController) {
    if (this.router.getCurrentNavigation().extras.state.id != null) {
      this.id_plantio=this.router.getCurrentNavigation().extras.state.id;
      console.log(this.router.getCurrentNavigation().extras.state.id)
    }
    else {
      console.log("id null")
    }
    
  }


  getData() {
    /*
    this.array.push({
      date: '01/01/2020',
      data: 3
    });
    this.array.push({
      date: '02/01/2020',
      data: 4
    });
    this.array.push({
      date: '03/01/2020',
      data: 5
    });
    this.array.push({
      date: '04/01/2020',
      data: 5
    });
    this.array.push({
      date: '05/01/2020',
      data: 6
    });
    this.array.push({
      date: '06/01/2020',
      data: 6
    });*/
    this.chartLabels = [];
    this.chartData[0].data = [];

    for (let entry of this.arrayGDD) {
      this.chartLabels.push(entry.date);
      this.chartData[0].data.push(entry['data']);
    }
    console.log(this.chartLabels)
    console.log(this.chartData[0].data)

    this.chartLabelsV = [];
    this.chartDataV[0].data = [];

    for (let entry of this.arrayV) {
      this.chartLabelsV.push(entry.date);
      this.chartDataV[0].data.push(entry['data']);
    }
    console.log(this.chartLabelsV)
    console.log(this.chartDataV[0].data)
  }

  async ngOnInit() {
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
      "IDUser": this.servidor.getID(),
      "IDPlantio": this.id_plantio
    }
    this.servidor.enviarDatos(datos, "/obtenerRegistros").pipe(
      finalize(() => loading.dismiss())
    ).subscribe((data) => {
      for (let registro in data) {
        this.arrayGDD.push({
          date: data[registro].fecharegistro.slice(0,10),
          data: data[registro].gradosdiacrecimiento
        });
        this.arrayV.push({
          date: data[registro].fecharegistro.slice(0,10),
          data: data[registro].etapavegetativa
        });
      }
      console.log("grafica");
      console.log(data);
    }, (err) => {
      alert("Fallo" + err);
      console.log(err)
    });
    await delay(2000);
    this.getData()
  }

}
