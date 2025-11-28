// features/step-definitions/orderProduct.step.js
import { When, Then } from "@cucumber/cucumber";
import fs from "fs";
import path from "path";

When('user create account to demoshop with valid credentials', async function (dataTable) {
  const rows = dataTable.hashes();
  const input = rows[0];

  const suffix = `${Date.now().toString().slice(-5)}${Math.floor(Math.random() * 900 + 100)}`;

  const FirstName = input.FirstName.trim();
  const LastName = input.LastName.trim();
  const Password = input.Password.trim();

  let email = input.Email.trim();
  const atIndex = email.indexOf('@');

  if (atIndex > 0) {
    const local = email.slice(0, atIndex).replace(/\+.*$/, '');
    const domain = email.slice(atIndex + 1);
    email = `${local}+${suffix}@${domain}`;
  } else {
    email = `autouser${suffix}@example.com`;
  }

  const details = { FirstName, LastName, Email: email, Password };

  // DemoShopPage must have registerAccount(details)
  await this.demoshop.registerAccount(details);
});

When('user select the product and add to cart', async function () {
  const jsonPath = path.resolve("User_data/userData.json");
  const dataset = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  await this.demoshop.searchProduct(dataset[3].link,dataset[3].productName);
  await this.productPage.selectProduct();
  await this.productPage.addToCart();
  await this.cartPage.verifyProductVisibleInCart(dataset[3].productFullName);
  await this.cartPage.selectCountryByValue("41"); // India
});

When('user proceed to checkout and fill all the details', async function () {
  const jsonPath = path.resolve("User_data/userData.json");
  const dataset = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

  const input = dataset[0];
  await this.orderDetailsPage.fillBillingDetails(input);
});

Then('verify order is placed successfully', async function () {
  await this.orderDetailsPage.verifyOrderDetails();
});
