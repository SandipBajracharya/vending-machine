import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest", // Use ts-jest for TypeScript
  testEnvironment: "node", // Use node environment for testing
  testMatch: ["**/src/**/*.test.ts"], // Match all test files in the src directory
  moduleFileExtensions: ["ts", "js"], // Recognize TypeScript and JavaScript files
};

export default config;
