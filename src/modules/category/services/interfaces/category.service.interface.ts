import { CategoryDto } from '../../dtos/category.dto';
import { SubcategoryDto } from "../../dtos/subcategory.dto";
import { CategoryNameDto } from "../../dtos/category-name.dto";

export interface ICategoryService {
  createCategory(categoryDto: CategoryDto): Promise<CategoryDto>;
  updateCategory(id: string, categoryDto: CategoryDto): Promise<CategoryDto>;
  findAllCategories(): Promise<CategoryDto[]>;
  findCategoryById(id: string): Promise<CategoryDto>;
  deactivateCategory(id: string, is_active: boolean): Promise<CategoryDto>;
  deleteCategory(id: string): Promise<CategoryDto>;

  createSubcategory(subcategoryDto: SubcategoryDto): Promise<SubcategoryDto>;
  updateSubcategory(id: string, subcategoryDto: SubcategoryDto): Promise<SubcategoryDto>;
  deleteSubcategory(id: string): Promise<SubcategoryDto>;
  deactivateSubcategory(id: string, is_active: boolean): Promise<SubcategoryDto>;
  findAllSubcategory(): Promise<SubcategoryDto[]>;
  findAllSubcategoryByCatId(cat_id: string): Promise<SubcategoryDto[]>;
  findOneSubcategoryById(id: string): Promise<SubcategoryDto>;
  findNameById(id: string): Promise<CategoryNameDto>;
  findAllSubcategoryNameByIds(ids: string[]): Promise<CategoryNameDto[]>;
}
