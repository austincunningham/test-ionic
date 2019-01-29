import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

//==========================add the following lines of code=====================
import { init } from "@aerogear/app";
import { Auth } from "@aerogear/auth";

const appConfig = require("./mobile-services.json");
init(appConfig);

const authService = new Auth();
//let initOptions = { onLoad: "login-required" };

authService.init({ onLoad: "login-required" })
.then(() => {
    // successful init & authentication
    console.log('keycloak init');
})
.catch((err) => {
    // initialization error
    console.log('keycloak init failure', err);
});

//========================end of code block======================================
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
