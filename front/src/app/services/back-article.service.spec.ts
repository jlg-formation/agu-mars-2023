import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BackArticleService } from './back-article.service';

describe('BackArticleService', () => {
  let service: BackArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BackArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
