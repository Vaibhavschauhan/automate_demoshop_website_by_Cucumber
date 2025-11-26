module.exports = {
  default: {
    require: [
      "features/step-definitions/*.js", 
      "support/*.js"
    ],
    publishQuiet: true,
    format: ["progress"],
  },
};

