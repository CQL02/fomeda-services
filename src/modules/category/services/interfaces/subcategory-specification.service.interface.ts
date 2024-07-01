import { SubcategorySpecificationDto } from "../../dtos/subcategory-specification.dto";
import { SubcategorySubspecificationDto } from "../../dtos/subcategory-subspecification.dto";

export interface ISubcategorySpecificationService {
  createSubcategorySpecification(subcategorySpecificationDto: SubcategorySpecificationDto): Promise<SubcategorySpecificationDto>
  findSubcategorySpecificationById(id: string): Promise<SubcategorySpecificationDto[]>
  updateSubcategorySpecification(id: string, subcategorySpecificationDto: SubcategorySpecificationDto): Promise<SubcategorySpecificationDto>
  deactivateSubcategorySpecification(id: string, is_active: boolean): Promise<SubcategorySpecificationDto>
  deleteSubcategorySpecification(id: string): Promise<SubcategorySpecificationDto>

  createSubcategorySubspecification(subcategorySubspecificationDto: SubcategorySubspecificationDto): Promise<SubcategorySubspecificationDto>
  updateSubcategorySubspecification(id: string, subcategorySubspecificationDto: SubcategorySubspecificationDto): Promise<SubcategorySubspecificationDto>
  deactivateSubcategorySubspecification(id: string, is_active: boolean): Promise<SubcategorySubspecificationDto>
  deleteSubcategorySubspecification(id: string): Promise<SubcategorySubspecificationDto>
}