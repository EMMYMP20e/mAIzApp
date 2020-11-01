import { WebServiceService } from './../services/web-service.service';
import { ApiClimaService } from './../services/api-clima.service';
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

  constructor(private camera: Camera, servidor: WebServiceService, private api :ApiClimaService) {
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
  tomarFoto() {
    this.camera.getPicture(this.options).then((imageData) => {
      this.foto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log("Error en fotografía: " + err);
    });
  }

  getRequest() {
    this.servidor.dameDatos("/CORS").subscribe((data) => {
      alert(data);
      console.log(data)
    }, (err) => {
      alert("Fallo" + err);
      console.log(err)
    });
  }
  postRequest() {
    var datos = {
      "IDAlumno": 69,
      "NombreAlumno": "Mia khalifa",
    }
    this.servidor.enviarDatos(datos, "/CORS").subscribe((data) => {
      alert(data);
      console.log(data)
    }, (err) => {
      alert("Fallo" + err);
      console.log(err)
    });
  }

  getApi(){
    var datos = {
      lat: 19.994076,
      lon:-102.294526,
      exclude:'minutely,hourly,alerts'
    }
    this.api.dameDatos(datos).subscribe((data) => {
      alert(data);
      console.log(data)
    }, (err) => {
      alert("Fallo" + err);
      console.log(err)
    });
  }


}
