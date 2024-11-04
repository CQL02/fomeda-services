import { GeneralSpecificationDto } from "../../dtos/general-specification.dto";
import { GeneralSubspecificationDto } from "../../dtos/general-subspecification.dto";
import { Request } from "express";

export interface IGeneralSpecificationService {
  createGeneralSpecification(req: Request, generalSpecificationDto: GeneralSpecificationDto): Promise<GeneralSpecificationDto>;
  updateGeneralSpecification(req: Request, id: string, generalSpecificationDto: GeneralSpecificationDto): Promise<GeneralSpecificationDto>;
  findAllGeneralSpecification(): Promise<GeneralSpecificationDto[]>;
  findAllActiveGeneralSpecification(): Promise<GeneralSpecificationDto[]>;
  findGeneralSpecificationById(id: string): Promise<GeneralSpecificationDto>;
  deactivateGeneralSpecification(req: Request, id: string, is_active: boolean): Promise<GeneralSpecificationDto>;
  deleteGeneralSpecification(id: string): Promise<GeneralSpecificationDto>;

  createGeneralSubspecification(req: Request, generalSubspecificationDto: GeneralSubspecificationDto): Promise<GeneralSubspecificationDto>;
  findGeneralSubspecificationById(id: string): Promise<GeneralSubspecificationDto>;
  updateGeneralSubspecification(req: Request, id: string, generalSubspecificationDto: GeneralSubspecificationDto): Promise<GeneralSubspecificationDto>;
  deleteGeneralSubspecification(id: string): Promise<GeneralSubspecificationDto>;
  deactivateGeneralSubspecification(req: Request, id: string, is_active: boolean): Promise<GeneralSubspecificationDto>;
  findAllGeneralSubspecification(): Promise<GeneralSubspecificationDto[]>;
}