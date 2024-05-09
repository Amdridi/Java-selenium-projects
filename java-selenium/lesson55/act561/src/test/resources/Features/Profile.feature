@tag
Feature: User is able to change his account parameters

  @Secnario1
  Scenario Outline: change account email
    Given user is in personal informations page
    When user clicks on modify email
    And enters <newemail> and confirm <newemailc> and enters <password>
    And clicks on save modifications
    Then user is navigated to personal informations and email is saved

    Examples: 
      | newemail                 | newemailc                | password  |
      | amenidridi2022@gmail.com | amenidridi2022@gmail.com | Ameni2023 |
      
   @Secnario2
   Scenario Outline: change account password
    Given user is in personal account page
    When user clicks on modify password
    And enters <password> and enters <newpassword> and confirm <passwordc>
    And clicks on save modifications
    Then user is navigated to personal informations and password is saved

    Examples: 
      | newemail                 | newemailc                | password  |
      | amenidridi2022@gmail.com | amenidridi2022@gmail.com | Ameni2023 |