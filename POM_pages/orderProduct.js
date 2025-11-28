import { expect } from "playwright/test";

export default class orderProduct {
    constructor(page) {
        this.page = page;
        this.billingPage = page.locator('//h2[text()="Billing address"]');
        this.shippingPage = page.locator('//h2[text()="Shipping address"]');
        this.cityInput = page.locator('#BillingNewAddress_City');
        this.address1Input = page.locator('#BillingNewAddress_Address1');
        this.zipInput = page.locator('#BillingNewAddress_ZipPostalCode');
        this.phoneInput = page.locator('#BillingNewAddress_PhoneNumber');
        this.continueButton = page.locator("//*[@id='billing-buttons-container']/input");
        this.shippingContinueButton = page.locator("//*[@id='shipping-buttons-container']/input");
        this.paymentContinueButton = page.locator("//*[@id='payment-method-buttons-container']/input");
        this.modeOfPaymentContinueButton = page.locator("//*[@id='payment-info-buttons-container']/input");
        this.pickStoreCheckbox = page.locator('#PickUpInStore');
        this.confirmOrder = page.locator("//*[@id='confirm-order-buttons-container']/input");
        this.orderDetailsPage = page.locator("//div[@class='page-body']");
        this.modeOfPayment = page.locator("//label[text()='Cash On Delivery (COD) (7.00)']");
        this.selectedModeOfPayment = page.locator("//p[text()='You will pay by COD']");
        this.verifyConfirmOrder = page.locator("//h2[text()='Confirm order']");
        this.successOrderMessage = page.locator("//div[@class='title']/strong[text()='Your order has been successfully processed!']");
        this.paymentModeCheckbox = page.locator('#paymentmethod_0');
        this.checkoutButton = page.locator('#checkout');
        this.selectBillingCountry=page.locator('#BillingNewAddress_CountryId');

    }

    async fillBillingDetails({City, Address1, ZipPostalCode, PhoneNumber}) {
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
