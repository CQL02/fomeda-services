import { SubcategorySpecificationDto } from "../../dtos/subcategory-specification.dto";
import { SubcategorySubspecificationDto } from "../../dtos/subcategory-subspecification.dto";
import { ProductFormSpecificationDto } from "../../dtos/product-form-specification.dto";
import { Request } from "express";
export interface ISubcategorySpecificationService {
    createSubcategorySpecification(req: Request, subcategorySpecificationDto: SubcategorySpecificationDto): Promise<SubcategorySpecificationDto>;
    findSubcategorySpecificationByCatId(id: string): Promise<SubcategorySpecificationDto[]>;
    findActiveSubcategorySpecificationByCatId(id: string): Promise<SubcategorySpecificationDto[]>;
    findActiveSubcategorySpecificationByCatIdsAndSubcatIds(cat_ids: string[], subcat_ids: string[]): Promise<SubcategorySpecificationDto[]>;
    findSubcategorySpecificationById(id: string): Promise<SubcategorySpecificationDto>;
    getProductSpecificationBySubcatId(id: string): Promise<ProductFormSpecificationDto[]>;
    updateSubcategorySpecification(req: Request, id: string, subcategorySpecificationDto: SubcategorySpecificationDto): Promise<SubcategorySpecificationDto>;
    deactivateSubcategorySpecification(req: Request, id: string, is_active: boolean): Promise<SubcategorySpecificationDto>;
    deleteSubcategorySpecification(id: string): Promise<SubcategorySpecificationDto>;
    createSubcategorySubspecification(req: Request, subcategorySubspecificationDto: SubcategorySubspecificationDto): Promise<SubcategorySubspecificationDto>;
    findSubcategorySubspecificationById(id: string): Promise<SubcategorySubspecificationDto>;
    updateSubcategorySubspecification(req: Request, id: string, subcategorySubspecificationDto: SubcategorySubspecificationDto): Promise<SubcategorySubspecificationDto>;
    deactivateSubcategorySubspecification(req: Request, id: string, is_active: boolean): Promise<SubcategorySubspecificationDto>;
    deleteSubcategorySubspecification(id: string): Promise<SubcategorySubspecificationDto>;
}
