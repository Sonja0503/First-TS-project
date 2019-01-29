import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MassageService } from './massage.service';
import { Injectable } from '@angular/core';
import { Hero, Jewelry, Storage } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';
  private drfUrl = 'http://0.0.0.0:8000/api/rest-app/list-jewelrytype/';
  headers: HttpHeaders;
  constructor(
    private http: HttpClient,
    private massageService: MassageService) {
      this.headers = new HttpHeaders()
          .set('X-Requested-With', 'XMLHttpRequest')
          .set('Content-Type', 'application/json');
    }
  getHBezvezeList (id?: string): Observable<any[]> {
    let params = new HttpParams();
    params = params.append('jewelryType', id);
    return this.http.get(this.drfUrl , { headers: this.headers, responseType: 'json', params: params }).pipe(
      map(response => response as any));
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  private log(massage: string) {
    this.massageService.add(`HeroService: ${massage}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.massage}`);
      return of(result as T);
    };
  }

  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`update hero id=${hero.id}`)),
      catchError(this.handleError<any>(`updateHero`))
    );
  }

  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((_hero: Hero) => this.log(`added hero w/ id=${_hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  addJewelry (jewelry: Jewelry): Observable<Jewelry> {
    const url = 'http://0.0.0.0:8000/api/rest-app/jewelry/add/';
    return this.http.post(url, jewelry, {headers: this.headers, responseType: 'json'}).pipe(
      tap((_jewelry: Jewelry) => this.log(`added jewelry w/ name=${_jewelry.artist_name}`)),
      catchError(this.handleError<Jewelry>('addJewelry'))
    );
  }

  addStore (jew: Storage): Observable<Storage> {
    const url = 'http://0.0.0.0:8000/api/rest-app/storage/add/';
    return this.http.post(url, jew, {headers: this.headers, responseType: 'json'}).pipe(
      tap((_jew: Storage) => this.log(`added jewelry name=${_jew.quantity}`)),
      catchError(this.handleError<Storage>('addJew'))
    );
  }

  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
}
