import { expect } from "playwright/test";

// POM_pages/demoshopPage.js
export default class demoshopPage {
  constructor(page) {
    this.page = page;
    this.registerLink = page.locator('a[href="/register"]');
    this.genderSelection = page.locator('//input[@id="gender-male"]');
    this.firstName = page.locator('#FirstName');
    this.lastName = page.locator('#LastName');
    this.email = page.locator('#Email');
    this.password = page.locator('#Password');
    this.confirmPassword = page.locator('#ConfirmPassword');
    this.registerButton = page.locator('#register-button');
    this.logoutLink = page.locator('a:has-text("Log out")');
    this.accountLink = page.locator('a.account');
    // product/cart locators
    this.computerMenu = page.locator('a[href="/computers"]').nth(0);
    this.desktopMenu = page.locator('a[href="/desktops"]').nth(3);
    this.deviceSelector = page.locator('a[href*="/build-your-own-computer"]').nth(1);
    this.addCartOption = page.locator('#add-to-cart-button-16');
    this.hddSelector = page.locator('//*[@id="product_attribute_16_3_6_18"]');
    this.addSuccessMessage = page.locator('text=The product has been added to your shopping cart');
    this.cartPage = page.locator("//span[text()='Shopping cart']");
  }

  async registerAccount({ FirstName, LastName, Email, Password }) {
    await this.registerLink.click();
    await this.genderSelection.click();
    await this.firstName.fill(FirstName);
    await this.lastName.fill(LastName);
    await this.email.fill(Email);
    await this.password.fill(Password);
    await this.confirmPassword.fill(Password);
    await this.registerButton.click();
  }

  async verifyHomePage() {
    const verifyLoggedIn=await this.page.locator("//div[normalize-space(text())='Your registration completed']");
    await expect(verifyLoggedIn).toBeVisible();
  }

  async searchProduct(){
    await this.computerMenu.click();
    await this.desktopMenu.waitFor({ state: 'visible' });
    await this.desktopMenu.click();
    await this.deviceSelector.waitFor({ state: 'visible' });
  }

  async selectProduct(){
    await this.deviceSelector.click();
    await this.addCartOption.waitFor({ state: 'visible' });
    await this.hddSelector.click();
  }

  async addToCart() {
    
    await this.addCartOption.click();
    await this.addSuccessMessage.waitFor({ state: 'visible' });
    await this.addSuccessMessage.waitFor({ state: 'hidden' });
  }

  async verifyProductVisibleInCart() {
    await this.cartPage.click();
    await this.deviceSelector.waitFor({ state: 'visible' });
    await expect(this.deviceSelector).toBeVisible();
  }

  async logout() {
    await this.logoutLink.click();
  }

  async verifyLogout() {
    await expect(this.registerLink).toBeVisible();
  }
}
