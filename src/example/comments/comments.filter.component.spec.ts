import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentsFilterComponent } from './comments-filter.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MatRadioGroup } from '@angular/material/radio';

describe('CommentsFilterComponent', () => {
  let component: CommentsFilterComponent;
  let fixture: ComponentFixture<CommentsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentsFilterComponent],
      imports: [FormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsFilterComponent);
    component = fixture.componentInstance;
    component.filters = { state: 'showAll' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filterChanged event when filter changes', () => {
    jest.spyOn(component.filterChanged, 'emit');

    const radioGroup = fixture.debugElement.query(By.directive(MatRadioGroup));
    radioGroup.triggerEventHandler('change', { value: 'hideResolved' });
    fixture.detectChanges();

    expect(component.filterChanged.emit).toHaveBeenCalledWith({ state: 'hideResolved' });
  });
});
