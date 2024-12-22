import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../../../../common/database/abstracts/repository.abstract';
import { HistoryTimeline } from '../schema/history-timeline.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class HistoryTimelineRepository extends AbstractRepository<HistoryTimeline> {
  constructor(
    @InjectModel(HistoryTimeline.name)
    private readonly userModel: Model<HistoryTimeline>,
  ) {
    super(userModel);
  }

}
