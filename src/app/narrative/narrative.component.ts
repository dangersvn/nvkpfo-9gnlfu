import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, NgZone } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { GlobalSpinnerComponent } from 'src/example/components/global-spinner.component';

@Component({
  selector: 'app-narrative',
  // standalone: true,
  // imports: [CommonModule, MatProgressSpinnerModule, GlobalSpinnerComponent],
  templateUrl: './narrative.component.html',
  styleUrls: ['./narrative.component.scss']
})
export class NarrativeComponent {
  isLoading = false;
  selectedPage: string;
  pageContent = {
    1: 'Content for Page 1',
    2: 'Content for Page 2',
    3: 'Content for Page 3'
  };
  isSticky = false;
  private headerObserver: IntersectionObserver | null = null;


  constructor(
    private elementRef: ElementRef,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.setupIntersectionObserver();
  }
  setupIntersectionObserver() {

    const headerElement = this.elementRef.nativeElement.querySelector('.header');

    if (headerElement) {
      const options = {
        root: null, // Use viewport as root
        threshold: 0 // Trigger when element is completely out of view
      };

      this.headerObserver = new IntersectionObserver(entries => {
        // this.ngZone.run(() => {
          this.isSticky = !entries[0].isIntersecting;
        });
      // }, options);

      this.headerObserver.observe(headerElement);
    } else {
      console.warn("Element with class 'header' not found.");
    }
  }


  ngOnDestroy() {
    if (this.headerObserver) {
      this.headerObserver.disconnect();
    }
  }

  onPageChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedPage = target.value || '1';
  }

  save() {
    this.isLoading = true;
    // Simulate backend call with a timeout
    setTimeout(() => {
      this.isLoading = false;
      // Handle successful save or display errors as needed
      console.log('Saved!');
    }, 10000); // Simulate 2-second delay
  }
}
