Feature:Order the product from demoshop application

    @OrderProductTest 
    Scenario: Order the product from demoshop application
        Given User is on demoshop application with is
        When user create account to demoshop with valid credentials
            | FirstName | LastName | Email             | Password  |
            | John      | Wick     | john123@gmail.com | John@1234 |
        And user select the product and add to cart
        And user proceed to checkout and fill all the details
        Then verify order is placed successfully