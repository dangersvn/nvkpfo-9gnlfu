import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { PageLevelSaveService } from './page-level-save.service';
import { ConversationAndFilterConfig, ConversationAndFilterState } from './conversation-filter.model';
import { Observable } from 'rxjs';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-footer-bar',
  templateUrl: './footer-bar.component.html',
  styleUrls: ['./footer-bar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCheckboxModule,
    MatDividerModule,
    FilterComponent
  ]
})
export class FooterBarComponent {
  public conversationAndFilterConfig$: Observable<ConversationAndFilterConfig> 
  public conversationAndFilterState$: Observable<ConversationAndFilterState>;

  constructor(public pageLevelSaveService: PageLevelSaveService) {
    this.conversationAndFilterConfig$ = this.pageLevelSaveService.conversationAndFilterConfig$;
    this.conversationAndFilterState$ = this.pageLevelSaveService.conversationAndFilterState$;
  }

  onConversationToggle(event: MatSlideToggleChange): void {
    this.pageLevelSaveService.updateConversationAndFilterState({ conversationOpen: event.checked });
  }

  onFilterChange(filterType: 'actions' | 'types', label: string, checked: boolean): void {
    const currentState = this.pageLevelSaveService.getConversationAndFilterState();
    if (!currentState.filter) return;

    let updatedFilter = { ...currentState.filter };
    if (checked) {
      updatedFilter[filterType] = [...updatedFilter[filterType], label];
    } else {
      updatedFilter[filterType] = updatedFilter[filterType].filter(item => item !== label);
    }

    this.pageLevelSaveService.updateConversationAndFilterState({ filter: updatedFilter });
  }

  isFilterEnabled(): boolean {
    const config = this.pageLevelSaveService.getConversationAndFilterConfig();
    const state = this.pageLevelSaveService.getConversationAndFilterState();
    return !!config.filter?.enabled && 
            config.conversation.enabled && 
            state.conversationOpen;
  }
}
