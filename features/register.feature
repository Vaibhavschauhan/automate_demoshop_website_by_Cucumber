Feature: Framework for ecommerce website

Background: User launch the demoshop application
    Given User is on demoshop application with is

    @regressionTest @registerDemotest
    Scenario Outline: Register to website
        When user clicks on register link and fill all the details and submit with "<FirstName>" "<LastName>" "<Email>" "<Password>"
        Then verify home page is displayed
    Examples:
            | FirstName | LastName | Email             | Password  |
            | John      | Wick     | john123@gmail.com | John@1234 |
            | abc       | Wick     | abc123@gmail.com  | abc@1234  |