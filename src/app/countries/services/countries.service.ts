import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Country, Languages } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) { }

  public searchCountryByAlphaCode( code: string ): Observable<Country | null>{         // buscar por id
    const url = `${this.apiUrl}/alpha/${ code }`;
    return this.httpClient.get<Country[]>( url )
      .pipe(
        map( countries => countries.length > 0 ? countries[0] : null),
        catchError( () => of(null) )
      );
  }

  public searchCapital( term:string ): Observable<Country[]>{       // por capital
    const url = `${this.apiUrl}/capital/${term}`;
    return this.httpClient.get<Country[]>( url )
      .pipe(
        // catchError( error => {
        //   console.log(error);
        //   return of([]);
        // })
        catchError( () => of([]) )            //esto es lo de arriba pero resumido. Si ocurre un error devuelvo un array vacio
      );
  }

  public searchCountry( term:string ): Observable<Country[]>{       // por pais
    const url = `${this.apiUrl}/name/${term}`;
    return this.httpClient.get<Country[]>( url )
      .pipe(
        catchError( () => of([]) )
      );
  }

  public searchRegion( region:string ): Observable<Country[]>{      // por Region
    const url = `${this.apiUrl}/region/${region}`;
    return this.httpClient.get<Country[]>( url )
      .pipe(
        catchError( () => of([]) )
      );
  }

}
