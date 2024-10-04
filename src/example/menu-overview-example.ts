import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { FilterCardComponent } from './filter-card.component';
import { FooterBarComponent } from 'src/footer-bar/components/footer-bar/footer-bar.component';
import { ConversationAndFilterConfig } from 'src/footer-bar/components/footer-bar/conversation-filter.model';
import { PageLevelSaveService } from './../footer-bar/components/footer-bar/page-level-save.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

/**
 * @title Basic menu
 */
@Component({
  selector: 'menu-overview-example',
  templateUrl: './menu-overview-example.html',
  styleUrls: ['./menu-overview-example.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    FilterCardComponent,
    FooterBarComponent
  ],
})
export class MenuOverviewExample implements OnInit, OnDestroy {

  private configSubscription: Subscription;

  constructor(public pageLevelSaveService: PageLevelSaveService) { }

  ngOnInit() {

  }

  ngOnDestroy() {
    if (this.configSubscription) {
      this.configSubscription.unsubscribe();
    }
  }

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

  // Sample method to update the config
  updateConfig(convesrsationEnabled: boolean, filterEnabled: boolean, actions: { label: string }[] = [{ label: "Show Resolved" }], types: { label: string }[] = []) {
    const newConfig: ConversationAndFilterConfig = {
      conversation: {
        enabled: convesrsationEnabled,
      },
      filter: {
        enabled: filterEnabled,
        actions,
        types
      },
    };
    this.pageLevelSaveService.updateConversationAndFilterConfig(newConfig);
  }
}

/**  Copyright 2024 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
