import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMongoConfig } from '../config/database.config';
import { CategoryModule } from '../modules/category/category.module';
import { AuthenticationModule } from '../modules/authentication/authentication.module';
import { AnnouncementModule } from '../modules/announcement/announcement.module';
import { ContentModule } from '../modules/content/content.module';
import { ProductModule } from "../modules/product/product.module";
import { RoleModule } from '../modules/role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule, CategoryModule, AuthenticationModule, AnnouncementModule, ContentModule, ProductModule, RoleModule],
      useFactory: (configService: ConfigService) =>
        getMongoConfig(configService),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
