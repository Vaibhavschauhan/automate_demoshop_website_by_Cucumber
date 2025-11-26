import { Before, After, When, Then, Given, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium } from 'playwright';
import { expect } from "playwright/test";
import demoshopPage from "../../POM_pages/demoshopPage.js";

setDefaultTimeout(60 * 1000);

Before(async function () {
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.demoshop = null;
});

After(async function () {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
});

Given('Create account to demoshop with {string} is', async function (url) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    this.demoshop = new demoshopPage(this.page);
});

When('user clicks on register link and fill all the details and submit', async function (dataTable) {
    const rows = dataTable.hashes();
    const input = rows[0];

    // Create unique suffix
    const suffix = `${Date.now().toString().slice(-5)}${Math.floor(Math.random() * 900 + 100)}`;

    // Read name & password exactly as user wrote
    const FirstName = input.FirstName.trim();
    const LastName = input.LastName.trim();
    const Password = input.Password.trim();

    // Generate unique email from provided one
    let email = input.Email.trim();
    const atIndex = email.indexOf('@');

    if (atIndex > 0) {
        const local = email.slice(0, atIndex).replace(/\+.*$/, '');
        const domain = email.slice(atIndex + 1);
        email = `${local}+${suffix}@${domain}`;
    } else {
        email = `autouser${suffix}@example.com`;
    }

    const details = {
        FirstName,
        LastName,
        Email: email,
        Password
    };

    console.log('Generated email:', details.Email);

    await this.demoshop.registerAccount(details);
});


Then('verify home page is displayed', async function () {
    await this.demoshop.verifyHomePage();

});

When('user search for computer product',async function () {
    await this.demoshop.searchProduct();
});

Then('select the product from the list',async function () {
    await this.demoshop.selectProduct();
});

Then('add the product to cart',async function () {
    await this.demoshop.addToCart();
});

Then('verify product is added to cart successfully',async function () {
    await this.demoshop.verifyProductVisibleInCart();
});

When('user logout from the application',async function () {
    await this.demoshop.logout();
});

Then('verify user is logged out successfully',async function () {
    await this.demoshop.verifyLogout();
});