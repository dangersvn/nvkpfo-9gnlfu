import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { FilterCardComponent } from './filter-card.component';

/**
 * @title Basic menu
 */
@Component({
  selector: 'menu-overview-example',
  templateUrl: './menu-overview-example.html',
  styleUrls: ['./menu-overview-example.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    FilterCardComponent    
  ],
})
export class MenuOverviewExample {
  data = [
    { column1: 'Data 1', column2: 'Data 2' },
    // Add more data rows
  ];
  isFilterOpen = false;

  openFilter(event: Event) {
    this.isFilterOpen = true;
    event.stopPropagation();
  }

  closeFilter() {
    this.isFilterOpen = false;
  }

  onFilterChange(filters: { showResolved: boolean; showAll: boolean }) {
    console.log('Filter changed:', filters);
    // Handle the filtering logic here
  }
}

/**  Copyright 2024 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
