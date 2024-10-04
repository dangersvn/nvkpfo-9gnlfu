import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConversationAndFilterConfig, ConversationAndFilterState, DEFAULT_CONVERSATION_AND_FILTER_CONFIG, DEFAULT_CONVERSATION_AND_FILTER_STATE } from './conversation-filter.model';

@Injectable({
    providedIn: 'root'
})
export class PageLevelSaveService {

    private conversationAndFilterConfigSubject = new BehaviorSubject<ConversationAndFilterConfig>(DEFAULT_CONVERSATION_AND_FILTER_CONFIG);
    public conversationAndFilterConfig$ = this.conversationAndFilterConfigSubject.asObservable();

    private conversationAndFilterStateSubject = new BehaviorSubject<ConversationAndFilterState>(DEFAULT_CONVERSATION_AND_FILTER_STATE);
    public conversationAndFilterState$ = this.conversationAndFilterStateSubject.asObservable();

    updateConversationAndFilterConfig(newConfig: ConversationAndFilterConfig) {
        this.resetConversationAndFilterState();
        this.conversationAndFilterConfigSubject.next(newConfig);
    }

    getConversationAndFilterConfig(): ConversationAndFilterConfig {
        return this.conversationAndFilterConfigSubject.value;
    }

    updateConversationAndFilterState(newState: Partial<ConversationAndFilterState>): void {
        this.conversationAndFilterStateSubject.next({ ...this.conversationAndFilterStateSubject.value, ...newState });
    }

    getConversationAndFilterState(): ConversationAndFilterState {
        return this.conversationAndFilterStateSubject.value;
    }

    resetConversationAndFilterState(): void {
        // Preserve the conversationOpen state
        // const newState = { ...DEFAULT_CONVERSATION_AND_FILTER_STATE, conversationOpen: this.getConversationAndFilterState().conversationOpen };
        // this.conversationAndFilterStateSubject.next(newState);
        this.conversationAndFilterStateSubject.next(DEFAULT_CONVERSATION_AND_FILTER_STATE);
    }
}
