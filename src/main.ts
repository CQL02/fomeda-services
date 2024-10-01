import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from "@nestjs/common";
import * as passport from 'passport'
import * as session from 'express-session';
import * as connectMongoDBSession from 'connect-mongodb-session';
import * as bodyParser from 'body-parser';
import * as crypto from 'crypto';
import { ConfigService } from "@nestjs/config";

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

  const configService =app.get(ConfigService);
  app.enableCors({
    origin: configService.get('FRONTEND_URL'),
    credentials: true
  });

  app.use(
    session({
      secret: "secret",
      resave: false,
      cookie: { maxAge: 10 * 60 * 1000}, // 10 minutes
      // store: store,
      genid: () => crypto.randomBytes(16).toString('hex')
    })
  )

  app.use(passport.initialize())
  app.use(passport.session())
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
