import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[noUtf8Input]'
})
export class NoUtf8InputDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: KeyboardEvent) {
    const regex = /[^\w\s\-\.]/gi;
    const input = this.el.nativeElement.value;
    const matches = input.match(regex);
    if (matches !== null) {
      // Remove all non-word, non-space, non-hyphen, and non-dot characters
      this.el.nativeElement.value = input.replace(regex, '');
    }
  }
}
