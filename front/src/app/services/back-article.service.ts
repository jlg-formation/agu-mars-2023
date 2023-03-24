import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Article } from '../interfaces/article';
import { ArticleService } from './article.service';

const url = 'http://localhost:3000/api/articles';

@Injectable({
  providedIn: 'root',
})
export class BackArticleService extends ArticleService {
  constructor(private readonly http: HttpClient) {
    super();
    console.log('instantiate back-end service');
    this.loadArticles().subscribe();
  }

  loadArticles(): Observable<void> {
    return this.http.get<Article[]>(url).pipe(
      map((articles) => {
        this.articles$.next(articles);
        return;
      })
    );
  }
}
