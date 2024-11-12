// checkOnPushParents() {
//     let currentElement = this.elementRef.nativeElement;
//     let currentComponent = this;

//     while (currentElement.parentElement) {
//       currentElement = currentElement.parentElement;
//       currentComponent = this.cdr.getComponentByElement(currentElement);

//       if (currentComponent && currentComponent.changeDetection === ChangeDetectionStrategy.OnPush) {
//         console.log('Found OnPush parent component:', currentComponent);
//         return;
//       }
//     }

//     console.log('No OnPush parent components found');
//   }