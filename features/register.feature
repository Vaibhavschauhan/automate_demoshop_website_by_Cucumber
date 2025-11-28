Feature: Framework for ecommerce website

    @RegressionTest @registerDemotest
    Scenario: Login to website
        Given Create account to demoshop with "https://demowebshop.tricentis.com/" is
        When user clicks on register link and fill all the details and submit
            | FirstName | LastName | Email             | Password  |
            | John      | Wick     | john123@gmail.com | John@1234 |
        Then verify home page is displayed
