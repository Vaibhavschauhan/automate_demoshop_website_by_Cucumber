export default {
  require: [
    "features/step-definitions/*.js",
    "features/support/*.js"
  ],
  publishQuiet: true,
  format: [
    "progress",
    "allure-cucumberjs/reporter"
  ],
  formatOptions: {
    "allure-cucumberjs/reporter": {
      resultsDir: process.env.ALLURE_RESULTS_DIR || "reports/allure-results"
    }
  }
};