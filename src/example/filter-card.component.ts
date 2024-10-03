import { Component, Output, EventEmitter } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-filter-card',
  templateUrl: './filetr-card.component.html',
  styleUrls: ['./filter-card.component.css'],
  standalone: true,
  imports: [MatCheckboxModule, MatCardModule],
})
export class FilterCardComponent {
  showResolved = false;
  showAll = false;

  @Output() filterChange = new EventEmitter<{
    showResolved: boolean;
    showAll: boolean;
  }>();

  onFilterChange() {
    this.filterChange.emit({
      showResolved: this.showResolved,
      showAll: this.showAll,
    });
  }
}
