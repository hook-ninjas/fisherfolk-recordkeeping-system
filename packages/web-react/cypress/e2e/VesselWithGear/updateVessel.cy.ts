describe('Update Vessel', () => {
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

  it('should go  fisherfolk boat page', () => {
    cy.contains(
      'span[class="MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-10hburv-MuiTypography-root"]',
      'Boat Record'
    ).click();
  });

  it('should select edit button', () => {
    cy.get('[id="vessel-action-btn"]')
      .its('length')
      .then((len) => {
        cy.get('[id="vessel-action-btn"]')
          .eq(len - 1)
          .click()
          .get('[role="menuitem"]')
          .contains('Edit')
          .last()
          .click({ force: true });
      });
  });

  it('should update mvfr number', () => {
    cy.get('[id=mfvrNumber]')
      .click()
      .clear()
      .type('ILO-0089-2023')
      .should('have.value', 'ILO-0089-2023');
  });

  it('should update vessel information', () => {
    cy.get('[id=homeport]')
      .click()
      .clear()
      .type('Iloilo')
      .should('have.value', 'Iloilo')
      .get('[id=name]')
      .click()
      .clear()
      .type('Ligaya')
      .should('have.value', 'Ligaya')
      .get('[id=placeBuilt]')
      .click()
      .clear()
      .type('Iloilo')
      .should('have.value', 'Iloilo')
      .get('[id=yearBuilt]')
      .click()
      .clear()
      .type('2015')
      .should('have.value', 2015);
  });

  it('should update fishing vessel dimensions and tonnages', () => {
    cy.get('[id=registeredLength]')
      .click()
      .clear()
      .type('3.4')
      .should('have.value', 3.4)
      .get('[id=registeredDepth]')
      .click()
      .clear()
      .type('2.3')
      .should('have.value', 2.3)
      .get('[id=registeredBreadth]')
      .click()
      .clear()
      .type('1.2')
      .should('have.value', 1.2)
      .get('[id=tonnageLength]')
      .click()
      .clear()
      .type('3')
      .should('have.value', 3)
      .get('[id=tonnageDepth]')
      .click()
      .clear()
      .type('1.5')
      .should('have.value', 1.5)
      .get('[id=tonnageBreadth]')
      .click()
      .clear()
      .type('2.5')
      .should('have.value', 2.5)
      .get('[id=grossTonnage]')
      .click()
      .clear()
      .type('3.1')
      .should('have.value', 3.1)
      .get('[id=netTonnage]')
      .click()
      .clear()
      .type('2.6')
      .should('have.value', 2.6);
  });

  it('should save data', () => {
    cy.get('[type=submit]')
      .should('contain', 'Save')
      .click()
      .get('h2')
      .should('contain', 'Data has been saved');
  });
});
