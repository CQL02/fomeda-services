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
import { StringUtils } from "../../../../common/utils/string.utils";
import { AuthenticationService } from "../../../authentication/services/implementations/authentication.service";
import { IAuthenticationService } from "../../../authentication/services/interfaces/authentication.service.interface";
import { Request } from "express";

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly subcategoryRepository: SubcategoryRepository,
    private readonly categoryMapper: CategoryMapper,
    @Inject(SequenceService.name) private readonly sequenceService: ISequenceService,
    @Inject(AuthenticationService.name) private readonly authenticationService: IAuthenticationService
  ) {
  }

  async createCategory(req: Request, categoryDto: CategoryDto): Promise<CategoryDto> {
    if (ObjectUtils.isEmpty(categoryDto) || StringUtils.isEmpty(categoryDto.cat_name)) {
      throw new CategoryException(CategoryErrorConstant.EMPTY_CATEGORY);
    }

    const category = await this.categoryRepository.findByCategoryName(categoryDto.cat_name.trim());
    if(ObjectUtils.isNotEmpty(category)) {
      throw new CategoryException(CategoryErrorConstant.DUPLICATE_CATEGORY);
    }

    const _id = await this.sequenceService.generateId(
      SequenceConstant.PRODUCT_CATEGORY_PREFIX
    );
    const user_id = req.user;

    const result = await this.categoryRepository.create({ ...categoryDto, _id, created_by: user_id, last_updated_by: user_id });
    return this.categoryMapper.mapSchemaToModel(result.toObject(), CategoryDto);
  }

  async findAllCategories(): Promise<CategoryDto[]> {
    const categoryList = await this.categoryRepository.getAllCategoryWithUsername();
    const subcategoryList = await this.subcategoryRepository.getAllSubcategoryWithUsername();
    return categoryList.map(cat => {
      const filteredSubcategory = subcategoryList.filter(subcat => subcat.cat_id === cat._id.toString());
      return filteredSubcategory.length > 0 ? { ...cat, children: filteredSubcategory } : cat;
    });
  }

  async findAllActiveCategories(): Promise<CategoryDto[]> {
    const categories = await this.findAllCategories();
    const result = categories.filter(cat => cat.is_active)
      .map(cat => ({
        _id: cat._id,
        cat_name: cat.cat_name,
        children: cat.children?.filter(subcat => subcat.is_active).map(subcat => ({
          _id: subcat._id,
          subcat_name: subcat.subcat_name,
        }))
      }))
    return this.categoryMapper.mapSchemaListToDtoList(result, CategoryDto);
  }

  async findCategoryById(id: string): Promise<CategoryDto> {
    const result = await this.categoryRepository.findOneById(id);

    if (ObjectUtils.isEmpty(result)) {
      throw new CategoryException(CategoryErrorConstant.CATEGORY_NOT_FOUND);
    }

    return this.categoryMapper.mapSchemaToModel(result, CategoryDto);
  }

  async updateCategory(req: Request, id: string, categoryDto: CategoryDto): Promise<CategoryDto> {
    if (ObjectUtils.isEmpty(categoryDto) || StringUtils.isEmpty(categoryDto.cat_name)) {
      throw new CategoryException(CategoryErrorConstant.INVALID_CATEGORY);
    }

    const category = await this.categoryRepository.findByCategoryName(categoryDto.cat_name.trim());
    if(ObjectUtils.isNotEmpty(category)) {
      throw new CategoryException(CategoryErrorConstant.DUPLICATE_CATEGORY);
    }

    const user_id = String(req.user);

    categoryDto = { ...categoryDto, last_updated_on: new Date(), last_updated_by: user_id };
    const result = await this.categoryRepository.update(id, categoryDto);

    if (ObjectUtils.isEmpty(result)) {
      throw new CategoryException(CategoryErrorConstant.CATEGORY_NOT_FOUND);
    }

    return this.categoryMapper.mapSchemaToModel(result, CategoryDto);
  }

  async deactivateCategory(req: Request, id: string, is_active: boolean): Promise<CategoryDto> {
    const result = await this.categoryRepository.deactivateCategoryById(req, id, is_active);

    if (ObjectUtils.isEmpty(result)) {
      throw new CategoryException(CategoryErrorConstant.CATEGORY_NOT_FOUND);
    }

    return this.categoryMapper.mapSchemaToModel(result, CategoryDto);
  }

  async deleteCategory(id: string): Promise<CategoryDto> {
    await this.subcategoryRepository.deleteSubcategoryByCatId(id);
    const result = await this.categoryRepository.delete(id);

    if (ObjectUtils.isEmpty(result)) {
      throw new CategoryException(CategoryErrorConstant.CATEGORY_NOT_FOUND);
    }

    return this.categoryMapper.mapSchemaToModel(result, CategoryDto);
  }

  async createSubcategory(req: Request, subcategoryDto: SubcategoryDto): Promise<SubcategoryDto> {
    if (ObjectUtils.isEmpty(subcategoryDto) || StringUtils.isEmpty(subcategoryDto.subcat_name)) {
      throw new CategoryException(CategoryErrorConstant.INVALID_SUBCATEGORY);
    }

    if(StringUtils.isEmpty(subcategoryDto.cat_id)) {
      throw new CategoryException(CategoryErrorConstant.CATEGORY_NOT_FOUND);
    }

    const subcategory = await this.subcategoryRepository.findBySubcategoryName(subcategoryDto.cat_id, subcategoryDto.subcat_name.trim());
    if(ObjectUtils.isNotEmpty(subcategory)){
      throw new CategoryException(CategoryErrorConstant.DUPLICATE_SUBCATEGORY);
    }

    const _id = await this.sequenceService.generateId(
      SequenceConstant.PRODUCT_SUBCATEGORY_PREFIX
    );

    const rating_score = Array.from({length: 5}, (_, index) => ({
      rating: index+1,
      min_value: 0,
      max_value: 0,
    }))

    const user_id = String(req.user);
    const result = await this.subcategoryRepository.create({ ...subcategoryDto, _id, rating_score, created_by: user_id, last_updated_by: user_id });
    return this.categoryMapper.mapSchemaToModel(result, SubcategoryDto);
  }

  async updateSubcategory(req: Request, id: string, subcategoryDto: SubcategoryDto): Promise<SubcategoryDto> {
    if (ObjectUtils.isEmpty(subcategoryDto)) {
      throw new CategoryException(CategoryErrorConstant.INVALID_CATEGORY);
    }

    const subcategory = await this.subcategoryRepository.findBySubcategoryName(subcategoryDto.cat_id, subcategoryDto.subcat_name.trim());
    if(ObjectUtils.isNotEmpty(subcategory)){
      throw new CategoryException(CategoryErrorConstant.DUPLICATE_SUBCATEGORY);
    }

    const user_id = String(req.user);
    subcategoryDto = { ...subcategoryDto, last_updated_on: new Date(), last_updated_by: user_id };
    const result = await this.subcategoryRepository.update(id, subcategoryDto);

    if (ObjectUtils.isEmpty(result)) {
      throw new CategoryException(CategoryErrorConstant.SUBCATEGORY_NOT_FOUND);
    }

    return this.categoryMapper.mapSchemaToModel(result, SubcategoryDto);
  }

  async deactivateSubcategory(req: Request, id: string, is_active: boolean): Promise<SubcategoryDto> {
    const result = await this.subcategoryRepository.deactivateSubcategoryById(req, id, is_active);

    if (ObjectUtils.isEmpty(result)) {
      throw new CategoryException(CategoryErrorConstant.SUBCATEGORY_NOT_FOUND);
    }

    return this.categoryMapper.mapSchemaToModel(result, SubcategoryDto);
  }

  async deleteSubcategory(id: string): Promise<SubcategoryDto> {
    const result = await this.subcategoryRepository.delete(id);

    if (ObjectUtils.isEmpty(result)) {
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

    if (ObjectUtils.isEmpty(result)) {
      throw new CategoryException(CategoryErrorConstant.SUBCATEGORY_NOT_FOUND);
    }

    return this.categoryMapper.mapSchemaListToDtoList(result, SubcategoryDto);
  }

  async findOneSubcategoryById(id: string): Promise<SubcategoryDto> {
    const result = await this.subcategoryRepository.findOneById(id);

    if (ObjectUtils.isEmpty(result)) {
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

  async findAllSubcategoryNameByIds(ids: string[]): Promise<CategoryNameDto[]> {
    let subcategories = [];
    let categories = [];

    if (ids.length === 0) {
      subcategories = await this.subcategoryRepository.findAll();
      categories = await this.categoryRepository.findAll();
    } else {
      subcategories = await this.subcategoryRepository.findAllByFilter({ _id: { $in: ids } });
      const categoryIds = subcategories.map(subcat => subcat.cat_id);
      categories = await this.categoryRepository.findAllByFilter({ _id: { $in: categoryIds } });
    }

    const categoryMap = categories.reduce((acc, cat) => {
      acc[cat._id] = cat.cat_name;
      return acc;
    }, {});

    const combinedDtos = subcategories.map(subcat => ({
      subcat_id: subcat._id,
      subcat_name: subcat.subcat_name, // Assuming the field exists
      cat_id: subcat.cat_id,
      cat_name: categoryMap[subcat.cat_id], // Set the corresponding category name
    }));

    const categoryDtos = categories
      .filter(cat => !subcategories.some(subcat => subcat.cat_id === cat._id))
      .map(cat => ({
        cat_id: cat._id,
        cat_name: cat.cat_name,
      }));

    return this.categoryMapper.mapSchemaListToDtoList([...combinedDtos, ...categoryDtos], CategoryNameDto);
  }
}
