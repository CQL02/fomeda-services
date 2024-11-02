import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Put,
  Query,
  Req, UseGuards
} from "@nestjs/common";
import { CategoryDto } from "../dtos/category.dto";
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
import { IGeneralSpecificationService } from "../services/interfaces/general-specification.service.interface";
import { IBaseSpecificationService } from "../services/interfaces/base-specification.service.interface";
import { ISubcategorySpecificationService } from "../services/interfaces/subcategory-specification.service.interface";
import { ICategoryService } from "../services/interfaces/category.service.interface";
import { ProductFormSpecificationDto } from "../dtos/product-form-specification.dto";
import { Request } from "express";
import { AuthenticationGuard } from "../../authentication/passport/authentication.guard";

@Controller("category")
export class CategoryController {
  constructor(@Inject(CategoryService.name) private readonly categoryService: ICategoryService,
              @Inject(GeneralSpecificationService.name) private readonly generalSpecificationService: IGeneralSpecificationService,
              @Inject(BaseSpecificationService.name) private readonly baseSpecificationService: IBaseSpecificationService,
              @Inject(SubcategorySpecificationService.name) private readonly subcategorySpecificationService: ISubcategorySpecificationService,
  ) {
  }

  /* Category Service */
  @UseGuards(AuthenticationGuard)
  @Post("create-category")
  async createCategory(@Req() req: Request, @Body() categoryDto: CategoryDto) {
    return await this.categoryService.createCategory(req, categoryDto);
  }

  @UseGuards(AuthenticationGuard)
  @Put("update-category")
  async updateCategory(@Req() req: Request, @Query("id") id: string, @Body() categoryDto: CategoryDto) {
    return await this.categoryService.updateCategory(req, id, categoryDto);
  }

  @Get("find-all-category")
  async findAllCategories(): Promise<CategoryDto[]> {
    return await this.categoryService.findAllCategories();
  }

  @Get("find-all-active-categories")
  async findAllActiveCategories(): Promise<CategoryDto[]> {
    return await this.categoryService.findAllActiveCategories();
  }

  @Get("get-category")
  async findCategoryById(@Query("id") id: string): Promise<CategoryDto> {
    return await this.categoryService.findCategoryById(id);
  }

  @UseGuards(AuthenticationGuard)
  @Post("create-subcategory")
  async createSubcategory(@Req() req: Request, @Body() subcategoryDto: SubcategoryDto) {
    return await this.categoryService.createSubcategory(req, subcategoryDto);
  }

  @Get("find-one-subcategory-by-id")
  async findOneSubcategoryById(@Query("id") id: string) {
    return await this.categoryService.findOneSubcategoryById(id);
  }

  @UseGuards(AuthenticationGuard)
  @Put("update-subcategory")
  async updateSubcategory(@Req() req: Request, @Query("id") id: string, @Body() subcategoryDto: SubcategoryDto) {
    return await this.categoryService.updateSubcategory(req, id, subcategoryDto);
  }

  @UseGuards(AuthenticationGuard)
  @Put("deactivate-category")
  async deactivateCategory(@Req() req: Request, @Query("id") id: string, @Query("is_active") is_active: boolean) {
    return await this.categoryService.deactivateCategory(req, id, is_active);
  }

  @UseGuards(AuthenticationGuard)
  @Put("deactivate-subcategory")
  async deactivateSubcategory(@Req() req: Request, @Query("id") id: string, @Query("is_active") is_active: boolean) {
    return await this.categoryService.deactivateSubcategory(req, id, is_active);
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
  @UseGuards(AuthenticationGuard)
  @Post("create-general-specification")
  async createGeneralSpecification(@Req() req: Request, @Body() generalSpecificationDto: GeneralSpecificationDto) {
    return await this.generalSpecificationService.createGeneralSpecification(req, generalSpecificationDto);
  }

  @Get("find-all-general-specification")
  async findAllGeneralSpecification(): Promise<GeneralSpecificationDto[]> {
    return await this.generalSpecificationService.findAllGeneralSpecification();
  }

  @Get("find-general-specification-by-id")
  async findGeneralSpecificationById(@Query("id") id: string) {
    return await this.generalSpecificationService.findGeneralSpecificationById(id);
  }

  @UseGuards(AuthenticationGuard)
  @Put("update-general-specification")
  async updateGeneralSpecification(@Req() req: Request, @Query("id") id: string, @Body() generalSpecificationDto: GeneralSpecificationDto) {
    return await this.generalSpecificationService.updateGeneralSpecification(req, id, generalSpecificationDto);
  }

  @UseGuards(AuthenticationGuard)
  @Put("deactivate-general-specification")
  async deactivateGeneralSpecification(@Req() req: Request, @Query("id") id: string, @Query("is_active") is_active: boolean) {
    return await this.generalSpecificationService.deactivateGeneralSpecification(req, id, is_active);
  }

  @Delete("delete-general-specification")
  async deleteGeneralSpecification(@Query("id") id: string) {
    return await this.generalSpecificationService.deleteGeneralSpecification(id);
  }

  @UseGuards(AuthenticationGuard)
  @Post("create-general-subspecification")
  async createGeneralSubspecification(@Req() req: Request, @Body() generalSubspecificationDto: GeneralSubspecificationDto) {
    return await this.generalSpecificationService.createGeneralSubspecification(req, generalSubspecificationDto);
  }

  @Get("find-general-subspecification-by-id")
  async findGeneralSubspecificationById(@Query("id") id: string) {
    return await this.generalSpecificationService.findGeneralSubspecificationById(id);
  }

  @Get("find-all-general-subspecification")
  async findAllGeneralSubspecification() {
    return await this.generalSpecificationService.findAllGeneralSubspecification();
  }

  @UseGuards(AuthenticationGuard)
  @Put("update-general-subspecification")
  async updateGeneralSubspecification(@Req() req: Request, @Query("id") id: string, @Body() generalSubspecificationDto: GeneralSubspecificationDto) {
    return await this.generalSpecificationService.updateGeneralSubspecification(req, id, generalSubspecificationDto);
  }

  @UseGuards(AuthenticationGuard)
  @Put("deactivate-general-subspecification")
  async deactivateGeneralSubspecification(@Req() req: Request, @Query("id") id: string, @Query("is_active") is_active: boolean) {
    return await this.generalSpecificationService.deactivateGeneralSubspecification(req, id, is_active);
  }

  @Delete("delete-general-subspecification")
  async deleteGeneralSubspecification(@Query("id") id: string) {
    return await this.generalSpecificationService.deleteGeneralSubspecification(id);
  }

  /* base specification */
  @UseGuards(AuthenticationGuard)
  @Post("create-base-specification")
  async createBaseSpecification(@Req() req: Request, @Body() baseSpecificationDto: BaseSpecificationDto) {
    return await this.baseSpecificationService.createBaseSpecification(req, baseSpecificationDto);
  }

  @Get("find-base-specification-by-cat-id")
  async findBaseSpecificationByCatId(@Query("id") id: string) {
    return await this.baseSpecificationService.findBaseSpecificationByCatId(id);
  }

  @Get("find-base-specification-by-id")
  async findBaseSpecificationById(@Query("id") id: string) {
    return await this.baseSpecificationService.findBaseSpecificationById(id);
  }

  @UseGuards(AuthenticationGuard)
  @Put("update-base-specification")
  async updateBaseSpecification(@Req() req: Request, @Query("id") id: string, @Body() baseSpecificationDto: BaseSpecificationDto) {
    return await this.baseSpecificationService.updateBaseSpecification(req, id, baseSpecificationDto);
  }

  @UseGuards(AuthenticationGuard)
  @Put("deactivate-base-specification")
  async deactivateBaseSpecification(@Req() req: Request, @Query("id") id: string, @Query("is_active") is_active: boolean) {
    return await this.baseSpecificationService.deactivateBaseSpecification(req, id, is_active);
  }

  @Delete("delete-base-specification")
  async deleteBaseSpecification(@Query("id") id: string) {
    return await this.baseSpecificationService.deleteBaseSpecification(id);
  }

  @UseGuards(AuthenticationGuard)
  @Post("create-base-subspecification")
  async createBaseSubspecification(@Req() req: Request, @Body() baseSubspecificationDto: BaseSubspecificationDto) {
    return await this.baseSpecificationService.createBaseSubspecification(req, baseSubspecificationDto);
  }

  @Get("find-base-subspecification-by-id")
  async findBaseSubspecificationById(@Query("id") id: string) {
    return await this.baseSpecificationService.findBaseSubspecificationById(id);
  }

  @UseGuards(AuthenticationGuard)
  @Put("update-base-subspecification")
  async updateBaseSubspecification(@Req() req: Request, @Query("id") id: string, @Body() baseSubspecificationDto: BaseSubspecificationDto) {
    return await this.baseSpecificationService.updateBaseSubspecification(req, id, baseSubspecificationDto);
  }

  @UseGuards(AuthenticationGuard)
  @Put("deactivate-base-subspecification")
  async deactivateBaseSubspecification(@Req() req: Request, @Query("id") id: string, @Query("is_active") is_active: boolean) {
    return await this.baseSpecificationService.deactivateBaseSubspecification(req, id, is_active);
  }

  @Delete("delete-base-subspecification")
  async deleteBaseSubspecification(@Query("id") id: string) {
    return await this.baseSpecificationService.deleteBaseSubspecification(id);
  }

  /* subcategory specification */
  @UseGuards(AuthenticationGuard)
  @Post("create-subcategory-specification")
  async createSubcategorySpecification(@Req() req: Request, @Body() subcategorySpecificationDto: SubcategorySpecificationDto) {
    return await this.subcategorySpecificationService.createSubcategorySpecification(req, subcategorySpecificationDto);
  }

  @Get("find-subcategory-specification-by-cat-id")
  async findSubcategorySpecificationByCatId(@Query("id") id: string) {
    return await this.subcategorySpecificationService.findSubcategorySpecificationByCatId(id);
  }

  @Get("find-active-subcategory-specification-by-cat-id")
  async findActiveSubcategorySpecificationByCatId(@Query("id") id: string) {
    return await this.subcategorySpecificationService.findActiveSubcategorySpecificationByCatId(id);
  }

  @Get("find-subcategory-specification-by-id")
  async findSubcategorySpecificationById(@Query("id") id: string) {
    return await this.subcategorySpecificationService.findSubcategorySpecificationById(id);
  }

  @UseGuards(AuthenticationGuard)
  @Put("update-subcategory-specification")
  async updateSubcategorySpecification(@Req() req: Request, @Query("id") id: string, @Body() subcategorySpecificationDto: SubcategorySpecificationDto) {
    return await this.subcategorySpecificationService.updateSubcategorySpecification(req, id, subcategorySpecificationDto);
  }

  @UseGuards(AuthenticationGuard)
  @Put("deactivate-subcategory-specification")
  async deactivateSubcategorySpecification(@Req() req: Request, @Query("id") id: string, @Query("is_active") is_active: boolean) {
    return await this.subcategorySpecificationService.deactivateSubcategorySpecification(req, id, is_active);
  }

  @Delete("delete-subcategory-specification")
  async deleteSubcategorySpecification(@Query("id") id: string) {
    return await this.subcategorySpecificationService.deleteSubcategorySpecification(id);
  }

  @UseGuards(AuthenticationGuard)
  @Post("create-subcategory-subspecification")
  async createSubcategorySubspecification(@Req() req: Request, @Body() subcategorySubspecificationDto: SubcategorySubspecificationDto) {
    return await this.subcategorySpecificationService.createSubcategorySubspecification(req, subcategorySubspecificationDto);
  }

  @Get("find-subcategory-subspecification-by-id")
  async findSubcategorySubspecificationById(@Query("id") id: string) {
    return await this.subcategorySpecificationService.findSubcategorySubspecificationById(id);
  }

  @Get("get-product-specification-by-subcat-id")
  async getProductSpecificationBySubcatId(@Query("id") id: string): Promise<ProductFormSpecificationDto[]> {
    return await this.subcategorySpecificationService.getProductSpecificationBySubcatId(id);
  }

  @UseGuards(AuthenticationGuard)
  @Put("update-subcategory-subspecification")
  async updateSubcategorySubspecification(@Req() req: Request, @Query("id") id: string, @Body() subcategorySubspecificationDto: SubcategorySubspecificationDto) {
    return await this.subcategorySpecificationService.updateSubcategorySubspecification(req, id, subcategorySubspecificationDto);
  }

  @UseGuards(AuthenticationGuard)
  @Put("deactivate-subcategory-subspecification")
  async deactivateSubcategorySubspecification(@Req() req: Request, @Query("id") id: string, @Query("is_active") is_active: boolean) {
    return await this.subcategorySpecificationService.deactivateSubcategorySubspecification(req, id, is_active);
  }

  @Delete("delete-subcategory-subspecification")
  async deleteSubcategorySubspecification(@Query("id") id: string) {
    return await this.subcategorySpecificationService.deleteSubcategorySubspecification(id);
  }
}
