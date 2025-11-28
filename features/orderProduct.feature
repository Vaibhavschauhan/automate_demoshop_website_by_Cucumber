Feature:Order the product from demoshop application

    @OrderProductTest 
    Scenario: Order the product from demoshop application
        Given User is on demoshop application with "https://demowebshop.tricentis.com/" is
        When user create account to demoshop with valid credentials
            | FirstName | LastName | Email             | Password  |
            | John      | Wick     | john123@gmail.com | John@1234 |
        And user select the product and add to cart
        And user proceed to checkout and fill all the details
            | City   | Address1        | ZipPostalCode | PhoneNumber |
            | Mumbai | 123, ABC Street | 400001        | 9876543210  |
        Then verify order is placed successfully