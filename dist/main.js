"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app/app.module");
const passport = require("passport");
const session = require("express-session");
const connectMongoDBSession = require("connect-mongodb-session");
const bodyParser = require("body-parser");
const config_1 = require("@nestjs/config");
const MongoDBStore = connectMongoDBSession(session);
const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'sessions'
});
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const expressApp = app.getHttpAdapter().getInstance();
    expressApp.set('trust proxy', 1);
    const configService = app.get(config_1.ConfigService);
    app.enableCors({
        origin: (origin, callback) => {
            const allowedOrigins = [configService.get('FRONTEND_URL')];
            if (allowedOrigins.includes(origin) || !origin) {
                callback(null, true);
            }
            else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    });
    app.use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 10 * 60 * 1000,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            secure: process.env.NODE_ENV === 'production',
        },
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    await app.listen(process.env.PORT || 4000);
}
bootstrap();
//# sourceMappingURL=main.js.map