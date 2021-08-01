import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SelectorPageComponent } from './pages/selector-page/selector-page.component';

// configuracion de rootas hijas

const routes: Routes = [
  { // en la carga de lazyload ,en las rutas princiaples - este modulo estara asociado a un url
    path: '',
    children: [
      { path: 'selector', component: SelectorPageComponent },
      { path: '**', redirectTo: 'selector' },
    ]
  }

];




@NgModule({
  // forchild se usa para configuracion de rootas hijas
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})
export class PaisesRoutingModule { }

