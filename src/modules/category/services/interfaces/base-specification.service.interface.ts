import { CategoryBaseSpecification } from "../../domain/schema/category-base-specification.schema";
import { BaseSpecificationDto } from "../../dtos/base-specification.dto";
import { BaseSubspecificationDto } from "../../dtos/base-subspecification.dto";
import { CategoryBaseSubspecification } from "../../domain/schema/category-base-subspecification.schema";

export interface IBaseSpecificationService {
  createBaseSpecification(baseSpecificationDto: BaseSpecificationDto): Promise<CategoryBaseSpecification>
  findBaseSpecificationByCatId(id: string): Promise<BaseSpecificationDto[]>
  updateBaseSpecification(id: string, baseSpecificationDto: BaseSpecificationDto): Promise<CategoryBaseSpecification>
  deactivateBaseSpecification(id: string, is_active: boolean): Promise<CategoryBaseSpecification>
  deleteBaseSpecification(id: string): Promise<CategoryBaseSpecification>

  createBaseSubspecification(baseSubspecificationDto: BaseSubspecificationDto): Promise<CategoryBaseSubspecification>
  updateBaseSubspecification(id: string, baseSubspecificationDto: BaseSubspecificationDto): Promise<CategoryBaseSubspecification>
  deactivateBaseSubspecification(id: string, is_active: boolean): Promise<CategoryBaseSubspecification>
  deleteBaseSubspecification(id: string): Promise<CategoryBaseSubspecification>
}