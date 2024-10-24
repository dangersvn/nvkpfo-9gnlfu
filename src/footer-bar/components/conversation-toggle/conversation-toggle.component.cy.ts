describe('ConversationToggle Component', () => {
    beforeEach(() => {
      cy.visit('/path-to-conversation-toggle'); // Replace with the actual path
    });
  
    it('should have mat-slide-toggle off by default', () => {
      cy.get('mat-slide-toggle')
        .should('exist')
        .and('have.attr', 'aria-checked', 'false');
    });
  
    it('should be able to toggle on', () => {
      cy.get('mat-slide-toggle')
        .click()
        .should('have.attr', 'aria-checked', 'true');
    });
  
    it('should display "Show Comments" text', () => {
      cy.contains('span', 'Show Comments').should('be.visible');
    });
  });
  