import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// importacion de module de form Reactivo
import { ReactiveFormsModule } from '@angular/forms';

// rutas hijas : rutas de este module
import { PaisesRoutingModule } from './paises-routing.module';

// componente pagina
import { SelectorPageComponent } from './pages/selector-page/selector-page.component';








@NgModule({
  declarations: [
    SelectorPageComponent

  ],
  imports: [

    CommonModule,
    ReactiveFormsModule,
    PaisesRoutingModule

  ]

})
export class PaisesModule { }
