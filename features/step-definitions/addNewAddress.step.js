import { When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import fs from "fs";
import path from "path";


setDefaultTimeout(60_000);


When('User click on addresses link to add new address', async function () {
    await this.addNewAddressPage.clickOnAddressesLink();

});

Then('verify add address page is displayed', async function () {
    await this.addNewAddressPage.verifyAddAddressPage();

});

When('User click on add new address', async function () {
    await this.addNewAddressPage.clickOnAddNewAddress();

});

When('User fill all the address details', async function () {

    const jsonPath = path.resolve("User_data/userData.json");
    const dataset = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

    const input = dataset[0];   // full address object

    await this.addNewAddressPage.fillAddressDetails(input);
});

Then('User verify saved address is displayed in address list', async function () {
    await this.addNewAddressPage.verifySavedAddressInList();

});