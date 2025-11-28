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
        this.computerMenu = 'a[href="/{link}"]';
        this.desktopMenu = page.locator('a[href="/desktops"]').nth(3);
        this.deviceSelector = 'a[href="/{productName}"]';
        this.selectBillingCountry = page.locator('#BillingNewAddress_CountryId');
        this.verifyHomePageDisplayed = page.locator("//div[normalize-space(text())='Your registration completed']");

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
        await expect(this.verifyHomePageDisplayed).toBeVisible();
    }

    async searchProduct(link, productName) {
        const safeLink = String(link).trim();
        const safeProductName = String(productName).trim();
        const locatorString =this.page.locator(this.computerMenu.replace("{link}", safeLink));
        await locatorString.nth(0).click();
        if (safeLink==="computers") {
            await this.desktopMenu.waitFor({ state: 'visible' });
            await this.desktopMenu.click();
        }
        const productLocator = this.page.locator(this.deviceSelector.replace("{productName}",safeProductName));
        await productLocator.nth(0).waitFor({ state: 'visible' });
    }

    async selectProduct() {
        await productLocator.nth(0).click();
        await this.addCartOption.waitFor({ state: 'visible' });
        if (safeLink==="computers") {
            await this.hddSelector.click();
        }
    }

    async addToCart() {
        await this.addCartOption.click();
        await this.addSuccessMessage.waitFor({ state: 'visible' });
        await this.addSuccessMessage.waitFor({ state: 'hidden' });
    }

    async verifyProductVisibleInCart() {
        await this.cartPage.click();
        await this.selectCountry.waitFor({ state: 'visible' });
        await expect(this.productInCart).toBeVisible();
    }

    async logout() {
        await this.logoutLink.click();
    }

    async verifyLogout() {
        await expect(this.registerLink).toBeVisible();
    }

    async selectCountryByValue(value) {
        await this.selectCountry.selectOption(value);
        await this.termsCheckbox.check();
    }

    async fillBillingDetails({ City, Address1, ZipPostalCode, PhoneNumber }) {
        await this.checkoutButton.click();
        await this.billingPage.waitFor({ state: 'visible' });
        await this.selectBillingCountry.selectOption("41"); // India
        await this.cityInput.fill(City);
        await this.address1Input.fill(Address1);
        await this.zipInput.fill(ZipPostalCode);
        await this.phoneInput.fill(PhoneNumber);
        await this.continueButton.click();
        await this.shippingPage.waitFor({ state: "visible" });
        await this.pickStoreCheckbox.check();
        await this.shippingContinueButton.click();
        await this.modeOfPayment.waitFor({ state: "visible" });
        await expect(this.paymentModeCheckbox).toBeChecked();
        await this.paymentContinueButton.click();
        await this.selectedModeOfPayment.waitFor({ state: "visible" });
        await this.modeOfPaymentContinueButton.click();
        await this.verifyConfirmOrder.waitFor({ state: "visible" });
        await this.confirmOrder.click();
        await this.successOrderMessage.waitFor({ state: "visible" });
        await this.page.locator("//a[text()='Click here for order details.']").click();
    }

    async verifyOrderDetails() {
        await this.orderDetailsPage.waitFor({ state: "visible" });
        await expect(this.orderDetailsPage).toBeVisible();
    }
}
