import { Component, OnDestroy } from '@angular/core';
import { ArticleService } from '../services/article.service';
import {
  faRotateRight,
  faPlus,
  faTrashAlt,
  faCircleNotch,
} from '@fortawesome/free-solid-svg-icons';
import { Article } from '../interfaces/article';
import { catchError, finalize, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnDestroy {
  faPlus = faPlus;
  faRotateRight = faRotateRight;
  faTrashAlt = faTrashAlt;
  faCircleNotch = faCircleNotch;

  isRemoving = false;
  errorMsg = '';

  selectArticles = new Set<Article>();

  constructor(protected readonly articleService: ArticleService) {
    console.log('articleService: ', articleService);
  }

  ngOnDestroy(): void {
    console.log('au revoir...');
  }

  remove() {
    console.log('remove');
    const ids = [...this.selectArticles].map((a) => a.id);
    of(undefined)
      .pipe(
        tap(() => {
          this.errorMsg = '';
          this.isRemoving = true;
        }),
        switchMap(() => {
          return this.articleService.remove(ids);
        }),
        tap(() => {
          this.selectArticles.clear();
        }),
        finalize(() => {
          this.isRemoving = false;
        }),
        catchError((err) => {
          console.log('err: ', err);
          this.errorMsg = err.message;
          return of(undefined);
        })
      )
      .subscribe();
  }

  select(a: Article) {
    if (this.selectArticles.has(a)) {
      this.selectArticles.delete(a);
      return;
    }
    this.selectArticles.add(a);
  }
}
