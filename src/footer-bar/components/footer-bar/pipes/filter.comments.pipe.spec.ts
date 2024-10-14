import { FilterConversationsPipe } from './filter-conversations.pipe';

describe('FilterConversationsPipe', () => {
  let pipe: FilterConversationsPipe;

  beforeEach(() => {
    pipe = new FilterConversationsPipe();
  });

  it('should filter conversations by status and isNew', () => {
    const data = new Map<string, Conversation[]>([
      ['user1', [
        { state: 'Open', isNew: true, messages: [] },
        { state: 'Resolved', isNew: false, messages: [] },
        { state: 'Open', isNew: false, messages: [] }
      ]],
      ['user2', [
        { state: 'Resolved', isNew: true, messages: [] },
        { state: 'Open', isNew: true, messages: [] }
      ]]
    ]);

    const statuses = ['Open', 'Resolved'];
    const result = pipe.transform(data, statuses);

    expect(result.size).toBe(2);
    expect(result.get('user1')!.length).toBe(1);
    expect(result.get('user1')![0]).toEqual({ state: 'Open', isNew: true, messages: [] });
    expect(result.get('user2')!.length).toBe(2);
    expect(result.get('user2')![0]).toEqual({ state: 'Resolved', isNew: true, messages: [] });
    expect(result.get('user2')![1]).toEqual({ state: 'Open', isNew: true, messages: [] });
  });

  it('should filter out keys with no matching conversations', () => {
    const data = new Map<string, Conversation[]>([
      ['user1', [
        { state: 'Open', isNew: false, messages: [] },
        { state: 'Resolved', isNew: false, messages: [] }
      ]],
      ['user2', [
        { state: 'Resolved', isNew: false, messages: [] },
        { state: 'Open', isNew: false, messages: [] }
      ]]
    ]);

    const statuses = ['Open', 'Resolved'];
    const result = pipe.transform(data, statuses);

    expect(result.size).toBe(0);
  });

  it('should return an empty map if no data is passed', () => {
    const data = new Map<string, Conversation[]>();
    const statuses = ['Open', 'Resolved'];
    const result = pipe.transform(data, statuses);

    expect(result.size).toBe(0);
  });
});
