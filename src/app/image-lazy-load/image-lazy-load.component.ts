import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-lazy-load',
  template: `
    <div class="header">
      <h1>Lazy Loaded Images</h1>
    </div>
    <img
      [src]="isIntersecting ? imageUrl : ''"
      [attr.data-src]="imageUrl"
      [class.loaded]="isIntersecting"
    />
  `
})
export class ImageLazyLoadComponent implements OnInit {
  imageUrl = 'https://example.com/image.jpg';
  isIntersecting = false;
  private observer: IntersectionObserver;
  headerElement: HTMLElement | null = null;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.setupIntersectionObserver();
    this.initializeHeaderElement();
  }

  private initializeHeaderElement() {
    this.headerElement = this.elementRef.nativeElement.querySelector('.header');
    if (this.headerElement) {
      // You can perform operations on the header element here
      this.headerElement.style.backgroundColor = '#f0f0f0';
    }
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.isIntersecting = entry.isIntersecting;
      });
    }, options);

    this.observer.observe(this.elementRef.nativeElement);
  }

  getHeaderText(): string {
    return this.headerElement?.textContent?.trim() || '';
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}