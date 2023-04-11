describe('Create Program', () => {
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

  it('should go  fisherfolk program page', () => {
    cy.contains(
      'span[class="MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-10hburv-MuiTypography-root"]',
      'Fisherfolk Program'
    ).click();
  });

  it('should open add program form', () => {
    cy.contains('Add Program').click().should('be.visible');
  });

  it('should input program title', () => {
    cy.get('[id=title]')
      .click()
      .type('Fisherfolk Cash Assistance')
      .should('have.value', 'Fisherfolk Cash Assistance');
  });

  it('should input program slot', () => {
    cy.get('[id=slot]').click().type('200').should('have.value', '200');
  });

  it('should input program date', () => {
    cy.get('[id=date]').clear().type('04/20/2023');

    cy.get('[id=date]').should('have.value', '04/20/2023');
  });

  it('should input program description', () => {
    cy.get('[id=description]')
      .click()
      .type(
        'Fisherfolk Cash Assistance is a government event aimed at providing financial aid to fishermen and their families who have been severely affected by the COVID-19 pandemic. The cash assistance program aims to help them cope with the loss of income due to the pandemic, which has greatly impacted their livelihoods. The government\'s goal is to assist over a million fisherfolk across the country, with each family receiving a one-time cash grant of Php 5,000. The program is being implemented by the Department of Agriculture - Bureau of Fisheries and Aquatic Resources (DA-BFAR) in collaboration with local government units and fisherfolk associations.'
      )
      .should(
        'have.value',
        'Fisherfolk Cash Assistance is a government event aimed at providing financial aid to fishermen and their families who have been severely affected by the COVID-19 pandemic. The cash assistance program aims to help them cope with the loss of income due to the pandemic, which has greatly impacted their livelihoods. The government\'s goal is to assist over a million fisherfolk across the country, with each family receiving a one-time cash grant of Php 5,000. The program is being implemented by the Department of Agriculture - Bureau of Fisheries and Aquatic Resources (DA-BFAR) in collaboration with local government units and fisherfolk associations.'
      );
  });

  it('should successfuly save new program', () => {
    cy.get('[type=submit]')
      .should('contain', 'Save')
      .click()
      .get('h2', { timeout: 4_000 })
      .should('contain', 'Data has been saved');
  });

  it('should check newly added program', () => {
    cy.get('[id=program-title]')
      .should('contain', 'Fisherfolk Cash Assistance');
  });
});
