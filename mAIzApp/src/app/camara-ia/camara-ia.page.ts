import { WebServiceService } from './../services/web-service.service';
import { ApiClimaService } from './../services/api-clima.service';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-camara-ia',
  templateUrl: './camara-ia.page.html',
  styleUrls: ['./camara-ia.page.scss'],
})
export class CamaraIaPage implements OnInit {

  private options: CameraOptions;
  public foto: any;
  public foto64: any;

  public servidor: WebServiceService;

  constructor(private camera: Camera,  servidor: WebServiceService, private api: ApiClimaService, private loadingCtrl: LoadingController) {
    this.options = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.servidor = servidor;

    /*const loading = await this.loader.create({
      animated: true,
      spinner: 'dots',
      message: 'Verificando credenciales de acceso.',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: false
    });*/
  }

  ngOnInit() {
  }
  tomarFoto() {
    this.camera.getPicture(this.options).then((imageData) => {
      this.foto = 'data:image/jpeg;base64,' + imageData;
      this.foto64=imageData;
    }, (err) => {
      console.log("Error en fotografía: " + err);
    });
  }

  async getRequest() {
    const loading = await this.loadingCtrl.create({
      animated: true,
      spinner: 'dots',
      message: 'Accesando Servidor',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: false
    });
    await loading.present()
    
    this.servidor.dameDatos("/CORS").pipe(
      finalize(() => loading.dismiss())
    ).subscribe((data) => {
      alert(data);
      console.log(data)
    }, (err) => {
      alert("Fallo" + err);
      console.log(err)
    });
  }
  async postRequest() {
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
      "IDAlumno": 69,
      "NombreAlumno": "Mia khalifa",
    }
    this.servidor.enviarDatos(datos, "/CORS").pipe(
      finalize(() => loading.dismiss())
    ).subscribe((data) => {
      alert(data);
      console.log(data)
    }, (err) => {
      alert("Fallo" + err);
      console.log(err)
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
      lat: 19.994076,
      lon: -102.294526,
      exclude: 'minutely,hourly,alerts'
    }
    this.api.dameDatos(datos).pipe(
      finalize(() => loading.dismiss())
    )
      .subscribe((data) => {
        alert(data);
        console.log(data)
      }, (err) => {
        alert("Fallo" + err);
        console.log(err)
      });
  }

  async postImagen(){
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
      "Base64": this.foto64
    }
    this.servidor.enviarDatos(datos, "/imagen").pipe(
      finalize(() => loading.dismiss())
    ).subscribe((data) => {
      alert(data);
      console.log(data)
    }, (err) => {
      alert("Fallo" + err);
      console.log(err)
    });
  }

  async getRegistros(){
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
      "IDUser":1,
      "IDPlantio":1
    }
    this.servidor.enviarDatos(datos, "/obtenerRegistros").pipe(
      finalize(() => loading.dismiss())
    ).subscribe((data) => {
      alert(data);
      console.log(data)
    }, (err) => {
      alert("Fallo" + err);
      console.log(err)
    });
  }

  async getPlantios(){
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
      "IDUsuario":1
    }
    this.servidor.enviarDatos(datos, "/obtenerPlantios").pipe(
      finalize(() => loading.dismiss())
    ).subscribe((data) => {
      alert(data);
      console.log(data)
    }, (err) => {
      alert("Fallo" + err);
      console.log(err)
    });
  }


}
