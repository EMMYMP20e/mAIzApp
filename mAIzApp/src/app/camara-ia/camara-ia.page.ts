import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-camara-ia',
  templateUrl: './camara-ia.page.html',
  styleUrls: ['./camara-ia.page.scss'],
})
export class CamaraIaPage implements OnInit {

  private options: CameraOptions;
  public foto: any;

  constructor( private camera: Camera ) {
    this.options = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
   }

  ngOnInit() {
  }
  tomarFoto(){
    this.camera.getPicture(this.options).then((imageData) => {
      this.foto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log("Error en fotografía: " + err);
    });
  }

}
