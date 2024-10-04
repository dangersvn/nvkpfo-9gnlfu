export interface ConversationAndFilterConfig {
  conversation: {
    enabled: boolean;
  };
  filter?: {
    enabled: boolean;
    actions: { label: string }[];
    types?: { label: string }[];
  };
}

export interface ConversationAndFilterState {
  conversationOpen: boolean;
  filter?: {
    actions: string[];
    types: string[];
  };
}


export const DEFAULT_CONVERSATION_AND_FILTER_CONFIG: ConversationAndFilterConfig = {
    conversation: { enabled: false },
    filter: { enabled: false, actions: [{label: "Show Resolved"}], types: [] }
};
export const DEFAULT_CONVERSATION_AND_FILTER_STATE: ConversationAndFilterState = {
    conversationOpen: false,
    filter: { actions: [], types: [] }
}