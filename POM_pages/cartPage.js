import { expect } from "playwright/test";

export default class cartPage {
    constructor(page) {
        this.page = page;
        this.selectCountry = page.locator('#CountryId');
        this.termsCheckbox = page.locator('#termsofservice');
        this.checkoutButton = page.locator('#checkout');
        this.cartPage = page.locator("//span[text()='Shopping cart']");
        this.productInCart = "//*[text()='{productFullName}' and @class='product-name']";

    }

    async selectCountryByValue(value) {
        await this.selectCountry.selectOption(value);
        await this.termsCheckbox.check();
    }

    async verifyProductVisibleInCart(productFullName) {
        const safeProductName = String(productFullName).trim();
        await this.cartPage.click();
        await this.selectCountry.waitFor({ state: 'visible' });
        const productLocator = this.page.locator(this.productInCart.replace("{productFullName}",safeProductName));
        await expect(productLocator).toBeVisible();
    }

}
