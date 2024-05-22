import { Injectable } from '@nestjs/common';
import { ICategoryService } from './category.service.interface';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { Category } from '../domain/schema/category.schema';
import { CategoryRepository } from '../domain/repositories/category.repository';
import { SequenceService } from '../../sequence/services/sequence.services';
import { SequenceConstant } from '../../../common/constant/sequence.constant';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly sequenceService: SequenceService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const _id = await this.sequenceService.generateId(
      SequenceConstant.PRODUCT_CATEGORY_PREFIX,
    );
    return this.categoryRepository.create({ ...createCategoryDto, _id });
  }

  async findAllCategories(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  async findCategoryById(id: string): Promise<Category> {
    return this.categoryRepository.findOneById(id);
  }
}
