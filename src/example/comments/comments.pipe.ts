import { Pipe, PipeTransform } from '@angular/core';
import { TabEntry } from './data.model';

@Pipe({
  name: 'organizeComments',
})
export class OrganizeCommentsPipe implements PipeTransform {
  transform(
    tabEntries: TabEntry[],
    filters: { [key: string]: any }
  ): TabEntry[] {
    if (!tabEntries || !filters) {
      return tabEntries;
    }

    return tabEntries
      .map((tab) => ({
        ...tab,
        associatedPages: tab.associatedPages
          .map((page) => ({
            ...page,
            conversations: page.conversations.filter((conversation) => {
              if (filters.state === 'hideResolved') {
                return conversation.state.toLowerCase() !== 'resolved';
              } else if (filters.state === 'showAll') {
                return true;
              } else {
                return false;
              }
            }),
          }))
          .filter((page) => page.conversations.length > 0),
      }))
      .filter((tab) => tab.associatedPages.length > 0);
  }
}
