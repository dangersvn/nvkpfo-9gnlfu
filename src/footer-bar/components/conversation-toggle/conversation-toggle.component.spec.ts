import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationToggleComponent } from './conversation-toggle.component';

describe('ConversationToggleComponent', () => {
  let component: ConversationToggleComponent;
  let fixture: ComponentFixture<ConversationToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversationToggleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConversationToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
