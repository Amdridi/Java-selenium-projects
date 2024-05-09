Feature: User is able to create an account and log into this account
  I want to use this template for my feature file

  @tag1
  Scenario Outline: Check login is successful with valid credentials
    Given user is in login page
    When user enter <email> and <password>
    And click on login button
    Then user is navigated to home page

    Examples: 
      | email | password |
      | ameni | aaaa2023 |
