import { SubcategorySpecificationDto } from "../../dtos/subcategory-specification.dto";
import { SubcategorySpecification } from "../../domain/schema/subcategory-specification.schema";
import { SubcategorySubspecification } from "../../domain/schema/subcategory-subspecification.schema";
import { SubcategorySubspecificationDto } from "../../dtos/subcategory-subspecification.dto";

export interface ISubcategorySpecificationService {
  createSubcategorySpecification(subcategorySpecificationDto: SubcategorySpecificationDto): Promise<SubcategorySpecification>
  findSubcategorySpecificationById(id: string): Promise<SubcategorySpecification[]>
  updateSubcategorySpecification(id: string, subcategorySpecificationDto: SubcategorySpecificationDto): Promise<SubcategorySpecification>
  deactivateSubcategorySpecification(id: string, is_active: boolean): Promise<SubcategorySpecification>
  deleteSubcategorySpecification(id: string): Promise<SubcategorySpecification>

  createSubcategorySubspecification(subcategorySubspecificationDto: SubcategorySubspecificationDto): Promise<SubcategorySubspecification>
  updateSubcategorySubspecification(id: string, subcategorySubspecificationDto: SubcategorySubspecificationDto): Promise<SubcategorySubspecification>
  deactivateSubcategorySubspecification(id: string, is_active: boolean): Promise<SubcategorySubspecification>
  deleteSubcategorySubspecification(id: string): Promise<SubcategorySubspecification>
}