import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryDto } from '../dtos/category.dto';
import { Category } from '../domain/schema/category.schema';
import { CategoryService } from '../services/implementations/category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(@Body() categoryDto: CategoryDto) {
    return this.categoryService.createCategory(categoryDto);
  }

  @Put()
  async updateCategory(
    @Param('id') id: string,
    @Body() categoryDto: CategoryDto,
  ) {
    return this.categoryService.updateCategory(id, categoryDto);
  }

  @Get()
  async findAllCategories(): Promise<Category[]> {
    return this.categoryService.findAllCategories();
  }

  @Get(':id')
  async findCategoryById(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findCategoryById(id);
  }
}
