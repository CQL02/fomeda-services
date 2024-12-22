import { categoryTest } from "./category.e2e";
import { closeTestApp, getTestApp } from "./test-app.factory";
import { productSearchAndComparisonTest } from "./product-search-and-comparison.e2e";
import { reportTest } from "./report.e2e";
import { productVerificationTest } from "./product-verification.e2e";
import { productManagementTest } from "./product-management.e2e";

describe('AppController (e2e)', () => {

  beforeAll(async () => {
    await getTestApp(); // Ensure app is initialised
  });

  afterAll(async () => {
    await closeTestApp(); // Ensure app is closed after all tests
  });


  // categoryTest();
  // productSearchAndComparisonTest();
  // reportTest();
  // productVerificationTest();
  // productManagementTest();
});
