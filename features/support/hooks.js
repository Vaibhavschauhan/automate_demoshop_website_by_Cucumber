import { Before, BeforeAll, AfterAll, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";

import fs from "fs";
import path from "path";

import DemoShopPage from "../../POM_pages/demoshopPage.js";
import ProductPage from "../../POM_pages/productPage.js";
import CartPage from "../../POM_pages/cartPage.js";
import OrderProductPage from "../../POM_pages/orderProduct.js";
import AddNewAddressPage from "../../POM_pages/addAddressPage.js";

setDefaultTimeout(60_000);

let browser;
let context;
let page;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: true }); // false while debugging
  context = await browser.newContext();
  page = await context.newPage();
});

AfterAll(async function () {
  await page?.close();
  await context?.close();
  await browser?.close();
});

Before(async function () {
  
  const jsonPath = path.resolve("User_data/userData.json");
  const dataset = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

  await page.goto(dataset[2].url, {
    waitUntil: "domcontentloaded",
    timeout: 60_000,
  });

  this.browser = browser;
  this.context = context;
  this.page = page;

  this.demoshop = new DemoShopPage(page);
  this.productPage = new ProductPage(page);
  this.cartPage = new CartPage(page);
  this.orderDetailsPage = new OrderProductPage(page);
  this.addNewAddressPage = new AddNewAddressPage(page);
});

After(async function (scenario) {
  // Take screenshot on failure
  if (scenario.result.status === "FAILED") {
    const screenshotsDir = "test-results/screenshots";
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
    const screenshotPath = path.join(
      screenshotsDir,
      `${scenario.pickle.name}-${Date.now()}.png`
    );
    await this.page?.screenshot({ path: screenshotPath });
    console.log(`Screenshot saved: ${screenshotPath}`);
  }

  try {
    await this.demoshop?.logout();
    await this.demoshop?.verifyLogout();
  } catch (error) {
    console.error("Error during logout in After hook:", error);
  }
});
