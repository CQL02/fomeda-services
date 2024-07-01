import { BaseSpecificationDto } from "../../dtos/base-specification.dto";
import { BaseSubspecificationDto } from "../../dtos/base-subspecification.dto";

export interface IBaseSpecificationService {
  createBaseSpecification(baseSpecificationDto: BaseSpecificationDto): Promise<BaseSpecificationDto>
  findBaseSpecificationByCatId(id: string): Promise<BaseSpecificationDto[]>
  updateBaseSpecification(id: string, baseSpecificationDto: BaseSpecificationDto): Promise<BaseSpecificationDto>
  deactivateBaseSpecification(id: string, is_active: boolean): Promise<BaseSpecificationDto>
  deleteBaseSpecification(id: string): Promise<BaseSpecificationDto>

  createBaseSubspecification(baseSubspecificationDto: BaseSubspecificationDto): Promise<BaseSubspecificationDto>
  updateBaseSubspecification(id: string, baseSubspecificationDto: BaseSubspecificationDto): Promise<BaseSubspecificationDto>
  deactivateBaseSubspecification(id: string, is_active: boolean): Promise<BaseSubspecificationDto>
  deleteBaseSubspecification(id: string): Promise<BaseSubspecificationDto>
}