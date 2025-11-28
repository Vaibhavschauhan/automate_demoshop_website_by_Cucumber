Feature: Save address for the details in demoshop application

    @AddNewAddressTest
    Scenario: Add new address in demoshop application
        Given User is on demoshop application with is
        When user create account to demoshop with valid credentials
            | FirstName | LastName | Email             | Password  |
            | John      | Wick     | john123@gmail.com | John@1234 |
        And User click on addresses link to add new address
        Then verify add address page is displayed
        When User click on add new address
        And User fill all the address details
        Then User verify saved address is displayed in address list