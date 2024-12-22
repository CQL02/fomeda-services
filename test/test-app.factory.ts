import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app/app.module';
import { setupInMemoryDatabase, teardownInMemoryDatabase } from "./database-seeder";
import * as session from "express-session";
import * as passport from "passport";
import { ConfigService } from "@nestjs/config";

let app: INestApplication;

export const getTestApp = async (): Promise<INestApplication> => {
  if (!app) {
    const mainDbUri = "mongodb+srv://db-user:mongo123@fomeda-test.ubf7j.mongodb.net/fomeda-test";
    await setupInMemoryDatabase(mainDbUri);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.use(
      session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 10 * 60 * 1000 }, // 10 minutes
        // store: store,
        // genid: () => crypto.randomBytes(16).toString('hex')
      })
    )

    app.use(passport.initialize())
    app.use(passport.session())
    await app.init();
  }
  return app;
};

export const closeTestApp = async (): Promise<void> => {
  if (app) {
    await app.close();
    app = null;
  }
  await teardownInMemoryDatabase();
};
