const nextJest = require("next/jest")

const createJestConfig = nextJest({
  dir: "./",
})

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/src/test.config.ts"],
  moduleDirectories: ["node_modules"],
  testEnvironment: "jest-environment-jsdom",
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!**/*.spec.{ts,tsx}",
    "!**/_*.{ts,tsx}",
  ],
  coverageReporters: ["lcov", "json"],
}

module.exports = createJestConfig(customJestConfig)
