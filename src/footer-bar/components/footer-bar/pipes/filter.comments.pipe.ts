import { Pipe, PipeTransform } from '@angular/core';

interface Conversation {
  state: string;
  isNew: boolean;
  messages?: Message[];
}

@Pipe({
  name: 'filterConversations'
})
export class FilterConversationsPipe implements PipeTransform {
  transform(data: Map<string, Conversation[]>, statuses: string[]): Map<string, Conversation[]> {
    const result = new Map<string, Conversation[]>();

    data.forEach((conversations, key) => {
      const filteredConversations = conversations.filter(conversation => 
        statuses.includes(conversation.state) && conversation.isNew
      );

      if (filteredConversations.length > 0) {
        result.set(key, filteredConversations);
      }
    });

    return result;
  }
}
