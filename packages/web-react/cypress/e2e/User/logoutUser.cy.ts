describe('Logout', () => {
  before(() => {
    cy.visit('/dashboard');
  });

  it('should logout user', () => {
    cy.contains('Logout').click().get('[aria-label="Logout"]').click();
  });

  it('should direct to login page', () => {
    cy.url().should('eq', 'http://localhost:5173/login');
  });
});
