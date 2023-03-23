import { Component, OnDestroy } from '@angular/core';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnDestroy {
  constructor(protected readonly articleService: ArticleService) {
    console.log('articleService: ', articleService);
  }

  ngOnDestroy(): void {
    console.log('au revoir...');
  }
}
