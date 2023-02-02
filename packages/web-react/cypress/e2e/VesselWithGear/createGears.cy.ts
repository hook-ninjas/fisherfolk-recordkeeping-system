describe('Create Gear/s', () => {
  before(() => {
    cy.visit('fisherfolk-record');
  });

  it('should go to fisherfolk detail page', () => {
    cy.get('[id="fisherfolk-action-btn"]')
      .eq(3)
      .click()
      .get('[role="menuitem"]')
      .contains('View')
      .last()
      .click({ force: true });
  });

  it('should open vessel/gear form', () => {
    cy.contains('Add Boat/Gear').click().should('be.visible');
  });

  it('should select gear types', () => {
    cy.get('input[type="checkbox"]')
      .check(['GaffHook', 'ScoopNets'])
      .should('be.checked');
  });

  it('should select image', () => {
    cy.get('input[type="file"]').selectFile(
      'cypress/fixtures/city-agri-logo.png'
    );
  });

  it('should save data', () => {
    cy.get('[type=submit]')
      .should('contain', 'Save')
      .click()
      .get('h2')
      .should('contain', 'Data has been saved');
  });

  it('should check if gears are on the fisherfolk gear record', () => {
    const gear1 = 'GaffHook';
    const gear2 = 'ScoopNets';

    cy.visit('fisherfolk-gears')
      .get('.MuiDataGrid-cellContent')
      .should('be.visible')
      .contains(gear1)
      .get('.MuiDataGrid-cellContent')
      .should('be.visible')
      .contains(gear2);
  });
});
