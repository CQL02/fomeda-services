import { Module } from '@nestjs/common';
import { CategoryService } from './services/category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './domain/schema/category.schema';
import { CategoryRepository } from './domain/repositories/category.repository';
import { CategoryController } from './controllers/category.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
})
export class CategoryModule {}
