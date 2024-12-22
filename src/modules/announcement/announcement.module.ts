import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Announcement, AnnouncementSchema } from './domain/schema/announcement.schema';

import { AnnouncementRepository } from './domain/repositories/announcement.repository';
import { AnnouncementController } from './controllers/announcement.controller';
import { AnnouncementService } from './services/implementations/announcement.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Announcement.name, schema: AnnouncementSchema },

    ]),
  ],
  providers: [AnnouncementService, AnnouncementRepository],
  controllers: [AnnouncementController],
})

export class AnnouncementModule {}
