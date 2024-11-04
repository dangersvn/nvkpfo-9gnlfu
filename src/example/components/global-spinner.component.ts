import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from 'src/services/loading-service';

@Component({
  selector: 'app-global-spinner',
  standalone: true,
    imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div class="overlay" *ngIf="isLoading$ | async">
      <mat-spinner diameter="50"></mat-spinner>
    </div>
  `,
  styles: [`
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5); /* Adjust opacity as needed */
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000; /* Ensure it's on top */
    }
  `]
})
export class GlobalSpinnerComponent {
  isLoading$ = this.loadingService.isLoading$;

  constructor(private loadingService: LoadingService) { }
}
