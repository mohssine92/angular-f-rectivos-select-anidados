import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisSmall } from '../../interfaces/paises.interface';
import { PaisesService } from '../../services/paises.service';
import { switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';



// las paginas son tambien componentes
@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {


  /*creacion de mi formulario Reactivo - this.fb.group : es decir va ser nuevo groupo :nuevo form con elementos hijos
   * asi este form Rectivo sera sociado a un form html
   * se recomienda en la doc de angular hacer auqe la inicializacion del mismo - pero hay desarolladores lo inician en el ngInit
  */
  miFormulario: FormGroup = this.fb.group({
    //definitions de los controles del valor objeto formulario
    region  : ['', Validators.required ],//compo form region : se asocia al html con form controlname . su valor inicial es "" : asi value con "" sera seleccionado por default
    pais    : ['' , Validators.required ], // control opcion seleccionada
    frontera: ['', Validators.required ],
  }) // otra opcion es validacion perzonalizada : sera disabled por defecto y cuando tenemos mas elementos se habilita
     // ver seccion anterir para resolver por esta manera
     // la forma que estamos usando dejerlo siempre habilitado , pero paraque se pinta acondicion de la coleccion de las opciones obtenida por servicios


   /* llenar selectores
    *
   */
   regiones : string[]    = [];
   paises   : PaisSmall[] = []; // opciones = x control pais
   //fronteras: string[]    = []
   fronteras: PaisSmall[] = []

   // UI
    cargando: boolean = false;





  constructor(private fb: FormBuilder, // servicio para controls de form rective
              private paisesService: PaisesService // service para obtencion de infromacion de ResApi

  ) { }



  /* usualmente cuando queremos traer data de algun servicio eso se hace en el ngOnit :
   * porque el componente se crea , hacemos la peticon y podemos trabajar con html porque ya esta inicializado
   * en la siguiente seccion hablaremos sobre el cilo de vida de todos componetes de angular
   *
   */
  ngOnInit(): void {
    // noten no puedo acceder a las props de la injeccion privadas _regiones por ej
    this.regiones = this.paisesService.regiones;


    // ...valuechanege es un Observable : se inicia al momento de carga del componente (gracias ngOnit) , emite valor cada vez se cambia el control geteado
    this.miFormulario.get('region')?.valueChanges // primer observable
        .pipe( // me permite implemetar operadores .

          tap(() => {
              // en el momento yo vambio region . pongo ui en estado decarga , la quito del cuando tengo ya la data
            this.cargando = true


          }),
          tap( ( _ ) => { //region , _ : para decir no me interesa lo que venga alli
             // purgar un control del form rective
              this.miFormulario.get('pais')?.reset('')

               //otra opcion de habilitar y desabilitar vamos jugando depende de la seleccion
               //this.miFormulario.get('pais')?.disable();
               //this.miFormulario.get('pais')?.enable();


          }), // operador : dispara efecto segundario

          //switchmap operador RXjs : toma valor producto de un Observable a su vez lo muta y regresa valor de otra Observable
          switchMap( region =>  this.paisesService.getPaisesPorRegion( region ) )// segunda Observable



        )
        .subscribe( paises => {

          this.paises = paises || []; // eb caso vuelvo a seleccionar ''
          this.cargando = false; // ui

        }) // con la misma instruccion podemos hacer x cantida de select anidados 2 ,3 5 8 etc...



    // segundo selct anidado :cuando cambia el pais
    this.miFormulario.get('pais')?.valueChanges // lo que se getea el value del select - no html
         .pipe(

          tap(() => {
            // en el momento yo vambio region . pongo ui en estado decarga , la quito del cuando tengo ya la data
            this.cargando = true

          }),
          tap( ( ) => {

             this.miFormulario.get('frontera')?.reset('')

          }),

          switchMap( codigoPais =>  this.paisesService.getPaisPorCodigo( codigoPais ) ),


          // recibe coleccion de code de paises de fontera y resuelva
          //VARIAS peticiones y atraves de una funcion de rxjs  , y me returna coleccion producto de todas peticiones como Observable
          switchMap( pais => this.paisesService.getPaisesPorCodigos( pais?.borders! ) )

         )
         .subscribe(( paises ) => { // paies de frontera

          // this.fronteras = pais?.borders || []; // en caso que regresa nul - hay paises que no tienen fronteras como japon

           this.fronteras = paises;
           console.log(paises)
           this.cargando = false;



         })



  }

  guardar(){
     console.log(this.miFormulario.value)

  }












}
