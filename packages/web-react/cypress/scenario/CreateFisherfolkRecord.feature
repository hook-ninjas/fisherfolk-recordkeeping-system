Feature: Create Fisherfolk Record

    Scenario: As a user, I want to be able to encode an applicant’s registration into the system so that I can document their record.
    Given that I am on the fisherfolk record page 
    When I click the add member button
    Then I will select the applicant’s <registration type>
    And I will select <salutation>
    And I will input <first name>
    And I will input <middle name>
    And I will input <contact number>
    And I will select <barangay>
    And I will input <city/municipality>
    And I will input <province>
    And I will input <residency year>
    And I will input <age>
    And I will input <date of birth>
    And I will input <place of birth>
    And I will input <religion>
    And I will select <gender>
    And I will select <civi status>
    And I will input <number of children>
    And I will select <nationality>
    And I will select <educational background>
    And I will input <person to notify>
    And I will input <person to notify relationship>
    And I will input <person to notify contact number>
    And I will input <person to notify address>
    And I will select <main source of income>
    And I will input <gear used> or <method used>
    And I will select <other source of income>
    And I will input <gear used> or <method used>
    And I will input <organization name>
    And I will input <organization membership year>
    And I will input <organization position>
    And I will attach <image>
    And I will attach <signature>
    Then I will submit the form 
    And I will be able to see the applicant’s <name> on the fishefolk record list 
       
          