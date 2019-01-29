import { Jewko, Jewelry } from './jew';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MassageService } from './massage.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class HeroDetailService {
  private jewelryUrl = 'http://0.0.0.0:8000/api/rest-app/list-jewelry/';
  headers: HttpHeaders;
  constructor(
    private http: HttpClient,
    private massageService: MassageService) {
      this.headers = new HttpHeaders()
          .set('X-Requested-With', 'XMLHttpRequest')
          .set('Content-Type', 'application/json');
    }
  getJewes(): Observable<any[]> {
    return this.http.get<any[]>(this.jewelryUrl).pipe(
      tap(_ => this.log('fetched jewelry')),
      catchError(this.handleError('getJewes', []))
    );
  }

  getJewelry(id?: string): Observable<Jewelry[]> {
    let para = new HttpParams();
    para = para.append('type', id);
    return this.http.get<any>(this.jewelryUrl, {headers: this.headers, responseType: 'json', params: para}).pipe(
      map(respo => respo as any), tap(_ => this.log(`fetched jewelry id=${id}`)),
      catchError(this.handleError<Jewko>(`getJewko id=${id}`))
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
  updateJewelry (jewelry: Jewelry): Observable<any> {
    console.log(jewelry);
    const url = `http://0.0.0.0:8000/api/rest-app/jew-viewset/${jewelry.id}/`;
    return this.http.put(url, jewelry, httpOptions).pipe(
      tap(_ => this.log(`update jew id=${jewelry.jew_name}`)),
      catchError(this.handleError<any>(`updateHero`))
    );
  }
  deleteJewelry (jewelry: Jewelry): Observable<Jewelry> {
   // const id = typeof jewelry === 'number' ? jewelry : jewelry.id;
   let id = '';
   if (typeof jewelry === 'number') {
     id = jewelry;
   } else {
     id = jewelry.id;
   }
    const url = `http://0.0.0.0:8000/api/rest-app/jew-viewset/${jewelry.id}/`;
    return this.http.delete<Jewelry>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted jewelry id=${id}`)),
      catchError(this.handleError<Jewelry>('deleteJewelry'))
    );
  }

}
