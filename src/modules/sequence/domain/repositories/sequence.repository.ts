import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../../../../common/database/abstracts/repository.abstract';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sequence } from '../schema/sequence.schema';

@Injectable()
export class SequenceRepository extends AbstractRepository<Sequence> {
  constructor(
    @InjectModel(Sequence.name)
    private readonly sequenceModel: Model<Sequence>,
  ) {
    super(sequenceModel);
  }

  async findOneAndUpdate(prefix: string, update: any): Promise<Sequence> {
    return this.sequenceModel
      .findOneAndUpdate({ prefix }, update, { upsert: true, new: true })
      .exec();
  }

  async findOneByPrefix(prefix: string): Promise<Sequence> {
    return this.sequenceModel.findOne({ prefix }).exec();
  }
}
