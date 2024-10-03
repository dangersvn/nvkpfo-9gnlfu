import { OrganizeCommentsPipe } from './organize-comments.pipe';
import { TabEntry } from './data.model';

describe('OrganizeCommentsPipe', () => {
  let pipe: OrganizeCommentsPipe;

  const mockTabEntries: TabEntry[] = [
    {
      tabName: 'Tab 1',
      associatedPages: [
        {
          pageName: 'Credit approval',
          conversations: [
            {
              state: 'open',
              messages: [{ text: 'Great job!', timestamp: new Date() }],
              creator: { name: 'Alice' },
            },
            {
              state: 'resolved',
              messages: [{ text: 'Needs review', timestamp: new Date() }],
              creator: { name: 'Bob' },
            },
          ],
        },
        {
          pageName: 'Property',
          conversations: [
            {
              state: 'open',
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
    {
      tabName: 'Tab 2',
      associatedPages: [
        {
          pageName: 'Loans',
          conversations: [
            {
              state: 'resolved',
              messages: [{ text: 'Approved', timestamp: new Date() }],
              creator: { name: 'David' },
            },
          ],
        },
      ],
    },
  ];

  beforeEach(() => {
    pipe = new OrganizeCommentsPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter out tabs and pages based on conversation state', () => {
    const filters = { state: 'hideResolved' };
    const result = pipe.transform(mockTabEntries, filters);

    expect(result.length).toBe(1);
    expect(result[0].tabName).toBe('Tab 1');
    expect(result[0].associatedPages.length).toBe(1);
    expect(result[0].associatedPages[0].pageName).toBe('Credit approval');
    expect(result[0].associatedPages[0].conversations.length).toBe(1);
    expect(result[0].associatedPages[0].conversations[0].state).toBe('open');
  });

  it('should include all tabs and pages when state filter is showAll', () => {
    const filters = { state: 'showAll' };
    const result = pipe.transform(mockTabEntries, filters);

    expect(result.length).toBe(2);
    expect(result[0].tabName).toBe('Tab 1');
    expect(result[0].associatedPages.length).toBe(2);
    expect(result[1].tabName).toBe('Tab 2');
    expect(result[1].associatedPages.length).toBe(1);
  });

  it('should return an empty array if no tabs match the filter', () => {
    const filters = { state: 'resolved' };
    const result = pipe.transform(mockTabEntries, filters);

    expect(result.length).toBe(0);
  });
});
