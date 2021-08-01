import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Pais, PaisSmall } from '../interfaces/paises.interface';







/* class Injectable por cualquier class en la app
 * es un servicio
*/
@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private baseUrl: string = 'https://restcountries.eu/rest/v2'

  // porque privado : recuerad en js todos objetos van a a pasar por referncia : prevenir manipular este objeto en otras classe
  // la clase que lo obtiene por injeccion : obtiene un getter
  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];


  get regiones(): string[] {
    // asi rompemos referencia al objeto _regiones
    return [ ...this._regiones ];
  } // cuando injectamos la class no tendremos acceso a _regiones .



  constructor(private http: HttpClient // este modul me ofrece metodos para hacer peticion http a endpoints

  ) { }

  getPaisesPorRegion( region: string ): Observable<PaisSmall[] | null> {  // primer servicio
    if ( region == "" ) {
      return of(null)
      // como el producto de la funcion madre es observable : emito null atraves de funcion observable
    }

    const url: string = `${ this.baseUrl }/region/${ region }?fields=alpha3Code;name`
    return this.http.get<PaisSmall[]>( url );

  }

  getPaisPorCodigo( codigo: string ): Observable<Pais | null> { // segundo servicio

    if ( !codigo ) {
      return of(null)
      // como el producto de la funcion madre es observable : emito null atraves de funcion observable
    }

    const url = `${ this.baseUrl }/alpha/${ codigo }`;
    return this.http.get<Pais>( url );
  }

  getPaisPorCodigoSmall( codigo: string ): Observable<PaisSmall> {

    const url = `${ this.baseUrl }/alpha/${ codigo }?fields=alpha3Code;name`;
    return this.http.get<PaisSmall>( url );

  }

  // un servico que reciba arreglo completo y generar una coleccion de peticiones hacia end-point
  getPaisesPorCodigos( borders: string[] ): Observable<PaisSmall[]> {

    if ( !borders ) {
      return of([]);
    }

    const peticiones: Observable<PaisSmall>[] = []; // va ser un arreglo de observable que emita el tipo ...

    borders.forEach( codigo => { // borders : codigos de paises

      // aqui no returno Observable , embujo las observable peticion en una coleccion
      // recuerda que las Observables paraque se jecutan y hacer la peticion en este caso , requiere .subscribe
      // pues en este caso solo estoy almacenando las peticiones
      const peticion = this.getPaisPorCodigoSmall( codigo );
      peticiones.push( peticion );

    }); // ahora peticiones esta llena de Ovservables .


    // ayuda a dispara todas peticiones de manera sumultanea
    // esta funcion de rxjs regresa un observable contien un arreglo de todo producto de cada una de sus peticiones enternas
    // es decir recibe coleccon de observables y returna observable con producto de todas en una sola coleccion
    return combineLatest( peticiones );

  }



}




