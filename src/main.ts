import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as passport from 'passport'
import * as session from 'express-session';
import * as connectMongoDBSession from 'connect-mongodb-session';
import * as bodyParser from 'body-parser';
import { ConfigService } from "@nestjs/config";
import * as express from 'express';

const MongoDBStore = connectMongoDBSession(session);

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: 'sessions'
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const expressApp = app.getHttpAdapter().getInstance() as express.Express;

  expressApp.set('trust proxy', 1);
  // app.useGlobalPipes(new ValidationPipe(
  //   {
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     transform: true,
  //   } ));

  const configService =app.get(ConfigService);
  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [configService.get('FRONTEND_URL')];
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  });

  app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 10 * 60 * 1000,
        sameSite: process.env.ENVIRONMENT === 'production' ? 'none' : 'lax',
        secure: process.env.ENVIRONMENT === 'production',
      },
      // store: store,
      // genid: () => crypto.randomBytes(16).toString('hex')
    })
  )

  app.use(passport.initialize())
  app.use(passport.session())
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
