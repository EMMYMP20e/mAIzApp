import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-cultivo',
  templateUrl: './form-cultivo.page.html',
  styleUrls: ['./form-cultivo.page.scss'],
})
export class FormCultivoPage implements OnInit {
  public formAgregarCultivo: any;

  public nombre: any;
  public ubicacion: any;
  public fecha_inicio: any;
  public gdd_acumulados: any;
  public etapa_vegetativa: any;

  public fecha:any;

  constructor(private formBuilder: FormBuilder) {
    this.formAgregarCultivo = this.formBuilder.group({
      nombre: ['', Validators.required],
      ubicacion: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      gdd_acumulados: ['', ],
      etapa_vegetativa: ['',],
    });

    var desface = (new Date()).getTimezoneOffset() * 60000;
    var localISOTime = (new Date(Date.now() - desface)).toISOString().slice(0, -1);
    //----------------------------
    this.fecha = localISOTime;
  }

  ngOnInit() {
  }

  guardarCultivo() {

  }

}
