import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  delay,
  distinctUntilChanged,
  Observable,
  of,
  tap,
} from 'rxjs';
import { generateId } from 'src/misc';
import { Article, NewArticle } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  isLoading = false;
  errorMsg = '';
  protected articles$ = new BehaviorSubject<Article[]>([]);

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
