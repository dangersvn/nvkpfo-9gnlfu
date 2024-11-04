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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import { GlobalSpinnerComponent } from './components/global-spinner.component';
import { LoadingService } from 'src/services/loading-service';
import { DisableWhileLoadingDirective } from 'src/services/loading.direction';
import { DummyService } from 'src/services/dummy.service';
import { NarrativeComponent } from 'src/app/narrative/narrative.component';

/**
 * @title Basic menu    Loading
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
    MatProgressSpinnerModule,
    FilterCardComponent,
    FooterBarComponent,
    GlobalSpinnerComponent,
    DisableWhileLoadingDirective,
    NarrativeComponent
  ],
})
export class MenuOverviewExample implements OnInit, OnDestroy {

  private configSubscription: Subscription;

  constructor(private dummyService: DummyService, protected loadingService: LoadingService, public pageLevelSaveService: PageLevelSaveService) { }

  ngOnInit() {//virginia
    this.updateConfig(true, true, [{ label: 'Show Resolved' }])

    this.dummyService.getData().subscribe(_=> {
      console.log("Data from dummy service: ", _)
    }, error => {console.log("Error dummy service: ", error)})

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
  

click() {
  this.dummyService.getData().subscribe(_=> {
    console.log("Data from dummy service: ", _)
  }, error => {console.log("Error dummy service: ", error)})
}
}

/**  Copyright 2024 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
