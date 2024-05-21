import { Injectable } from '@nestjs/common';
import { ICategoryService } from './category.service.interface';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { Category } from '../domain/schema/category.schema';
import { CategoryRepository } from '../domain/repositories/category.repository';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryRepository.create(createCategoryDto);
  }

  async findAllCategories(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  async findCategoryById(id: string): Promise<Category> {
    return this.categoryRepository.findOneById(id);
  }
}
