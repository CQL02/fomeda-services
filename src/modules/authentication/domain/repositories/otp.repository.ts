import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../../../../common/database/abstracts/repository.abstract';
import { Otp } from '../schema/otp.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OtpRepository extends AbstractRepository<Otp> {
  constructor(
    @InjectModel(Otp.name)
    private readonly otpModel: Model<Otp>,
  ) {
    super(otpModel);
  }
}
