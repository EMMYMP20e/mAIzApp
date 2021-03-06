import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Mis Cultivos',
      url: '/lista-cultivos',
      icon: 'copy'
    },
    {
      title: 'Nuevo Cultivo',
      url: '/form-cultivo',
      icon: 'duplicate'
    },
    {
      title: 'Detector (IA)',
      url: '/camara-ia',
      icon: 'aperture'
    },
    {
      title: 'Perfil',
      url: '/perfil',
      icon: 'person-circle'
    },
    {
      title: 'Cerrar sesión',
      url: '/login',
      icon: 'log-out'
    }

  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('lista-cultivos')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
