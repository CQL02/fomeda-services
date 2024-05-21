import { Category } from '../domain/schema/category.schema';
import { CreateCategoryDto } from '../dtos/create-category.dto';

export interface ICategoryService {
  create(createCategoryDto: CreateCategoryDto): Promise<Category>;
  findAllCategories(): Promise<Category[]>;
  findCategoryById(id: string): Promise<Category>;
}
