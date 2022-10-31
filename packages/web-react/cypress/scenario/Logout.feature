Feature: Logout

    Scenario: As a user, I want to logout want when my session is done
    Given that I navigated on the sidebar 
    When I click the logout button
    And a confirmation dialog will popup
    And I click the logout buton
    Then I will be directed on the login page
