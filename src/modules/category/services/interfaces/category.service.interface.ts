import { Category } from '../../domain/schema/category.schema';
import { CategoryDto } from '../../dtos/category.dto';
import { SubcategoryDto } from "../../dtos/subcategory.dto";
import { Subcategory } from "../../domain/schema/subcategory.schema";

export interface ICategoryService {
  createCategory(categoryDto: CategoryDto): Promise<Category>;
  updateCategory(id: string, categoryDto: CategoryDto): Promise<Category>;
  findAllCategories(): Promise<CategoryDto[]>;
  findCategoryById(id: string): Promise<Category>;
  deactivateCategory(id: string, is_active: boolean): Promise<Category>;
  deleteCategory(id: string): Promise<Category>;

  createSubcategory(subcategoryDto: SubcategoryDto): Promise<SubcategoryDto>;
  updateSubcategory(id: string, subcategoryDto: SubcategoryDto): Promise<SubcategoryDto>;
  deleteSubcategory(id: string): Promise<SubcategoryDto>;
  deactivateSubcategory(id: string, is_active: boolean): Promise<SubcategoryDto>;
  findAllSubcategory(): Promise<Subcategory[]>;
  findAllSubcategoryByCatId(cat_id: string): Promise<Subcategory[]>;
}
