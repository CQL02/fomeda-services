import { Model, Document } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class AbstractRepository<T extends Document> {
  protected constructor(protected readonly model: Model<T>) {}

  async create(createDto: any): Promise<T> {
    const createdEntity = new this.model(createDto);
    return createdEntity.save();
  }

  async findAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  async findAllByFilter(filterDto): Promise<T[]> {
    return this.model.find(filterDto).exec();
  }

  async findOneById(id: string): Promise<T> {
    return this.model.findById(id).exec();
  }

  async findOneByFilter(filterDto): Promise<T> {
    return this.model.findOne(filterDto).exec();
  }

  async update(id: string, updateDto: any): Promise<T> {
    return this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  async updateOneByFilter(filterDto, updateDto): Promise<T> {
    return this.model.findOneAndUpdate(filterDto, updateDto).exec();
  }

  async delete(id: string): Promise<T> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
