@tag
Feature: User is able to change his account informations

  @scenario1
  Scenario Outline: change profile email with invalid password
    Given user is in email modify page
    When user enters <newemail> and confirm <newemailc> and enters invalid <invalidpassword>
    And cliks on save email
    Then error message is shown

    Examples: 
      | newemail                 | newemailc                | invalidpassword |
      | amenidridi2022@gmail.com | amenidridi2022@gmail.com | AAAAA           |

  @scenario2
  Scenario Outline: change profile email with valid password
    Given user is in email modify page
    When enters <newemail> and confirm <newemail> and enters valid <password>
    And cliks on save email
    Then save and user is redireted to personal information

    Examples: 
      | newemail                 | newemailc                | password  |
      | amenidridi2022@gmail.com | amenidridi2022@gmail.com | Ameni2023 |
