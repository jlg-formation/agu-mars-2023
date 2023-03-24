import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  delay,
  distinctUntilChanged,
  map,
  Observable,
  of,
  switchMap,
  tap,
  timer,
} from 'rxjs';
import { generateId } from 'src/misc';
import { Article, NewArticle } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  protected articles$ = new BehaviorSubject<Article[]>([
    { id: 'a1', name: 'Pelle', price: 3.99, qty: 123 },
    { id: 'a2', name: 'Marteau', price: 5, qty: 34 },
  ]);

  add(newArticle: NewArticle): Observable<void> {
    return of(undefined).pipe(
      delay(2000),
      tap(() => {
        if (newArticle.name === 'Trucx') {
          throw new Error('Trucx is not permitted.');
        }
        this.articles$.value.push({
          id: generateId(),
          ...newArticle,
        });
        this.articles$.next(this.articles$.value);
      })
    );
  }

  getArticles(): Observable<Article[]> {
    return this.articles$.pipe(distinctUntilChanged());
  }

  refresh(): Observable<void> {
    return of(undefined).pipe(delay(2000));
  }

  remove(ids: string[]): Observable<void> {
    return of(undefined).pipe(
      delay(2000),
      tap(() => {
        if (ids.length === 2) {
          throw new Error("interdit d'enlever 2 articles a la fois");
        }
        this.articles$.next(
          this.articles$.value.filter((a) => !ids.includes(a.id))
        );
      })
    );
  }
}
