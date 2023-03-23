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
} from 'rxjs';
import { generateId } from 'src/misc';
import { Article, NewArticle } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private articles$ = new BehaviorSubject<Article[]>([
    { id: 'a1', name: 'Pelle', price: 3.99, qty: 123 },
    { id: 'a2', name: 'Marteau', price: 5, qty: 34 },
  ]);

  constructor() {
    setTimeout(() => {
      this.articles$.value.push({
        id: 'a3',
        name: 'Truc',
        price: 3.99,
        qty: 123,
      });
      this.articles$.next(this.articles$.value);
    }, 2000);
  }

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
}
