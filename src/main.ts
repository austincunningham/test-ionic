import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {Platform} from '@ionic/angular';

// ==========================add the following lines of code=====================
import { init, AeroGearApp } from '@aerogear/app';
import { Auth } from '@aerogear/auth';
const SecurityService = require('@aerogear/security');
let platform: Platform;

const appConfig = require('./mobile-services.json');
const app: AeroGearApp = init(appConfig);
console.log('app: ', app.config);
const appSecurity = new SecurityService.AppSecurity(app.config);
// const authService = new Auth();

appSecurity.clientInit()
.then(clientInit => {
  console.log('INIT DATA :', clientInit);
  if (clientInit.data.disabled) {
    alert('Security Warning :' + clientInit.data.disabledMessage);
    navigator['app'].exitApp();
  }
})
.catch(error => error);


// let initOptions = { onLoad: "login-required" };

// authService.init({ onLoad: "login-required" })
// .then(() => {
//     // successful init & authentication
//     console.log('keycloak init');
// })
// .catch((err) => {
//     // initialization error
//     console.log('keycloak init failure', err);
// });

// ========================end of code block======================================
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
