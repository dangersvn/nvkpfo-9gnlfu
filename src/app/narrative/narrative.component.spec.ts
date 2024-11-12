import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { NarrativeComponent } from './narrative.component';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { ElementRef, NgZone } from '@angular/core';

describe('NarrativeComponent', () => {
  let component: NarrativeComponent;
  let fixture: ComponentFixture<NarrativeComponent>;
  let elementRef: ElementRef;
  let ngZone: NgZone;
  let mockIntersectionObserver = jest.fn();
  const mockObserve = jest.fn();
  const mockUnobserve = jest.fn();
  const mockDisconnect = jest.fn();
  let mockElementRef: Partial<ElementRef>;

  beforeAll(() => { // Initialize the testing environment before all tests
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });

    beforeEach(async () => {

      // Setup mock IntersectionObserver
    mockIntersectionObserver.mockImplementation((callback: any) => ({
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect,
      // Store callback for later use in tests
      callback
    }));


      // Add mock to global object
      global.IntersectionObserver = mockIntersectionObserver as any;

      // Create mock ElementRef
      mockElementRef = {
        nativeElement: {
          querySelector: jest.fn(),
        },
      }; // Type casting to satisfy TypeScript
  
      TestBed.configureTestingModule({
        // imports: [NarrativeComponent, ApplicationModule], // Declare the component
        declarations: [NarrativeComponent],
        providers: [
          { provide: ElementRef, useValue: mockElementRef }
        ],
      });

      fixture = TestBed.createComponent(NarrativeComponent);
      component = fixture.componentInstance;
      elementRef = TestBed.inject(ElementRef);
      ngZone = TestBed.inject(NgZone);
      fixture.detectChanges();

    });


    it('should create', () => {
      expect(component).toBeTruthy();
    });

  it('should initialize IntersectionObserver with correct options', () => {
    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        root: null,
        threshold: 0
      }
    );
  });

  it('should observe element on init', () => {
    expect(mockObserve).toHaveBeenCalledWith(
      fixture.elementRef.nativeElement.querySelector('.header')
    );
  });

  it('should disconnect observer on destroy', () => {
    component.ngOnDestroy();
    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('should update isSticky when intersection changes', fakeAsync(() => { // Use fakeAsync
    const mockHeaderElement = document.createElement('div');
    (elementRef.nativeElement.querySelector as jest.Mock).mockReturnValue(mockHeaderElement);
    component.ngOnInit();
    const observerCallback = mockIntersectionObserver.mock.calls[0][0];

    // Simulate intersection start
    observerCallback([{ isIntersecting: false }]); // Should set isSticky to true
    tick(); // Flush pending microtasks – ESSENTIAL!
    expect(component.isSticky).toBe(true);

    // Simulate intersection end
    observerCallback([{ isIntersecting: true }]);  // Should set isSticky to false
    tick(); // Flush pending microtasks – ESSENTIAL!
    expect(component.isSticky).toBe(false);
  }));

  it('should handle missing header element gracefully', () => {
    // Manually remove header element
    const headerElement = fixture.nativeElement.querySelector('.header');
    headerElement.remove();
    
    // Re-initialize component
    component.ngOnInit();
    
    expect(component).toBeTruthy();
  });
  });
