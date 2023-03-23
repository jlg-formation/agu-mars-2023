import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles$ = new BehaviorSubject<Article[]>([
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
}
