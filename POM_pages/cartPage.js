import { expect } from "playwright/test";

export default class cartPage {
    constructor(page) {
        this.page = page;
        this.selectCountry = page.locator('#CountryId');
        this.termsCheckbox = page.locator('#termsofservice');
        this.checkoutButton = page.locator('#checkout');
        this.cartPage = page.locator("//span[text()='Shopping cart']");
        this.productInCart = page.locator("//*[text()='Build your own computer' and @class='product-name']");

    }

    async selectCountryByValue(value) {
        await this.selectCountry.selectOption(value);
        await this.termsCheckbox.check();
    }

    async verifyProductVisibleInCart() {
        await this.cartPage.click();
        await this.selectCountry.waitFor({ state: 'visible' });
        await expect(this.productInCart).toBeVisible();
    }

}
