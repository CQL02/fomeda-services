import { INestApplication } from '@nestjs/common';
import { categoryTest } from "./category.e2e";
import { closeTestApp, getTestApp } from "./test-app.factory";

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    await getTestApp(); // Ensure app is initialised
  });

  afterAll(async () => {
    await closeTestApp(); // Ensure app is closed after all tests
  });


  categoryTest()
});
