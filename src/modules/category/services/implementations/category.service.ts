import { Inject, Injectable } from "@nestjs/common";
import { ICategoryService } from "../interfaces/category.service.interface";
import { CategoryDto } from "../../dtos/category.dto";
import { CategoryRepository } from "../../domain/repositories/category.repository";
import { SequenceService } from "../../../sequence/services/implementations/sequence.services";
import { SequenceConstant } from "../../../../common/constant/sequence.constant";
import { SubcategoryDto } from "../../dtos/subcategory.dto";
import { SubcategoryRepository } from "../../domain/repositories/subcategory.repository";
import { CategoryNameDto } from "../../dtos/category-name.dto";
import { ISequenceService } from "../../../sequence/services/interfaces/sequence.service.interface";
import { CategoryMapper } from "../mapper/category.mapper";
import { CategoryErrorConstant, CategoryException } from "../../../../common/exception/category.exception";
import { ObjectUtils } from "../../../../common/utils/object.utils";

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly subcategoryRepository: SubcategoryRepository,
    private readonly categoryMapper: CategoryMapper,
    @Inject(SequenceService.name) private readonly sequenceService: ISequenceService
  ) {
  }

  async createCategory(categoryDto: CategoryDto): Promise<CategoryDto> {
    if(ObjectUtils.isEmpty(categoryDto)) {
      throw new CategoryException(CategoryErrorConstant.EMPTY_CATEGORY);
    }

    const _id = await this.sequenceService.generateId(
      SequenceConstant.PRODUCT_CATEGORY_PREFIX
    );
    const result = await this.categoryRepository.create({ ...categoryDto, _id });
    return this.categoryMapper.mapSchemaToModel(result, CategoryDto);
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

  async findCategoryById(id: string): Promise<CategoryDto> {
    const result = await this.categoryRepository.findOneById(id)

    if(ObjectUtils.isEmpty(result)) {
      throw new CategoryException(CategoryErrorConstant.CATEGORY_NOT_FOUND);
    }

    return this.categoryMapper.mapSchemaToModel(result, CategoryDto);
  }

  async updateCategory(id: string, categoryDto: CategoryDto): Promise<CategoryDto> {
    if(ObjectUtils.isEmpty(categoryDto)) {
      throw new CategoryException(CategoryErrorConstant.INVALID_CATEGORY);
    }

    categoryDto = { ...categoryDto, last_updated_on: new Date() };
    const result = await this.categoryRepository.update(id, categoryDto);

    if(ObjectUtils.isEmpty(result)) {
      throw new CategoryException(CategoryErrorConstant.CATEGORY_NOT_FOUND);
    }

    return this.categoryMapper.mapSchemaToModel(result, CategoryDto);
  }

  async deactivateCategory(id: string, is_active: boolean): Promise<CategoryDto> {
    const result = await this.categoryRepository.deactivateCategoryById(id, is_active);

    if(ObjectUtils.isEmpty(result)) {
      throw new CategoryException(CategoryErrorConstant.CATEGORY_NOT_FOUND);
    }

    return this.categoryMapper.mapSchemaToModel(result, CategoryDto);
  }

  async deleteCategory(id: string): Promise<CategoryDto> {
    await this.subcategoryRepository.deleteSubcategoryByCatId(id);
    const result = await this.categoryRepository.delete(id)

    if(ObjectUtils.isEmpty(result)) {
      throw new CategoryException(CategoryErrorConstant.CATEGORY_NOT_FOUND);
    }

    return this.categoryMapper.mapSchemaToModel(result, CategoryDto);
  }

  async createSubcategory(subcategoryDto: SubcategoryDto): Promise<SubcategoryDto> {
    if(ObjectUtils.isEmpty(subcategoryDto)){
      throw new CategoryException(CategoryErrorConstant.INVALID_SUBCATEGORY);
    }

    const _id = await this.sequenceService.generateId(
      SequenceConstant.PRODUCT_SUBCATEGORY_PREFIX
    );

    const result = await this.subcategoryRepository.create({ ...subcategoryDto, _id });
    return this.categoryMapper.mapSchemaToModel(result, SubcategoryDto);
  }

  async updateSubcategory(id: string, subcategoryDto: SubcategoryDto): Promise<SubcategoryDto> {
    subcategoryDto = { ...subcategoryDto, last_updated_on: new Date() };
    const result = await this.subcategoryRepository.update(id, subcategoryDto);

    if(ObjectUtils.isEmpty(result)) {
      throw new CategoryException(CategoryErrorConstant.SUBCATEGORY_NOT_FOUND);
    }

    return this.categoryMapper.mapSchemaToModel(result, SubcategoryDto);
  }

  async deactivateSubcategory(id: string, is_active: boolean): Promise<SubcategoryDto> {
    const result = await this.subcategoryRepository.deactivateSubcategoryById(id, is_active);

    if(ObjectUtils.isEmpty(result)) {
      throw new CategoryException(CategoryErrorConstant.SUBCATEGORY_NOT_FOUND);
    }

    return this.categoryMapper.mapSchemaToModel(result, SubcategoryDto);
  }

  async deleteSubcategory(id: string): Promise<SubcategoryDto> {
    const result = await this.subcategoryRepository.delete(id);

    if(ObjectUtils.isEmpty(result)) {
      throw new CategoryException(CategoryErrorConstant.SUBCATEGORY_NOT_FOUND);
    }

    return this.categoryMapper.mapSchemaToModel(result, SubcategoryDto);
  }

  async findAllSubcategory(): Promise<SubcategoryDto[]> {
    const result = await this.subcategoryRepository.findAll();
    return this.categoryMapper.mapSchemaListToDtoList(result, SubcategoryDto);
  }

  async findAllSubcategoryByCatId(cat_id: string): Promise<SubcategoryDto[]> {
    const result = await this.subcategoryRepository.findSubcategoryByCatId(cat_id);

    if(ObjectUtils.isEmpty(result)) {
      throw new CategoryException(CategoryErrorConstant.SUBCATEGORY_NOT_FOUND);
    }

    return this.categoryMapper.mapSchemaListToDtoList(result, SubcategoryDto);
  }

  async findOneSubcategoryById(id: string): Promise<SubcategoryDto> {
    const result = await this.subcategoryRepository.findOneById(id);

    if(ObjectUtils.isEmpty(result)){
      throw new CategoryException(CategoryErrorConstant.SUBCATEGORY_NOT_FOUND);
    }

    return this.categoryMapper.mapSchemaToModel(result.toObject(), SubcategoryDto);
  }

  async findNameById(id: string): Promise<CategoryNameDto> {
    if (id.includes(SequenceConstant.PRODUCT_SUBCATEGORY_PREFIX)) {
      const subcat = await this.subcategoryRepository.findOneById(id);
      const cat = await this.categoryRepository.findOneById(subcat.cat_id);
      return { cat_name: cat.cat_name, subcat_name: subcat.subcat_name };
    } else {
      const cat = await this.categoryRepository.findOneById(id);
      return { cat_name: cat.cat_name, subcat_name: null };
    }
  }
}
