import { BaseSpecificationDto } from "../../dtos/base-specification.dto";
import { BaseSubspecificationDto } from "../../dtos/base-subspecification.dto";
import { Request } from "express";
export interface IBaseSpecificationService {
    createBaseSpecification(req: Request, baseSpecificationDto: BaseSpecificationDto): Promise<BaseSpecificationDto>;
    findBaseSpecificationById(id: string): Promise<BaseSpecificationDto>;
    findBaseSpecificationByCatId(id: string): Promise<BaseSpecificationDto[]>;
    findActiveBaseSpecificationByCatId(id: string): Promise<BaseSpecificationDto[]>;
    findActiveBaseSpecificationByCatIds(ids: string[]): Promise<BaseSpecificationDto[]>;
    updateBaseSpecification(req: Request, id: string, baseSpecificationDto: BaseSpecificationDto): Promise<BaseSpecificationDto>;
    deactivateBaseSpecification(req: Request, id: string, is_active: boolean): Promise<BaseSpecificationDto>;
    deleteBaseSpecification(id: string): Promise<BaseSpecificationDto>;
    createBaseSubspecification(req: Request, baseSubspecificationDto: BaseSubspecificationDto): Promise<BaseSubspecificationDto>;
    findBaseSubspecificationById(id: string): Promise<BaseSubspecificationDto>;
    updateBaseSubspecification(req: Request, id: string, baseSubspecificationDto: BaseSubspecificationDto): Promise<BaseSubspecificationDto>;
    deactivateBaseSubspecification(req: Request, id: string, is_active: boolean): Promise<BaseSubspecificationDto>;
    deleteBaseSubspecification(id: string): Promise<BaseSubspecificationDto>;
}
