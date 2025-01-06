module.exports = {
  default: {
    require: ['./features/support/**/*.cjs'], // Path to step definitions
    paths: ['./features/**/*.feature'],              // Path to feature files
    format: ['json:reports/cucumber-report.json'],   // Report format
    parallel: 0, // Disable parallelization
    retry: 1,    // Retry failed scenarios once
  },
};