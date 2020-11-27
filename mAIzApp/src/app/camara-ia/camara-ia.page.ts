import { WebServiceService } from './../services/web-service.service';
import { ApiClimaService } from './../services/api-clima.service';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { importType } from '@angular/compiler/src/output/output_ast';
import { toSegments } from '@ionic/angular/directives/navigation/stack-utils';


@Component({
  selector: 'app-camara-ia',
  templateUrl: './camara-ia.page.html',
  styleUrls: ['./camara-ia.page.scss'],
})
export class CamaraIaPage implements OnInit {

  private options: CameraOptions;
  public foto: any;
  public foto64: any;
  public loadFoto64: any;
  public etapa:any;
  public pic:any;

  public servidor: WebServiceService;

  constructor(private camera: Camera, servidor: WebServiceService, private api: ApiClimaService, private loadingCtrl: LoadingController) {
    this.options = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.servidor = servidor;

    /*let img = new Image();
    let url = '../../assets/foto.jpg'
    img.src = url;
    
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    // Set width and height
    canvas.width = img.width;
    canvas.height = img.height;
    // Draw the image
    ctx.drawImage(img, 0, 0);
    const loadFoto = canvas.toDataURL('image/jpg');
    console.log(loadFoto);*/

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

  getOpcionesDeCamara() {
    var opcionesCamara;
    opcionesCamara = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }
    return opcionesCamara;
  }



  tomarFoto() {
    this.camera.getPicture(this.options).then((imageData) => {
      this.foto = 'data:image/jpeg;base64,' + imageData;
      this.foto64 = imageData;
    }, (err) => {
      console.log("Error en fotografía: " + err);
    });
  }

  foto_64() {
    this.options=this.getOpcionesDeCamara();
    this.camera.getPicture(this.options).then((imageData) => {
      this.pic = 'data:image/jpg;base64,' + imageData;
      console.log(imageData)
      this.loadFoto64 = imageData;
    }, (err) => {
      console.log("Error en fotografía: " + err);
    });
  }


  async postImagen() {
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
      "Base64": this.loadFoto64
    }
    this.servidor.enviarDatos(datos, "/imagen").pipe(
      finalize(() => loading.dismiss())
    ).subscribe((data) => {
      alert(data);
      console.log(data)
      this.pic= 'data:image/jpg;base64,' + data['Base64Respuesta'];
      this.etapa=data['Detecciones'];
    }, (err) => {
      alert("Fallo" + err);
      console.log(err)
    });
  }






}
