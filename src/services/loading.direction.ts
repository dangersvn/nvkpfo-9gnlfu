import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
    standalone: true,
  selector: '[appDisableWhileLoading]'
})
export class DisableWhileLoadingDirective {
  @Input() set appDisableWhileLoading(isLoading: boolean | null) {
    if (isLoading) {
      this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'true'); // For form elements
      this.renderer.setStyle(this.el.nativeElement, 'pointer-events', 'none'); // For other elements
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '0.5'); // Optional: Visual cue
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
      this.renderer.setStyle(this.el.nativeElement, 'pointer-events', 'auto');
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}
}
