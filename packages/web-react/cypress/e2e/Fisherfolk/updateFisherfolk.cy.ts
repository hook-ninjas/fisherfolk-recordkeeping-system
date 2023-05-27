describe('Update Fisherfolk Record', () => {
  before(() => {
    cy.visit('login');
  });

  it('should login to the app', () => {
    cy.get('[name=username]')
      .click()
      .type('admin2023')
      .should('have.value', 'admin2023')
      .get('[name=password]')
      .click()
      .type('@Admin2023')
      .should('have.value', '@Admin2023')
      .get('[type=submit]')
      .should('contain', 'Continue')
      .click();
  });

  it('should go to fisherfolk record page', () => {
    cy.contains(
      'span[class="MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-10hburv-MuiTypography-root"]',
      'Fisherfolk Record'
    ).click();
  });

  it('should find edit button', () => {
    cy.get('[id="fisherfolk-action-btn"]', { timeout: 80000 })
      .eq(5)
      .click()
      .get('[role="menuitem"]')
      .contains('Edit')
      .last()
      .click({ force: true });
  });

  it('should update contact information', () => {
    cy.get('[id="contactNumber"]')
      .click()
      .clear()
      .type('09998018540')
      .should('have.value', '09998018540');
  });

  it('should update address information', () => {
    cy.get('[id=barangay]')
      .click()
      .clear()
      .type('Brgy. Bolilao')
      .should('have.value', 'Brgy. Bolilao')
      .get('[id=cityMunicipality]')
      .click()
      .clear()
      .type('Iloilo City')
      .should('have.value', 'Iloilo City')
      .get('[id=province]')
      .click()
      .clear()
      .type('Iloilo')
      .should('have.value', 'Iloilo');
  });

  it('should save changes', () => {
    cy.get('[type=submit]')
      .should('contain', 'Save Changes')
      .click()
      .get('h2')
      .should('contain', 'Data has been saved');
  });
});
