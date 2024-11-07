import { CategoryDto } from '../../dtos/category.dto';
import { SubcategoryDto } from "../../dtos/subcategory.dto";
import { CategoryNameDto } from "../../dtos/category-name.dto";
import { Request } from "express";
export interface ICategoryService {
    createCategory(req: Request, categoryDto: CategoryDto): Promise<CategoryDto>;
    updateCategory(req: Request, id: string, categoryDto: CategoryDto): Promise<CategoryDto>;
    findAllCategories(): Promise<CategoryDto[]>;
    findAllCategories(): Promise<CategoryDto[]>;
    findCategoryById(id: string): Promise<CategoryDto>;
    findAllActiveCategories(): Promise<CategoryDto[]>;
    deactivateCategory(req: Request, id: string, is_active: boolean): Promise<CategoryDto>;
    deleteCategory(id: string): Promise<CategoryDto>;
    createSubcategory(req: Request, subcategoryDto: SubcategoryDto): Promise<SubcategoryDto>;
    updateSubcategory(req: Request, id: string, subcategoryDto: SubcategoryDto): Promise<SubcategoryDto>;
    deleteSubcategory(id: string): Promise<SubcategoryDto>;
    deactivateSubcategory(req: Request, id: string, is_active: boolean): Promise<SubcategoryDto>;
    findAllSubcategory(): Promise<SubcategoryDto[]>;
    findAllSubcategoryByCatId(cat_id: string): Promise<SubcategoryDto[]>;
    findOneSubcategoryById(id: string): Promise<SubcategoryDto>;
    findNameById(id: string): Promise<CategoryNameDto>;
    findAllSubcategoryNameByIds(ids: string[]): Promise<CategoryNameDto[]>;
}
