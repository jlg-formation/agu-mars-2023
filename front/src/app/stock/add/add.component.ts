import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { catchError, finalize, of, switchMap, tap } from 'rxjs';
import { NewArticle } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  isAdding = false;
  f = new FormGroup({
    name: new FormControl('Truc', [
      Validators.required,
      Validators.minLength(3),
    ]),
    price: new FormControl(0, [Validators.required]),
    qty: new FormControl(0, [Validators.required]),
  });
  faPlus = faPlus;
  faCircleNotch = faCircleNotch;
  errorMsg = '';

  constructor(
    private readonly articleService: ArticleService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  submit() {
    console.log('submit');
    const newArticle: NewArticle = this.f.value as unknown as NewArticle;
    of(undefined)
      .pipe(
        tap(() => {
          this.isAdding = true;
          this.errorMsg = '';
        }),
        switchMap(() => {
          return this.articleService.add(newArticle);
        }),
        switchMap(() => {
          return this.articleService.refresh();
        }),
        switchMap(() => {
          return this.router.navigate(['..'], { relativeTo: this.route });
        }),
        finalize(() => (this.isAdding = false)),
        catchError((err) => {
          console.log('err: ', err);
          this.errorMsg = 'Erreur Technique';
          return of(undefined);
        })
      )
      .subscribe();
  }
}
