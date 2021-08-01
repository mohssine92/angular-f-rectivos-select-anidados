import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



/* aqui configuracion de las rutas principales de la app
 *
*/
const routes: Routes = [
  { // esta ruta carga modulo con rutas hijas : tecnica usada lazyload
    path: 'selector',
    loadChildren: () => import('./paises/paises.module').then( m => m.PaisesModule )
  },
  { path: '**', redirectTo: 'selector' }


];





@NgModule({
  imports: [RouterModule.forRoot( routes )], // rutas principales : solo hay un forRoot en la app
  exports: [RouterModule]
})
export class AppRoutingModule { }
