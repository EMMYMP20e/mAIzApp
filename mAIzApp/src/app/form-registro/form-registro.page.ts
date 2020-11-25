import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { ApiClimaService } from './../services/api-clima.service';
import { WebServiceService } from './../services/web-service.service';

@Component({
  selector: 'app-form-registro',
  templateUrl: './form-registro.page.html',
  styleUrls: ['./form-registro.page.scss'],
})
export class FormRegistroPage implements OnInit {

  public formRegistro: any;

  public dia: any;
  public tempMax: any;
  public tempMin: any;
  public lat_ubicacion: number;
  public lon_ubicacion: number;
  public etapa_vegetativa: any;

  public gdd: number;

  public fecha: any;

  public id_plantio: any;


  constructor(private formBuilder: FormBuilder, private router: Router, private geolocation: Geolocation, private loadingCtrl: LoadingController, private api: ApiClimaService, public servidor: WebServiceService) {
    this.formRegistro = this.formBuilder.group({
      dia: ['', Validators.required],
      tempMax: ['', Validators.required],
      tempMin: ['', Validators.required],
      lat_ubicacion: ['', Validators.required],
      lon_ubicacion: ['', Validators.required],
      etapa_vegetativa: ['', Validators.required],

      //id_plantio
      //id_cuenta
      //id

    });

    var desface = (new Date()).getTimezoneOffset() * 60000;
    var localISOTime = (new Date(Date.now() - desface)).toISOString().slice(0, -1);
    //----------------------------
    this.fecha = localISOTime;
    this.dia = this.fecha;

    if (this.router.getCurrentNavigation().extras.state.id != null) {
      this.id_plantio=this.router.getCurrentNavigation().extras.state.id;
      console.log(this.router.getCurrentNavigation().extras.state.id)

    }
    else {
      console.log("id null")
    }

    this.getGeolocation()

  }

  ngOnInit() {
  }

  async guardarRegistro() {
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
      "UsuarioID": this.servidor.getID(),
      "PlantioID": this.id_plantio,
      "Latitud": this.lat_ubicacion,
      "Longitud": this.lon_ubicacion,
      "TempMax": this.tempMax,
      "TempMin": this.tempMin,
      "GradosDiasCrecimiento": this.gdd,
      "EtapaVegetativa":this.etapa_vegetativa,
      "FechaRegistro":String(this.dia)
    }
    console.log(datos);
    this.servidor.enviarDatos(datos, "/registros").pipe(
      finalize(() => loading.dismiss())
    ).subscribe((data) => {
      alert("Registro Creado");
      console.log(data)
      this.router.navigate(['/lista-cultivos']);
    }, (err) => {
      alert("Error al conectarse al servidor");
      console.log(err)
    });
  }

  getGeolocation() {
    var options = {
      timeout: 20000,
      enableHighAccuracy: true
    }
    this.geolocation.getCurrentPosition(options).then((resp) => {
        this.lat_ubicacion = resp.coords.latitude;
        this.lon_ubicacion = resp.coords.longitude;
      }).catch((error) => {
        console.log('Error obteniendo locación', error);
        alert('Error obteniendo locación')
      });
  }

  async getApi() {
    const loading = await this.loadingCtrl.create({
      animated: true,
      spinner: 'dots',
      message: 'Accesando API de OpenWeather',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: false
    });
    await loading.present()

    var datos = {
      lat: this.lat_ubicacion,
      lon: this.lon_ubicacion,
      exclude: 'minutely,hourly,alerts'
    }
    this.api.dameDatos(datos).pipe(
      finalize(() => loading.dismiss())
    )
      .subscribe((data) => {
        this.tempMax = ((data['daily'][0].temp.max - 273.15) * 1.8) + 32;
        this.tempMin = ((data['daily'][0].temp.min - 273.15) * 1.8) + 32;
        this.gdd = (this.tempMax +this.tempMin)/2 -50
      }, (err) => {
        alert("Error al obtener datos de API OpenWeather");
        console.log(err)
      });
  }




}
