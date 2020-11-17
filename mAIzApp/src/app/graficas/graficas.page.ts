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
  chartData: ChartDataSets[] = [{ data: [], label: 'Stock price' }];
  chartLabels: Label[];

  // Options
  chartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Veces que me la pelan'
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
      date: 'il lunes',
      data: 3
    });
    this.array.push({
      date: 'il martes',
      data: 4
    });
    this.array.push({
      date: 'il miercoles',
      data: 5
    });
    this.array.push({
      date: 'il jueves',
      data: 5
    });
    this.array.push({
      date: 'il viernes',
      data: 4
    });
    this.array.push({
      date: 'il miercoles',
      data: 3
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
