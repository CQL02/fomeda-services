import { Injectable } from "@nestjs/common";
import { ICategoryService } from "../interfaces/category.service.interface";
import { CategoryDto } from "../../dtos/category.dto";
import { Category } from "../../domain/schema/category.schema";
import { CategoryRepository } from "../../domain/repositories/category.repository";
import { SequenceService } from "../../../sequence/services/sequence.services";
import { SequenceConstant } from "../../../../common/constant/sequence.constant";
import { SubcategoryDto } from "../../dtos/subcategory.dto";
import { Subcategory } from "../../domain/schema/subcategory.schema";
import { SubcategoryRepository } from "../../domain/repositories/subcategory.repository";

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly sequenceService: SequenceService,
    private readonly subcategoryRepository: SubcategoryRepository
  ) {
  }

  async createCategory(categoryDto: CategoryDto): Promise<Category> {
    const _id = await this.sequenceService.generateId(
      SequenceConstant.PRODUCT_CATEGORY_PREFIX
    );
    return this.categoryRepository.create({ ...categoryDto, _id });
  }

  async findAllCategories(): Promise<CategoryDto[]> {
    const categoryList = await this.categoryRepository.findAll();
    const subcategoryList = await this.subcategoryRepository.findAll();
    const result = categoryList.map(cat => {
      const filteredSubcategory = subcategoryList.filter(subcat => subcat.cat_id === cat._id.toString());
      return filteredSubcategory.length > 0 ? { ...cat.toObject(), children: filteredSubcategory } : cat.toObject();
    });
    return result;
  }

  async findCategoryById(id: string): Promise<Category> {
    return this.categoryRepository.findOneById(id);
  }

  async updateCategory(id: string, categoryDto: CategoryDto): Promise<Category> {
    return this.categoryRepository.update(id, categoryDto);
  }

  async deactivateCategory(id: string, is_active: boolean): Promise<Category> {
    return this.categoryRepository.deactivateCategoryById(id, is_active);
  }

  async deleteCategory(id: string): Promise<Category> {
    return this.categoryRepository.delete(id);
  }

  async createSubcategory(subcategoryDto: SubcategoryDto): Promise<SubcategoryDto> {
    const _id = await this.sequenceService.generateId(
      SequenceConstant.PRODUCT_SUBCATEGORY_PREFIX
    );
    return this.subcategoryRepository.create({ ...subcategoryDto, _id });
  }

  async updateSubcategory(id: string, subcategoryDto: SubcategoryDto): Promise<SubcategoryDto> {
    return this.subcategoryRepository.update(id, subcategoryDto);
  }

  async deactivateSubcategory(id: string, is_active: boolean): Promise<SubcategoryDto> {
    return this.subcategoryRepository.deactivateSubcategoryById(id, is_active);
  }

  async deleteSubcategory(id: string): Promise<SubcategoryDto> {
    return this.subcategoryRepository.delete(id);
  }

  async findAllSubcategory(): Promise<Subcategory[]> {
    return this.subcategoryRepository.findAll();
  }

  async findAllSubcategoryByCatId(cat_id: string): Promise<Subcategory[]> {
    return this.subcategoryRepository.findSubcategoryByCatId(cat_id);
  }
}
