describe('Logout', () => {

  before(() => {
    cy.visit('/');
  });

  it('should logout user', () => {
    cy.contains('Logout')
      .click()
      .get('[aria-label="Logout"]')
      .click();
  }); // should direct to login page
});
