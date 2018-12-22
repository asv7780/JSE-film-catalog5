import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appExtension]'
})
export class ExtensionDirective {
  screenWidth: any;
  class: string;

  constructor(private element: ElementRef, private renderer: Renderer2) {
    this.applyExtensionClass();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.applyExtensionClass();
  }

  private applyExtensionClass() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth >= 1200) {
      this.class = 'col-3';
    } else if (this.screenWidth >= 992 && this.screenWidth < 1200) {
      this.class = 'col-4';
    } else if (this.screenWidth >= 768 && this.screenWidth < 992) {
      this.class = 'col-6';
    } else {
      this.class = 'col-12';
    }

    this.renderer.removeClass(this.element.nativeElement, 'col-3');
    this.renderer.removeClass(this.element.nativeElement, 'col-4');
    this.renderer.removeClass(this.element.nativeElement, 'col-6');
    this.renderer.removeClass(this.element.nativeElement, 'col-12');
    this.renderer.addClass(this.element.nativeElement, this.class);
  }

}
