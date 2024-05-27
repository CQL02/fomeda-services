import { Body, Controller, Delete, Get, Post, Put, Query } from "@nestjs/common";
import { CategoryDto } from "../dtos/category.dto";
import { Category } from "../domain/schema/category.schema";
import { CategoryService } from "../services/implementations/category.service";
import { GeneralSpecificationDto } from "../dtos/general-specification.dto";
import { GeneralSpecificationService } from "../services/implementations/general-specification.service";
import { GeneralSubspecificationDto } from "../dtos/general-subspecification.dto";
import { SubcategoryDto } from "../dtos/subcategory.dto";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService,
              private readonly generalSpecificationService: GeneralSpecificationService) {
  }

  /* Category Service */
  @Post("create-category")
  async createCategory(@Body() categoryDto: CategoryDto) {
    return this.categoryService.createCategory(categoryDto);
  }

  @Put("update-category")
  async updateCategory(@Query("id") id: string, @Body() categoryDto: CategoryDto) {
    return this.categoryService.updateCategory(id, categoryDto);
  }

  @Get("find-all-category")
  async findAllCategories(): Promise<CategoryDto[]> {
    return this.categoryService.findAllCategories();
  }

  @Get("get-category")
  async findCategoryById(@Query("id") id: string): Promise<Category> {
    return this.categoryService.findCategoryById(id);
  }

  @Post("create-subcategory")
  async createSubcategory(@Body() subcategoryDto: SubcategoryDto) {
    return await this.categoryService.createSubcategory(subcategoryDto);
  }

  @Put("update-subcategory")
  async updateSubcategory(@Query("id") id: string, @Body() subcategoryDto: SubcategoryDto) {
    return this.categoryService.updateSubcategory(id, subcategoryDto);
  }

  @Put("deactivate-category")
  async deactivateCategory(@Query("id") id: string, @Query("is_active") is_active: boolean) {
    return await this.categoryService.deactivateCategory(id, is_active);
  }

  @Put("deactivate-subcategory")
  async deactivateSubcategory(@Query("id") id: string, @Query("is_active") is_active: boolean) {
    return await this.categoryService.deactivateSubcategory(id, is_active);
  }

  /* General Specification Service */
  @Post("create-general-specification")
  async createGeneralSpecification(@Body() generalSpecificationDto: GeneralSpecificationDto) {
    console.log(generalSpecificationDto);
    return this.generalSpecificationService.createGeneralSpecification(generalSpecificationDto);
  }

  @Get("find-all-general-specification")
  async findAllGeneralSpecification(): Promise<GeneralSpecificationDto[]> {
    return this.generalSpecificationService.findAllGeneralSpecification();
  }

  @Put("update-general-specification")
  async updateGeneralSpecification(@Query() id: string, @Body() generalSpecificationDto: GeneralSpecificationDto) {
    return this.generalSpecificationService.updateGeneralSpecification(id, generalSpecificationDto);
  }

  @Put("deactivate-general-specification")
  async deactivateGeneralSpecification(@Query("id") id: string, @Query("is_active") is_active: boolean) {
    return this.generalSpecificationService.deactivateGeneralSpecification(id, is_active);
  }

  @Delete("delete-general-specification")
  async deleteGeneralSpecification(@Query("id") id: string){
    return await this.generalSpecificationService.deleteGeneralSpecification(id);
  }

  @Post("create-general-subspecification")
  async createGeneralSubspecification(@Body() generalSubspecificationDto: GeneralSubspecificationDto) {
    return await this.generalSpecificationService.createGeneralSubspecification(generalSubspecificationDto);
  }

  @Get("find-all-general-subspecification")
  async findAllGeneralSubspecification(){
    return await this.generalSpecificationService.findAllGeneralSubspecification();
  }

  @Put("update-general-subspecification")
  async updateGeneralSubspecification(@Query("id") id: string, @Body() generalSubspecificationDto: GeneralSubspecificationDto) {
    return await this.generalSpecificationService.updateGeneralSubspecification(id, generalSubspecificationDto);
  }
}
