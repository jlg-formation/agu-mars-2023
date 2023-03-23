import { Component, OnDestroy } from '@angular/core';
import { ArticleService } from '../services/article.service';
import {
  faRotateRight,
  faPlus,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Article } from '../interfaces/article';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnDestroy {
  faPlus = faPlus;
  faRotateRight = faRotateRight;
  faTrashAlt = faTrashAlt;
  selectArticles = new Set<Article>();

  constructor(protected readonly articleService: ArticleService) {
    console.log('articleService: ', articleService);
  }

  ngOnDestroy(): void {
    console.log('au revoir...');
  }

  select(a: Article) {
    if (this.selectArticles.has(a)) {
      this.selectArticles.delete(a);
      return;
    }
    this.selectArticles.add(a);
  }
}
