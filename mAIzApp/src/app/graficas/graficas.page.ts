import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.page.html',
  styleUrls: ['./graficas.page.scss'],
})
export class GraficasPage implements OnInit {

  // Data
  chartData: ChartDataSets[] = [{ data: [], label: ' ' }];
  chartLabels: Label[];

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
      backgroundColor:'rgba(239,124,103,0.7)'
    }
  ];
  chartColorG: Color[] = [
    {
      borderColor: '#28ba62',
      backgroundColor:'rgba(45,211,111,0.7)'
    }
  ];
  chartType = 'line';
  showLegend = false;

  // For search
  stock = '';

  array = []

  constructor() {
    this.getData()
   }


  getData() {

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
    });
    this.chartLabels = [];
    this.chartData[0].data = [];

    for (let entry of this.array) {
      this.chartLabels.push(entry.date);
      this.chartData[0].data.push(entry['data']);
    }
    console.log(this.chartLabels)
    console.log(this.chartData[0].data)
  }

  ngOnInit() {
  }

}
