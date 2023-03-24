import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutofocus]',
})
export class AutofocusDirective implements OnInit {
  constructor(private readonly elt: ElementRef<HTMLInputElement>) {
    console.log('appAutofocus instantiated');
  }
  ngOnInit(): void {
    this.elt.nativeElement.select();
  }
}
