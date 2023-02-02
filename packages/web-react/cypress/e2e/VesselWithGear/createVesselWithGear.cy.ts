describe('Create Vessel With Gear', () => {
  before(() => {
    cy.visit('fisherfolk-record');
  });

  it('should go to fisherfolk detail page', () => {
    cy.get('[id="fisherfolk-action-btn"]')
      .its('length')
      .then((len) => {
        cy.get('[id="fisherfolk-action-btn"]')
          .eq(len - 1)
          .click()
          .get('[role="menuitem"]')
          .contains('View')
          .last()
          .click({ force: true });
      });
  });

  it('should open vessel/gear form', () => {
    cy.contains('Add Boat/Gear').click().should('be.visible');
  });

  it('should select registration type', () => {
    cy.get('[type=radio]').check('Initial Registration').should('be.checked');
  });

  it('should input mvfr number', () => {
    cy.get('[name=mfvrNumber]')
      .click()
      .type('ILO-2023-0089')
      .should('have.value', 'ILO-2023-0089');
  });

  it('should vessel information', () => {
    cy.get('[name=homeport]')
      .click()
      .type('Iloilo')
      .should('have.value', 'Iloilo')
      .get('[name=name]')
      .click()
      .type('J&J')
      .should('have.value', 'J&J')
      .get('[id="mui-component-select-material"]')
      .click()
      .get('[name=material]')
      .contains('Composite')
      .click()
      .should('have.text', 'Composite')
      .get('.css-ujecln-Input2')
      .click()
      .get('[class*="-menu"]')
      .find('[id*="-option"]')
      .eq(0)
      .click()
      .get('[name=placeBuilt]')
      .click()
      .type('Iloilo')
      .should('have.value', 'Iloilo')
      .get('[name=yearBuilt]')
      .click()
      .type('2015')
      .should('have.value', 2015);
  });

  it('should input fishing vessel dimensions and tonnages', () => {
    cy.get('[name=registeredLength]')
      .click()
      .type('3.4')
      .should('have.value', 3.4)
      .get('[name=registeredDepth]')
      .click()
      .type('2.3')
      .should('have.value', 2.3)
      .get('[name=registeredBreadth]')
      .click()
      .type('1.2')
      .should('have.value', 1.2)
      .get('[name=tonnageLength]')
      .click()
      .type('3')
      .should('have.value', 3)
      .get('[name=tonnageDepth]')
      .click()
      .type('1.5')
      .should('have.value', 1.5)
      .get('[name=tonnageBreadth]')
      .click()
      .type('2.5')
      .should('have.value', 2.5)
      .get('[name=grossTonnage]')
      .click()
      .type('3.1')
      .should('have.value', 3.1)
      .get('[name=netTonnage]')
      .click()
      .type('2.6')
      .should('have.value', 2.6);
  });

  it('should input particulars of propulsion system', () => {
    cy.get('[name=engineMake]')
      .click()
      .type('Toyota')
      .should('have.value', 'Toyota')
      .get('[name=serialNumber]')
      .click()
      .type('HSJAKS2J91AK')
      .should('have.value', 'HSJAKS2J91AK')
      .get('[name=horsepower]')
      .click()
      .type('2000')
      .should('have.value', 2000);
  });

  it('should select gear types', () => {
    cy.get('input[type="checkbox"]')
      .check(['SimpleHandLine', 'NewLookOrZapara'])
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

  it('should check if vessel is on the fisherfolk boat record', () => {
    const mfvrNumber = 'ILO-2023-0089';

    cy.visit('fisherfolk-boats')
      .get('.MuiDataGrid-cellContent')
      .should('be.visible')
      .contains(mfvrNumber);
  });

  it('should check if gears are on the fisherfolk gear record', () => {
    const gear1 = 'SimpleHandLine';
    const gear2 = 'NewLookOrZapara';

    cy.visit('fisherfolk-gears')
      .get('.MuiDataGrid-cellContent')
      .should('be.visible')
      .contains(gear1)
      .get('.MuiDataGrid-cellContent')
      .should('be.visible')
      .contains(gear2);
  });
});
