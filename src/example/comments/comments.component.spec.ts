import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BriefCommentsComponent } from './brief-comments.component';
import { OrganizeCommentsPipe } from './organize-comments.pipe';
import { CommentsFilterComponent } from './comments-filter/comments-filter.component';
import { MatMenuModule } from '@angular/material/menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BriefCommentsComponent', () => {
  let component: BriefCommentsComponent;
  let fixture: ComponentFixture<BriefCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BriefCommentsComponent, OrganizeCommentsPipe, CommentsFilterComponent],
      imports: [MatMenuModule, NoopAnimationsModule, FormsModule, HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the tab names', () => {
    const tabHeaders = fixture.debugElement.queryAll(By.css('h2'));
    expect(tabHeaders.length).toBe(1);
    expect(tabHeaders[0].nativeElement.textContent).toBe('Tab 1');
  });

  it('should render the page names and conversations', () => {
    const pageHeaders = fixture.debugElement.queryAll(By.css('h3'));
    expect(pageHeaders.length).toBe(2);
    expect(pageHeaders[0].nativeElement.textContent).toBe('Page: Credit approval');
    expect(pageHeaders[1].nativeElement.textContent).toBe('Page: Property');

    const conversationStates = fixture.debugElement.queryAll(By.css('.cell'));
    expect(conversationStates.length).toBeGreaterThan(0);
  });

  it('should update filters when filter is changed', () => {
    const newFilters = { state: 'hideResolved' };
    component.onFilterChange(newFilters);
    fixture.detectChanges();
    expect(component.filters).toEqual(newFilters);
  });
});
