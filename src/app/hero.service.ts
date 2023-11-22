import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ClassHero } from './hero';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
      private http: HttpClient,
      private messageService: MessageService) { }

  /** GET heroes from the server */
  getHeroes(): Observable<ClassHero[]> {
    return this.http.get<ClassHero[]>(this.heroesUrl)
        .pipe(
            tap(_ => this.log('fetched heroes')),
            catchError(this.handleError<ClassHero[]>('getHeroes', []))
        );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<ClassHero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<ClassHero[]>(url)
        .pipe(
            map(heroes => heroes[0]), // returns a {0|1} element array
            tap(h => {
              const outcome = h ? 'fetched' : 'did not find';
              this.log(`${outcome} hero id=${id}`);
            }),
            catchError(this.handleError<ClassHero>(`getHero id=${id}`))
        );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<ClassHero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<ClassHero>(url).pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<ClassHero>(`getHero id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<ClassHero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<ClassHero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
        tap(x => x.length ?
            this.log(`found heroes matching "${term}"`) :
            this.log(`no heroes matching "${term}"`)),
        catchError(this.handleError<ClassHero[]>('searchHeroes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addHero(hero: ClassHero): Observable<ClassHero> {
    return this.http.post<ClassHero>(this.heroesUrl, hero, this.httpOptions).pipe(
        tap((newHero: ClassHero) => this.log(`added hero w/ id=${newHero.id}`)),
        catchError(this.handleError<ClassHero>('addHero'))
    );
  }

  deleteHero(id: number): Observable<ClassHero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<ClassHero>(url, this.httpOptions).pipe(
        tap(_ => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<ClassHero>('deleteHero'))
    );
  }

  /** PUT: update the hero on the server */
  updateHero(hero: ClassHero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
