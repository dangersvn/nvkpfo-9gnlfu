import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageLazyLoadComponent } from './image-lazy-load.component';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

describe('ImageLazyLoadComponent', () => {
  let component: ImageLazyLoadComponent;
  let fixture: ComponentFixture<ImageLazyLoadComponent>;
  
  // Mock IntersectionObserver
  const mockIntersectionObserver = jest.fn();
  const mockObserve = jest.fn();
  const mockUnobserve = jest.fn();
  const mockDisconnect = jest.fn();
  beforeAll(() => { // Initialize the testing environment before all tests
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });

  beforeEach(async () => {
    // Setup mock IntersectionObserver
    mockIntersectionObserver.mockImplementation((callback) => ({
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect,
      // Store callback for later use in tests
      callback
    }));

    // Add to global object
    global.IntersectionObserver = mockIntersectionObserver;

    await TestBed.configureTestingModule({
      declarations: [ ImageLazyLoadComponent ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageLazyLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select header element correctly', () => {
    const headerElement = fixture.nativeElement.querySelector('.header');
    expect(headerElement).toBeTruthy();
    expect(component.headerElement).toBe(headerElement);
  });

  it('should get correct header text', () => {
    expect(component.getHeaderText()).toBe('Lazy Loaded Images');
  });

  it('should apply background color to header element', () => {
    const headerElement = fixture.nativeElement.querySelector('.header');
    expect(headerElement.style.backgroundColor).toBe('rgb(240, 240, 240)'); // #f0f0f0 in rgb
  });

  it('should initialize IntersectionObserver with correct options', () => {
    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );
  });

  it('should observe element on init', () => {
    expect(mockObserve).toHaveBeenCalledWith(
      fixture.elementRef.nativeElement
    );
  });

  it('should disconnect observer on destroy', () => {
    component.ngOnDestroy();
    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('should update isIntersecting when intersection changes', () => {
    // Get the callback that was passed to IntersectionObserver
    const observerCallback = mockIntersectionObserver.mock.calls[0][0];
    
    // Simulate intersection
    observerCallback([
      { isIntersecting: true, target: fixture.elementRef.nativeElement }
    ]);
    expect(component.isIntersecting).toBe(true);
    
    // Simulate intersection end
    observerCallback([
      { isIntersecting: false, target: fixture.elementRef.nativeElement }
    ]);
    expect(component.isIntersecting).toBe(false);
  });

  // it('should update image src when intersecting', () => {
  //   const observerCallback = mockIntersectionObserver.mock.calls[0][0];
    
  //   // Initially, src should be empty
  //   const imgElement = fixture.nativeElement.querySelector('img');
  //   expect(imgElement.src).toBe('');
    
  //   // Simulate intersection
  //   observerCallback([
  //     { isIntersecting: true, target: fixture.elementRef.nativeElement }
  //   ]);
  //   fixture.detectChanges();
    
  //   // src should now be set
  //   expect(imgElement.src).toContain(component.imageUrl);
  // });

  describe('Edge Cases', () => {
    it('should handle missing header element gracefully', () => {
      // Manually remove header element
      const headerElement = fixture.nativeElement.querySelector('.header');
      headerElement.remove();
      
      // Re-initialize component
      component.ngOnInit();
      
      expect(component.getHeaderText()).toBe('');
      expect(component.headerElement).toBeNull();
    });
  });
});