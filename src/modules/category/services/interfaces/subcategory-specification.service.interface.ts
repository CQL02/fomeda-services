import { SubcategorySpecificationDto } from "../../dtos/subcategory-specification.dto";
import { SubcategorySubspecificationDto } from "../../dtos/subcategory-subspecification.dto";
import { ProductFormSpecificationDto } from "../../dtos/product-form-specification.dto";

export interface ISubcategorySpecificationService {
  createSubcategorySpecification(subcategorySpecificationDto: SubcategorySpecificationDto): Promise<SubcategorySpecificationDto>
  findSubcategorySpecificationByCatId(id: string): Promise<SubcategorySpecificationDto[]>
  findActiveSubcategorySpecificationByCatId(id: string): Promise<SubcategorySpecificationDto[]>
  findSubcategorySpecificationById(id: string): Promise<SubcategorySpecificationDto>
  getProductSpecificationBySubcatId(id: string): Promise<ProductFormSpecificationDto[]>;
  updateSubcategorySpecification(id: string, subcategorySpecificationDto: SubcategorySpecificationDto): Promise<SubcategorySpecificationDto>
  deactivateSubcategorySpecification(id: string, is_active: boolean): Promise<SubcategorySpecificationDto>
  deleteSubcategorySpecification(id: string): Promise<SubcategorySpecificationDto>

  createSubcategorySubspecification(subcategorySubspecificationDto: SubcategorySubspecificationDto): Promise<SubcategorySubspecificationDto>
  findSubcategorySubspecificationById(id: string): Promise<SubcategorySubspecificationDto>
  updateSubcategorySubspecification(id: string, subcategorySubspecificationDto: SubcategorySubspecificationDto): Promise<SubcategorySubspecificationDto>
  deactivateSubcategorySubspecification(id: string, is_active: boolean): Promise<SubcategorySubspecificationDto>
  deleteSubcategorySubspecification(id: string): Promise<SubcategorySubspecificationDto>
}