describe('Create User', () => {
  const username = 'city_admin';
  const password = 'city-Agri2023';

  before(() => {
    cy.visit('/create-account');
  });

  it('should input username and password', () => {
    cy.get('[name=username]')
      .click()
      .type(username)
      .should('have.value', username)
      .get('[name=password]')
      .click()
      .type(password)
      .should('have.value', password);
  });

  it('should successfuly save new user', () => {
    cy.get('[type=submit]')
      .should('contain', 'Create account')
      .click()
      .get('.MuiSnackbar-root')
      .should('be.visible');
  });

  it('should direct to login page', () => {
    cy.url().should('eq', 'http://localhost:5173/login');
  });
});
