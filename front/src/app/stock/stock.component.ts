import { Component, OnDestroy } from '@angular/core';
import { Article } from '../interfaces/article';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnDestroy {
  articles: Article[] = [
    { id: 'a1', name: 'Pelle', price: 3.99, qty: 123 },
    { id: 'a2', name: 'Marteau', price: 5, qty: 34 },
  ];

  ngOnDestroy(): void {
    console.log('au revoir...');
  }
}
