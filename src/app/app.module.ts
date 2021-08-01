import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

// componente page
import { AppComponent } from './app.component';

// importacion http modul : para hacer peticiones http .
// mi servicio se prove desde root - asi el servicio leera este modul pricipal y importe en el mismo el modulo y lo usa
import { HttpClientModule } from '@angular/common/http';





@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
