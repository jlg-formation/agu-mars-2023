import { TestBed } from '@angular/core/testing';

import { BackArticleService } from './back-article.service';

describe('BackArticleService', () => {
  let service: BackArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
