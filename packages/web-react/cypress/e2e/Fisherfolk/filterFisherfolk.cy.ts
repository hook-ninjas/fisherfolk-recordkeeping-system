describe('Filter Fisherfolk Record', () => {
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

  it('should wait for data to load', () => {
    cy.get('[id="fisherfolk-action-btn"]', { timeout: 80000 }).eq(1);
  });

  it('should click the filter button', () => {
    cy.get('[aria-label="logo"]').click({ force: true });
  });

  describe('Filter Fisherfolks by Livelihood', () => {
    it('should filter fisherfolks who have livelihood in aquaculture', () => {
      cy.get('[name="Aquaculture"]').click().get('[id="apply-btn"]').click();
    });

    it('should filter fisherfolks who have livelihood in capture fishing', () => {
      cy.get('[aria-label="logo"]').click({ force: true });
      cy.get('[name="CaptureFishing"]').click();
      cy.get('[id="apply-btn"]').click();
    });

    it('should filter fisherfolks who have livelihood in fish processing', () => {
      cy.get('[aria-label="logo"]').click({ force: true });
      cy.get('[name="FishProcessing"]').click();
      cy.get('[id="apply-btn"]').click();
    });

    it('should filter fisherfolks who have livelihood in fish vending', () => {
      cy.get('[aria-label="logo"]').click({ force: true });
      cy.get('[name="FishVending"]').click();
      cy.get('[id="apply-btn"]').click();
    });
  });

  describe('Filter Fisherfolks by Status', () => {
    it('should filter active fisherfolks', () => {
      cy.get('[aria-label="logo"]').click({ force: true });
      cy.get('[name="Active"]').click();
      cy.get('[id="apply-btn"]').click();
    });

    it('should filter inactive fisherfolks', () => {
      cy.get('[aria-label="logo"]').click({ force: true });
      cy.get('[name="Inactive"]').click();
      cy.get('[id="apply-btn"]').click();
    });

    it('should filter deceased fisherfolks', () => {
      cy.get('[aria-label="logo"]').click({ force: true });
      cy.get('[name="Deceased"]').click();
      cy.get('[id="apply-btn"]').click();
    });
  });

  describe('Filter Fisherfolks by Barangay', () => {
    it('should filter fisherfolks by barangay', () => {
      cy.get('[aria-label="logo"]').click({ force: true });
      cy.get('[id="barangay"]').type('caingin');
      cy.get('ul').find('li').first().click();
      cy.get('[id="barangay"]').should('have.value', 'Brgy. Caingin');
      cy.get('[id="apply-btn"]').click();
    });
  });

  describe('Filter Fisherfolks by Livelihood and Status', () => {
    it('should filter active and capture fishing fisherfolks', () => {
      cy.get('[aria-label="logo"]').click({ force: true });
      cy.get('[name="CaptureFishing"]').click();
      cy.get('[name="Active"]').click();
      cy.get('[id="apply-btn"]').click();
    });

    it('should filter inactive and fish vending fisherfolks', () => {
      cy.get('[aria-label="logo"]').click({ force: true });
      cy.get('[name="FishVending"]').click();
      cy.get('[name="Inactive"]').click();
      cy.get('[id="apply-btn"]').click();
    });

    it('should filter deceased and aquaculture fisherfolks', () => {
      cy.get('[aria-label="logo"]').click({ force: true });
      cy.get('[name="Aquaculture"]').click();
      cy.get('[name="Deceased"]').click();
      cy.get('[id="apply-btn"]').click();
    });
  });

  describe('Filter Fisherfolks by Livelihood and Barangay', () => {
    it('should filter capture fishing and from Brgy. Magdalo fisherfolks', () => {
      cy.get('[aria-label="logo"]').click({ force: true });
      cy.get('[name="CaptureFishing"]').click();
      cy.get('[id="barangay"]').clear().type('magda');
      cy.get('ul').find('li').first().click();
      cy.get('[id="barangay"]').should('have.value', 'Brgy. Magdalo');
      cy.get('[id="apply-btn"]').click();
    });

    it('should filter fish vending and from Brgy. Jereos fisherfolks', () => {
      cy.get('[aria-label="logo"]').click({ force: true });
      cy.get('[name="FishVending"]').click();
      cy.get('[id="barangay"]').clear().type('jere');
      cy.get('ul').find('li').first().click();
      cy.get('[id="barangay"]').should('have.value', 'Brgy. Jereos');
      cy.get('[id="apply-btn"]').click();
    });

    it('should filter aquaculture and from Brgy. Gustilo fisherfolks', () => {
      cy.get('[aria-label="logo"]').click({ force: true });
      cy.get('[name="Aquaculture"]').click();
      cy.get('[id="barangay"]').clear().type('buhang');
      cy.get('ul').find('li').first().click();
      cy.get('[id="barangay"]').should('have.value', 'Brgy. Buhang');
      cy.get('[id="apply-btn"]').click();
    });
  });

  describe('Filter Fisherfolks by Livelihood, Status, and Barangay', () => {
    it('should filter active, capture fishing livelihood, and from Brgy. Magdalo fisherfolks', () => {
      cy.get('[aria-label="logo"]').click({ force: true });
      cy.get('[name="CaptureFishing"]').click();
      cy.get('[name="Active"]').click();
      cy.get('[id="barangay"]').clear().type('magda');
      cy.get('ul').find('li').first().click();
      cy.get('[id="barangay"]').should('have.value', 'Brgy. Magdalo');
      cy.get('[id="apply-btn"]').click();
    });

    it('should filter inactive, fish vending livelihood, and from Brgy. Jereos fisherfolks', () => {
      cy.get('[aria-label="logo"]').click({ force: true });
      cy.get('[name="FishVending"]').click();
      cy.get('[name="Inactive"]').click();
      cy.get('[id="barangay"]').clear().type('jere');
      cy.get('ul').find('li').first().click();
      cy.get('[id="barangay"]').should('have.value', 'Brgy. Jereos');
      cy.get('[id="apply-btn"]').click();
    });

    it('should filter deceased, aquaculture livelihood, and from Brgy. Gustilo fisherfolks', () => {
      cy.get('[aria-label="logo"]').click({ force: true });
      cy.get('[name="Aquaculture"]').click();
      cy.get('[name="Deceased"]').click();
      cy.get('[id="barangay"]').clear().type('buhang');
      cy.get('ul').find('li').first().click();
      cy.get('[id="barangay"]').should('have.value', 'Brgy. Buhang');
      cy.get('[id="apply-btn"]').click();
    });
  });
});
