Feature: Framework for ecommerce website

    Scenario: Login to website
    Given Create account to demoshop with "https://demowebshop.tricentis.com/" is
    When user clicks on register link and fill all the details and submit
    | FirstName | LastName | Email                  | Password  |
    | John      | Wick      |   john123@gmail.com | John@1234 | 
    Then verify home page is displayed

    Scenario: Add to cart product
    Given Create account to demoshop with "https://demowebshop.tricentis.com/" is
    When user clicks on register link and fill all the details and submit
    | FirstName | LastName | Email                  | Password  |
    | John      | Wick      |   john123@gmail.com | John@1234 | 
    Then verify home page is displayed
    When user search for computer product
    Then select the product from the list
    And add the product to cart
    Then verify product is added to cart successfully
    When user logout from the application
    Then verify user is logged out successfully
    