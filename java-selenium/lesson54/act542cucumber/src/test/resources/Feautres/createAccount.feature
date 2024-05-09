Feature: User is able to create an account and log into this account
  

  @tag1
  Scenario Outline: create user account 
    Given user is in acceuil page
    When user enter <email> and <password>
    And click on login button
    Then user is navigated to home page

    Examples: 
      | email | password |
      | ameni.dridi.ing@gmail.com| aaaa2023 |
