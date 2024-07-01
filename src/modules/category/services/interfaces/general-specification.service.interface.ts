import { GeneralSpecificationDto } from "../../dtos/general-specification.dto";
import { GeneralSubspecificationDto } from "../../dtos/general-subspecification.dto";

export interface IGeneralSpecificationService {
  createGeneralSpecification(generalSpecificationDto: GeneralSpecificationDto): Promise<GeneralSpecificationDto>;
  updateGeneralSpecification(id: string, generalSpecificationDto: GeneralSpecificationDto): Promise<GeneralSpecificationDto>;
  findAllGeneralSpecification(): Promise<GeneralSpecificationDto[]>;
  deactivateGeneralSpecification(id: string, is_active: boolean): Promise<GeneralSpecificationDto>;
  deleteGeneralSpecification(id: string): Promise<GeneralSpecificationDto>;

  createGeneralSubspecification(generalSubspecificationDto: GeneralSubspecificationDto): Promise<GeneralSubspecificationDto>;
  updateGeneralSubspecification(id: string, generalSubspecificationDto: GeneralSubspecificationDto): Promise<GeneralSubspecificationDto>;
  deleteGeneralSubspecification(id: string): Promise<GeneralSubspecificationDto>;
  deactivateGeneralSubspecification(id: string, is_active: boolean): Promise<GeneralSubspecificationDto>;
  findAllGeneralSubspecification(): Promise<GeneralSubspecificationDto[]>;
}