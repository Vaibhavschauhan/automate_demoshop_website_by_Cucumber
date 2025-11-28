import { Given, When, Then } from "@cucumber/cucumber";

Given('User is on demoshop application with is', async function () {
    await this.page.waitForLoadState("domcontentloaded");
    await this.demoshop.registerLink.waitFor({ state: "visible", timeout: 15_000 });
});

When('user clicks on register link and fill all the details and submit with {string} {string} {string} {string}', async function (FirstName, LastName, Email, Password) {
    // Create unique suffix (last 5 digits of timestamp + 3-digit random)
    const suffix = `${Date.now().toString().slice(-5)}${Math.floor(Math.random() * 900 + 100)}`;

    // Trim inputs exactly as user wrote (except we normalize email to include suffix)
    const firstName = FirstName.trim();
    const lastName = LastName.trim();
    const rawPassword = Password.trim();

    // Prepare email: if provided contains '@', insert +suffix before @, otherwise generate one
    let email = (Email || "").trim();
    const atIndex = email.indexOf("@");

    if (atIndex > 0) {
        const local = email.slice(0, atIndex).replace(/\+.*$/, "");
        const domain = email.slice(atIndex + 1);
        email = `${local}+${suffix}@${domain}`;
    } else if (email.length === 0) {
        email = `autouser+${suffix}@example.com`;
    } else {
        // Provided string looks invalid (no @) — still make a usable email
        email = `${email.replace(/\s+/g, "")}+${suffix}@example.com`;
    }

    const details = {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Password: rawPassword,
    };

    // call your page object method (same as before)
    await this.demoshop.registerAccount(details);
});

Then('verify home page is displayed', async function () {
    await this.demoshop.verifyHomePage();
});


