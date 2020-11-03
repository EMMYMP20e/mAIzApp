import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { ApiClimaService } from './../services/api-clima.service';

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

  public fecha: any;


  constructor(private formBuilder: FormBuilder, private router: Router, private geolocation: Geolocation, private loadingCtrl: LoadingController, private api: ApiClimaService) {
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
      console.log(this.router.getCurrentNavigation().extras.state.id)
    }
    else{
      console.log("id null")
    }

    this.getGeolocation()

  }

  ngOnInit() {
  }

  guardarRegistro() {

  }

  getGeolocation() {
		var ref = this;
		this.geolocation.getCurrentPosition().then((resp) => {
			this.lat_ubicacion = resp.coords.latitude;
      this.lon_ubicacion = resp.coords.longitude;
    }).catch((error) => {
			console.log('Error obteniendo locación', error);
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
        this.tempMax=((data['daily'][0].temp.max-273.15)*1.8)+32;
        this.tempMin=((data['daily'][0].temp.min-273.15)*1.8)+32;
      }, (err) => {
        alert("Error al obtener datos de API OpenWeather");
        console.log(err)
      });
  }




}
