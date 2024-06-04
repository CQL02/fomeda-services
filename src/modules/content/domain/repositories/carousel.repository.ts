import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../../../../common/database/abstracts/repository.abstract';
import { Carousel } from '../schema/carousel.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CarouselRepository extends AbstractRepository<Carousel> {
  constructor(
    @InjectModel(Carousel.name)
    private readonly adminModel: Model<Carousel>,
  ) {
    super(adminModel);
  }
  
  // async deactivateAdminById(id: string, is_active: boolean): Promise<Admin> {
  //   return this.adminModel.findByIdAndUpdate(id, {is_active}).exec();
  // }
}
