import { Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";

setDefaultTimeout(60_000);

Before(async function () {
  this.browser = await chromium.launch({ headless: false }); // false while debugging
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Before({tags:"@registerDemotest"},async function () {
  this.browser = await chromium.launch({ headless: false }); // false while debugging
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After({tags:"@registerDemotest"}, async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Before({tags:"@OrderProductTest"},async function () {
  this.browser = await chromium.launch({ headless: false }); // false while debugging
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After({tags:"@OrderProductTest"}, async function () {
  if (this.browser) {
    await this.browser.close();
  }
});