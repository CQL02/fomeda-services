import { MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
export declare const getMongoConfig: (configService: ConfigService) => MongooseModuleOptions;
