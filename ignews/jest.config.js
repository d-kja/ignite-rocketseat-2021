const nextJest = require("next/jest")

const createJestConfig = nextJest({
  dir: "./",
})

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/src/test.config.ts"],
  moduleDirectories: ["node_modules"],

  testEnvironment: "jest-environment-jsdom",
}

module.exports = createJestConfig(customJestConfig)
