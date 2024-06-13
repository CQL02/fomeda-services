import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from "@nestjs/common";
import * as passport from 'passport'
import * as session from 'express-session';
import * as connectMongoDBSession from 'connect-mongodb-session';
const MongoDBStore = connectMongoDBSession(session);

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: 'sessions'
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalPipes(new ValidationPipe(
  //   {
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     transform: true,
  //   } ));

  app.enableCors({
    credentials: true
  });

  app.use(
    session({
      secret: "secret",
      resave: false,
      cookie: { maxAge: 3600000},
      store: store
    })
  )

  app.use(passport.initialize())
  app.use(passport.session())

  await app.listen(4000);
}
bootstrap();
