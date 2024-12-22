import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Sequence, SequenceSchema } from './domain/schema/sequence.schema';
import { SequenceService } from './services/implementations/sequence.services';
import { SequenceRepository } from './domain/repositories/sequence.repository';
import { SequenceController } from './controller/sequence.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Sequence.name, schema: SequenceSchema },
    ]),
  ],
  providers: [
    { provide: SequenceService.name, useClass: SequenceService },
    SequenceRepository
  ],
  controllers: [SequenceController],
  exports: [SequenceService.name],
})
export class SequenceModule {}
