import { When, Then, Given } from "@cucumber/cucumber";
import DemoshopPage from "../../POM_pages/demoshopPage.js";

Given('Create account to demoshop with {string} is', async function (url) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    this.demoshop = new DemoshopPage(this.page);
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

    await this.demoshop.registerAccount(details);
});

Then('verify home page is displayed', async function () {
    await this.demoshop.verifyHomePage();
});

