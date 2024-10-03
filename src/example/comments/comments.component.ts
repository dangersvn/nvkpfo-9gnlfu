import { Component } from '@angular/core';
import { TabEntry } from './data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  filterText: string = '';
  tabEntries: TabEntry[] = [
    {
      tabName: 'Tab 1',
      associatedPages: [
        {
          pageName: 'Credit approval',
          conversations: [
            {
              state: 'approved',
              messages: [{ text: 'Great job!', timestamp: new Date() }],
              creator: { name: 'Alice' },
            },
            {
              state: 'pending',
              messages: [{ text: 'Needs review', timestamp: new Date() }],
              creator: { name: 'Bob' },
            },
          ],
        },
        {
          pageName: 'Property',
          conversations: [
            {
              state: 'approved',
              messages: [{ text: 'Looks good', timestamp: new Date() }],
              creator: { name: 'Charlie' },
            },
          ],
        },
        {
          pageName: 'Empty Page',
          conversations: [],
        },
      ],
    },
    // More tab entries...
  ];

  applyFilter(filter: string) {
    this.filterText = filter;
  }
}
