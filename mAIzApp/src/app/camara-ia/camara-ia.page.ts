import { WebServiceService } from './../services/web-service.service';
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

  public servidor: WebServiceService;

  constructor( private camera: Camera, servidor: WebServiceService ) {
    this.options = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.servidor = servidor;
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

  getRequest(){
    this.servidor.dameDatos("/alumnos").subscribe(
			(data) => {
				if (data[0].bn == 1) {
					console.log(data)
				}
				else {
					console.log("Error en get")
				}
			});
  }
  postRequest(){
    var datos={
      "IDAlumno" : "69",
      "NombreAlumno":"Scarlett Johanson",
    }
    this.servidor.enviarDatos(datos, "/alumnos").subscribe(
			(data) => {
				if (data[0].bn == 1) {
					console.log(data)
				}
				else {
					console.log("Error en post")
				}
			});
  }


}
