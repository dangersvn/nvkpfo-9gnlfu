import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';

interface FooterBarConfig {
  conversation: {
    featureFlag: boolean;
  };
  filter: {
    featureFlag: boolean;
    actions: { label: string }[];
    types?: { label: string }[];
  };
}

interface FooterBarState {
  conversationOpen: boolean;
  filter: {
    actions: string[];
    types: string[];
  };
}

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
  ]
})
export class FooterBarComponent {
  @Input() config: FooterBarConfig = {
    conversation: {
      featureFlag: true
    },
    filter: {
      featureFlag: false,
      actions: [{label: "Show Resolved"}],
      types: []
    }
  };
  @Output() stateChange = new EventEmitter<FooterBarState>();

  public state: FooterBarState = {
    conversationOpen: true,
    filter: {
      actions: [],
      types: []
    }
  };

  onConversationToggle(event: MatSlideToggleChange): void {
    this.state.conversationOpen = event.checked;
    this.emitState();
  }

  onFilterChange(filterType: 'actions' | 'types', label: string, checked: boolean): void {
    if (checked) {
      this.state.filter[filterType].push(label);
    } else {
      const index = this.state.filter[filterType].indexOf(label);
      if (index > -1) {
        this.state.filter[filterType].splice(index, 1);
      }
    }
    this.emitState();
  }

  private emitState(): void {
    this.stateChange.emit(this.state);
    
  }
}
