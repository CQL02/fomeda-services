import { GeneralSpecificationDto } from "../../dtos/general-specification.dto";
import { BaseSpecificationDto } from "../../dtos/base-specification.dto";
import { SubcategorySpecificationDto } from "../../dtos/subcategory-specification.dto";
export declare class CategoryMapper {
    mapGeneralSpecificationDtoToBaseSpecificationDto(generalSpecificationDto: GeneralSpecificationDto): BaseSpecificationDto;
    mapGeneralSpecificationDtoListToBaseSpecificationDtoList(generalSpecificationDtoList: GeneralSpecificationDto[]): BaseSpecificationDto[];
    mapBaseSpecificationDtoToSubcategorySpecificationDto(baseSpecificationDto: BaseSpecificationDto): SubcategorySpecificationDto;
    mapBaseSpecificationDtoListToSubcategorySpecificationDtoList(baseSpecificationDtoList: BaseSpecificationDto[]): SubcategorySpecificationDto[];
    mapSubcategorySpecificationToProducSpecificationtFormDto(source: any): any;
    mapSubcategorySpecificationListToProductSpecificationFormDtoList(source: any[]): any;
    mapSchemaToModel(source: any, target: any): any;
    mapSchemaListToDtoList(source: any[], target: any): any;
}
