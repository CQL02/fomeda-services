import { GeneralSpecificationDto } from "../../dtos/general-specification.dto";
import { GeneralSubspecificationDto } from "../../dtos/general-subspecification.dto";
import { CategoryGeneralSpecification } from "../../domain/schema/category-general-specification.schema";
import { CategoryGeneralSubspecification } from "../../domain/schema/category-general-subspecification.schema";

export interface IGeneralSpecificationService {
  createGeneralSpecification(generalSpecificationDto: GeneralSpecificationDto): Promise<CategoryGeneralSpecification>;
  updateGeneralSpecification(id: string, generalSpecificationDto: GeneralSpecificationDto): Promise<CategoryGeneralSpecification>;
  findAllGeneralSpecification(): Promise<CategoryGeneralSpecification[]>;
  deactivateGeneralSpecification(id: string, is_active: boolean): Promise<CategoryGeneralSpecification>;
  deleteGeneralSpecification(id: string): Promise<CategoryGeneralSpecification>;

  createGeneralSubspecification(generalSubspecificationDto: GeneralSubspecificationDto): Promise<CategoryGeneralSubspecification>;
  updateGeneralSubspecification(id: string, generalSubspecificationDto: GeneralSubspecificationDto): Promise<CategoryGeneralSubspecification>;
  deleteGeneralSubspecification(id: string): Promise<CategoryGeneralSubspecification>;
  deactivateGeneralSubspecification(id: string, is_active: boolean): Promise<CategoryGeneralSubspecification>;
  findAllGeneralSubspecification(): Promise<CategoryGeneralSubspecification[]>;
}