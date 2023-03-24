import { Component, OnDestroy } from '@angular/core';
import {
  faCircleNotch,
  faPlus,
  faRotateRight,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { catchError, finalize, of, switchMap, tap } from 'rxjs';
import { Article } from '../interfaces/article';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnDestroy {
  errorMsg = '';
  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  faRotateRight = faRotateRight;
  faTrashAlt = faTrashAlt;
  isRemoving = false;
  isRefreshing = false;
  selectArticles = new Set<Article>();

  constructor(protected readonly articleService: ArticleService) {
    console.log('articleService: ', articleService);
  }

  ngOnDestroy(): void {
    console.log('au revoir...');
  }

  refresh() {
    console.log('refresh');
    of(undefined)
      .pipe(
        tap(() => {
          this.errorMsg = '';
          this.isRefreshing = true;
        }),
        switchMap(() => {
          return this.articleService.refresh();
        }),
        finalize(() => {
          this.isRefreshing = false;
        }),
        catchError((err) => {
          console.log('err: ', err);
          this.errorMsg = err.message;
          return of(undefined);
        })
      )
      .subscribe();
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

  getErrorMsg() {
    if (this.errorMsg !== '') {
      return this.errorMsg;
    }
    return this.articleService.errorMsg;
  }
}
