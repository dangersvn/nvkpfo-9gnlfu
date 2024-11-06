import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { GlobalSpinnerComponent } from 'src/example/components/global-spinner.component';

@Component({
  selector: 'app-narrative',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, GlobalSpinnerComponent],
  templateUrl: './narrative.component.html',
  styleUrl: './narrative.component.scss'
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

  @HostListener('window:scroll', [])
  checkSticky() {
    const stickyElement = document.querySelector('.sticky-action-buttons');
    if (stickyElement) {
      const stickyOffset = (stickyElement as HTMLElement).offsetTop;
      this.isSticky = window.pageYOffset >= stickyOffset;
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
    }, 2000); // Simulate 2-second delay
  }
}
