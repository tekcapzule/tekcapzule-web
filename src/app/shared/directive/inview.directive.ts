import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appInView]'
})
export class InViewDirective {
  @Output() inView: EventEmitter<any> = new EventEmitter<boolean>();

  constructor(private el: ElementRef) {}

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    this.checkVisibility();
  }

  ngAfterViewInit(): void {
    this.checkVisibility();
  }

  private checkVisibility(): void {
    const element = this.el.nativeElement;
    const rect = element.getBoundingClientRect();
    console.log('rect', rect);
    console.log('-----', window.innerHeight , document.documentElement.clientHeight);
    console.log('----', element.scrollTop, element.scrollY)
    //console.log('this.el.nativeElement', this.el.nativeElement.id);
    const inView = (
      rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );

    this.inView.emit({inView, id: this.el.nativeElement.id});
  }
}
