import { randomizer } from '../../fixtures/randomizer';
import { fisherfolks } from '../../fixtures/fishefolk.json';

const registrationType = fisherfolks[randomizer()].registrationType;
const salutation = fisherfolks[randomizer()].salutation;
const lastName = fisherfolks[randomizer()].lastName;
const firstName = fisherfolks[randomizer()].firstName;
const middleName = fisherfolks[randomizer()].middleName;
const contactNum = fisherfolks[randomizer()].contactNum;
const barangay = fisherfolks[randomizer()].barangay;
const residentYear = fisherfolks[randomizer()].residentYear;
const dateOfBirth = fisherfolks[randomizer()].dateOfBirth;
const gender = fisherfolks[randomizer()].gender;
const civilStatus = fisherfolks[randomizer()].civilStatus;
const numOfChildren = fisherfolks[randomizer()].numOfChildren;
const nationality = fisherfolks[randomizer()].nationality;
const educationalBackground = fisherfolks[randomizer()].educationalBackground;
const personToNotify = fisherfolks[randomizer()].personToNotify;
const ptnContactNum = fisherfolks[randomizer()].ptnContactNum;
const ptnAddress = fisherfolks[randomizer()].personToNotify;
const mainSourceOfIncome = fisherfolks[randomizer()].mainSourceOfIncome;
const orgMemberYear = fisherfolks[randomizer()].orgMemberYear;


describe('Create Fisherfolk Record', () => {
  before(() => {
    cy.visit('fisherfolk-record')
      .contains('Add Member')
      .click()
      .should('be.visible');
  });

  it('should select registration type', () => {
    cy.get('[type=radio]')
      .check(registrationType)
      .should('be.checked');
  });

  it('should select salutation', () => {
    cy.get('[type=radio]')
      .check(salutation)
      .should('be.checked');
  });

  it('should input applicant name', () => {
    cy.get('[name=lastName]')
      .click()
      .type(lastName)
      .should('have.value', lastName)
      .get('[name=firstName]')
      .click()
      .type(firstName)
      .should('have.value', firstName)
      .get('[name=middleName]')
      .click()
      .type(middleName)
      .should('have.value', middleName);
  });

  it('should input contact information', () => {
    cy.get('[name=contactNumber]')
      .click()
      .type(contactNum)
      .should('have.value', contactNum);
  });

  it('should input address information', () => {
    cy.get('[id="mui-component-select-barangay"]')
      .click()
      .get('[name=barangay]')
      .contains(barangay)
      .click()
      .should('have.text', barangay)
      .get('[name=cityMunicipality]')
      .click()
      .type('Iloilo City')
      .should('have.value', 'Iloilo City')
      .get('[name=province]')
      .click()
      .type('Iloilo')
      .should('have.value', 'Iloilo')
      .get('[name=residentYear]')
      .click()
      .type(residentYear.toString())
      .should('have.value', residentYear);
  });

  it('should input age', () => {
    cy.get('[name=age]')
      .click()
      .type('43')
      .should('have.value', '43');
  });

  it('should input date of birth', () => {
    cy.get('[name=dateOfBirth]')
      .click()
      .type(dateOfBirth)
      .should('have.value', dateOfBirth);
  });

  it('should input place of birth', () => {
    cy.get('[name=placeOfBirth]')
      .click()
      .type('Iloilo City')
      .should('have.value', 'Iloilo City');
  });

  it('should input religion', () => {
    cy.get('[name=religion]')
      .click()
      .type('Catholic')
      .should('have.value', 'Catholic');
  });

  it('should select gender', () => {
    cy.get('[type=radio]')
      .check(gender)
      .should('be.checked');
  });

  it('should select civil status', () => {
    cy.get('[id="mui-component-select-civilStatus"]')
      .click()
      .get('[name=civilStatus]')
      .contains(civilStatus)
      .click()
      .should('have.text', civilStatus);
  });

  it('should input number of children', () => {
    cy.get('[name=numberOfChildren]')
      .click()
      .type(numOfChildren.toString())
      .should('have.value', numOfChildren);
  });

  it('should select nationality', () => {
    cy.get('[type=radio]')
      .check(nationality)
      .should('be.checked');
  });

  it('should select educational background', () => {
    cy.get('[id="mui-component-select-educationalBackground"]')
      .click()
      .get('[name=educationalBackground]')
      .contains(educationalBackground)
      .click()
      .should('have.text', educationalBackground);
  });

  it('should input person to notify information', () => {
    cy.get('[name=personToNotify]')
      .click()
      .type(personToNotify)
      .should('have.value', personToNotify)
      .get('[name=ptnRelationship]')
      .click()
      .type('Spouse')
      .should('have.value', 'Spouse')
      .get('[name=ptnContactNum]')
      .click()
      .type(ptnContactNum)
      .should('have.value', ptnContactNum)
      .get('[name=ptnAddress]')
      .click()
      .type(ptnAddress)
      .should('have.value', ptnAddress);
  });

  it('should select main source of income', () => {
    cy.get('[id="mui-component-select-mainSourceOfIncome"]')
      .click()
      .get('[name=mainSourceOfIncome]')
      .contains(mainSourceOfIncome)
      .click()
      .should('have.text', mainSourceOfIncome);
  });

  it('should input organization information', () => {
    cy.get('[name=orgName]')
      .click()
      .type('Pamalakaya')
      .should('have.value', 'Pamalakaya')
      .get('[name=orgMemberSince]')
      .click()
      .type(orgMemberYear.toString())
      .should('have.value', orgMemberYear)
      .get('[name=orgPosition]')
      .click()
      .type('Member')
      .should('have.value', 'Member');
  });

  it('should save data', () => {
    cy.get('[type=submit]')
      .should('contain', 'Save')
      .click()
      .get('h2')
      .should('contain', 'Data has been saved');
  });

  it('should see applicants name on fisherfolk list', () => {
    const name = firstName + ' ' + lastName;

    cy.visit('fisherfolk-record')
      .get('table')
      .should('be.visible')
      .contains('td', name);
  });
});