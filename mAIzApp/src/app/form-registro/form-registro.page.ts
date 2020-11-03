import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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
  public lat_ubicacion: any;
  public lon_ubicacion: any;
  public etapa_vegetativa: any;

  public fecha: any;


  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) {
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

  }

  ngOnInit() {
  }

  guardarRegistro() {

  }

}
