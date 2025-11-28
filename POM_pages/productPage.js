import { expect } from "playwright/test";

export default class productPage {
    constructor(page) {
        this.page = page;
        this.addCartOption = page.locator('#add-to-cart-button-16');
        this.hddSelector = page.locator('//*[@id="product_attribute_16_3_6_18"]');
        this.addSuccessMessage = page.locator('text=The product has been added to your shopping cart');
        this.cartPage = page.locator("//span[text()='Shopping cart']");
        this.deviceSelector = page.locator('a[href*="/build-your-own-computer"]').nth(1);

    }

    async selectProduct() {
        await this.deviceSelector.click();
        await this.addCartOption.waitFor({ state: 'visible' });
        await this.hddSelector.click();
    }

    async addToCart() {

        await this.addCartOption.click();
        await this.addSuccessMessage.waitFor({ state: 'visible' });
        await this.addSuccessMessage.waitFor({ state: 'hidden' });
    }

    
}
