// features/step-definitions/orderProduct.step.js
import { Given, When, Then } from "@cucumber/cucumber";

// import your page objects (paths relative to this file)
import DemoShopPage from "../../POM_pages/demoshopPage.js";
import ProductPage from "../../POM_pages/productPage.js";
import CartPage from "../../POM_pages/cartPage.js";
import OrderProductPage from "../../POM_pages/orderProduct.js";
import AddNewAddressPage from "../../POM_pages/addAddressPage.js";

Given('User is on demoshop application with {string} is', async function (url) {
  // this.page is already created by the Before in hooks.js
  await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

  this.demoshop = new DemoShopPage(this.page);
  this.productPage = new ProductPage(this.page);
  this.cartPage = new CartPage(this.page);
  this.orderDetailsPage = new OrderProductPage(this.page);
  this.demoshop = new DemoShopPage(this.page);
    this.addNewAddressPage = new AddNewAddressPage(this.page);
});

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
  await this.demoshop.searchProduct();
  await this.productPage.selectProduct();
  await this.productPage.addToCart();
  await this.cartPage.verifyProductVisibleInCart();
  await this.cartPage.selectCountryByValue("41"); // India
});

When('user proceed to checkout and fill all the details', async function (dataTable) {
  const rows = dataTable.hashes();
  const input = rows[0];
  await this.orderDetailsPage.fillBillingDetails(input);
});

Then('verify order is placed successfully', async function () {
  await this.orderDetailsPage.verifyOrderDetails();
});
