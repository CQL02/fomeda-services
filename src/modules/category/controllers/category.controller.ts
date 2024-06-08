import { Body, Controller, Delete, Get, Post, Put, Query } from "@nestjs/common";
import { CategoryDto } from "../dtos/category.dto";
import { Category } from "../domain/schema/category.schema";
import { CategoryService } from "../services/implementations/category.service";
import { GeneralSpecificationDto } from "../dtos/general-specification.dto";
import { GeneralSpecificationService } from "../services/implementations/general-specification.service";
import { GeneralSubspecificationDto } from "../dtos/general-subspecification.dto";
import { SubcategoryDto } from "../dtos/subcategory.dto";
import { BaseSpecificationDto } from "../dtos/base-specification.dto";
import { BaseSpecificationService } from "../services/implementations/base-specification.service";
import { SubcategorySpecificationService } from "../services/implementations/subcategory-specification.service";
import { BaseSubspecificationDto } from "../dtos/base-subspecification.dto";
import { SubcategorySpecificationDto } from "../dtos/subcategory-specification.dto";
import { SubcategorySubspecificationDto } from "../dtos/subcategory-subspecification.dto";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService,
              private readonly generalSpecificationService: GeneralSpecificationService,
              private readonly baseSpecificationService: BaseSpecificationService,
              private readonly subcategorySpecificationService: SubcategorySpecificationService
  ) {
  }

  /* Category Service */
  @Post("create-category")
  async createCategory(@Body() categoryDto: CategoryDto) {
    return await this.categoryService.createCategory(categoryDto);
  }

  @Put("update-category")
  async updateCategory(@Query("id") id: string, @Body() categoryDto: CategoryDto) {
    return await this.categoryService.updateCategory(id, categoryDto);
  }

  @Get("find-all-category")
  async findAllCategories(): Promise<CategoryDto[]> {
    return await this.categoryService.findAllCategories();
  }

  @Get("get-category")
  async findCategoryById(@Query("id") id: string): Promise<Category> {
    return await this.categoryService.findCategoryById(id);
  }

  @Post("create-subcategory")
  async createSubcategory(@Body() subcategoryDto: SubcategoryDto) {
    return await this.categoryService.createSubcategory(subcategoryDto);
  }

  @Put("update-subcategory")
  async updateSubcategory(@Query("id") id: string, @Body() subcategoryDto: SubcategoryDto) {
    return await this.categoryService.updateSubcategory(id, subcategoryDto);
  }

  @Put("deactivate-category")
  async deactivateCategory(@Query("id") id: string, @Query("is_active") is_active: boolean) {
    return await this.categoryService.deactivateCategory(id, is_active);
  }

  @Put("deactivate-subcategory")
  async deactivateSubcategory(@Query("id") id: string, @Query("is_active") is_active: boolean) {
    return await this.categoryService.deactivateSubcategory(id, is_active);
  }

  @Delete("delete-category")
  async deleteCategory(@Query("id") id: string) {
    return await this.categoryService.deleteCategory(id);
  }

  @Delete("delete-subcategory")
  async deleteSubcategory(@Query("id") id: string) {
    return await this.categoryService.deleteSubcategory(id);
  }

  @Get("find-name-by-id")
  async findNameById(@Query("id") id: string) {
    return await this.categoryService.findNameById(id);
  }

  /* General Specification Service */
  @Post("create-general-specification")
  async createGeneralSpecification(@Body() generalSpecificationDto: GeneralSpecificationDto) {
    return await this.generalSpecificationService.createGeneralSpecification(generalSpecificationDto);
  }

  @Get("find-all-general-specification")
  async findAllGeneralSpecification(): Promise<GeneralSpecificationDto[]> {
    return await this.generalSpecificationService.findAllGeneralSpecification();
  }

  @Put("update-general-specification")
  async updateGeneralSpecification(@Query("id") id: string, @Body() generalSpecificationDto: GeneralSpecificationDto) {
    return await this.generalSpecificationService.updateGeneralSpecification(id, generalSpecificationDto);
  }

  @Put("deactivate-general-specification")
  async deactivateGeneralSpecification(@Query("id") id: string, @Query("is_active") is_active: boolean) {
    return await this.generalSpecificationService.deactivateGeneralSpecification(id, is_active);
  }

  @Delete("delete-general-specification")
  async deleteGeneralSpecification(@Query("id") id: string) {
    return await this.generalSpecificationService.deleteGeneralSpecification(id);
  }

  @Post("create-general-subspecification")
  async createGeneralSubspecification(@Body() generalSubspecificationDto: GeneralSubspecificationDto) {
    return await this.generalSpecificationService.createGeneralSubspecification(generalSubspecificationDto);
  }

  @Get("find-all-general-subspecification")
  async findAllGeneralSubspecification() {
    return await this.generalSpecificationService.findAllGeneralSubspecification();
  }

  @Put("update-general-subspecification")
  async updateGeneralSubspecification(@Query("id") id: string, @Body() generalSubspecificationDto: GeneralSubspecificationDto) {
    return await this.generalSpecificationService.updateGeneralSubspecification(id, generalSubspecificationDto);
  }

  @Put("deactivate-general-subspecification")
  async deactivateGeneralSubspecification(@Query("id") id: string, @Query("is_active") is_active: boolean) {
    return await this.generalSpecificationService.deactivateGeneralSubspecification(id, is_active);
  }

  @Delete("delete-general-subspecification")
  async deleteGeneralSubspecification(@Query("id") id: string) {
    return await this.generalSpecificationService.deleteGeneralSubspecification(id);
  }

  /* base specification */
  @Post("create-base-specification")
  async createBaseSpecification(@Body() baseSpecificationDto: BaseSpecificationDto) {
    return await this.baseSpecificationService.createBaseSpecification(baseSpecificationDto);
  }

  @Get("find-base-specification-by-cat-id")
  async findBaseSpecificationById(@Query("id") id: string) {
    return await this.baseSpecificationService.findBaseSpecificationByCatId(id);
  }

  @Put("update-base-specification")
  async updateBaseSpecification(@Query("id") id: string, @Body() baseSpecificationDto: BaseSpecificationDto) {
    return await this.baseSpecificationService.updateBaseSpecification(id, baseSpecificationDto);
  }

  @Put("deactivate-base-specification")
  async deactivateBaseSpecification(@Query("id") id: string, @Query("is_active") is_active: boolean) {
    return await this.baseSpecificationService.deactivateBaseSpecification(id, is_active);
  }

  @Delete("delete-base-specification")
  async deleteBaseSpecification(@Query("id") id: string) {
    return await this.baseSpecificationService.deleteBaseSpecification(id);
  }

  @Post("create-base-subspecification")
  async createBaseSubspecification(@Body() baseSubspecificationDto: BaseSubspecificationDto) {
    return await this.baseSpecificationService.createBaseSubspecification(baseSubspecificationDto);
  }

  @Put("update-base-subspecification")
  async updateBaseSubspecification(@Query("id") id: string, @Body() baseSubspecificationDto: BaseSubspecificationDto) {
    return await this.baseSpecificationService.updateBaseSubspecification(id, baseSubspecificationDto);
  }

  @Put("deactivate-base-subspecification")
  async deactivateBaseSubspecification(@Query("id") id: string, @Query("is_active") is_active: boolean) {
    return await this.baseSpecificationService.deactivateBaseSubspecification(id, is_active);
  }

  @Delete("delete-base-subspecification")
  async deleteBaseSubspecification(@Query("id") id: string) {
    return await this.baseSpecificationService.deleteBaseSubspecification(id);
  }

  /* subcategory specification */
  @Post("create-subcategory-specification")
  async createSubcategorySpecification(@Body() subcategorySpecificationDto: SubcategorySpecificationDto) {
    return await this.subcategorySpecificationService.createSubcategorySpecification(subcategorySpecificationDto);
  }

  @Get("find-subcategory-specification-by-id")
  async findSubcategorySpecificationById(@Query("id") id: string) {
    return await this.subcategorySpecificationService.findSubcategorySpecificationById(id);
  }

  @Put("update-subcategory-specification")
  async updateSubcategorySpecification(@Query("id") id: string, @Body() subcategorySpecificationDto: SubcategorySpecificationDto) {
    return await this.subcategorySpecificationService.updateSubcategorySpecification(id, subcategorySpecificationDto);
  }

  @Put("deactivate-subcategory-specification")
  async deactivateSubcategorySpecification(@Query("id") id: string, @Query("is_active") is_active: boolean) {
    return await this.subcategorySpecificationService.deactivateSubcategorySpecification(id, is_active);
  }

  @Delete("delete-subcategory-specification")
  async deleteSubcategorySpecification(@Query("id") id: string) {
    return await this.subcategorySpecificationService.deleteSubcategorySpecification(id);
  }

  @Post("create-subcategory-subspecification")
  async createSubcategorySubspecification(@Body() subcategorySubspecificationDto: SubcategorySubspecificationDto) {
    return await this.subcategorySpecificationService.createSubcategorySubspecification(subcategorySubspecificationDto);
  }

  @Put("update-subcategory-subspecification")
  async updateSubcategorySubspecification(@Query("id") id: string, @Body() subcategorySubspecificationDto: SubcategorySubspecificationDto) {
    return await this.subcategorySpecificationService.updateSubcategorySubspecification(id, subcategorySubspecificationDto);
  }

  @Put("deactivate-subcategory-subspecification")
  async deactivateSubcategorySubspecification(@Query("id") id: string, @Query("is_active") is_active: boolean) {
    return await this.subcategorySpecificationService.deactivateSubcategorySubspecification(id, is_active);
  }

  @Delete("delete-subcategory-subspecification")
  async deleteSubcategorySubspecification(@Query("id") id: string) {
    return await this.subcategorySpecificationService.deleteSubcategorySubspecification(id);
  }
}
