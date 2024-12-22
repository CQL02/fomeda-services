import { GeneralSpecificationDto } from "../../dtos/general-specification.dto";
import { BaseSpecificationDto } from "../../dtos/base-specification.dto";
import { SubcategorySpecificationDto } from "../../dtos/subcategory-specification.dto";
import { MapperUtils } from "../../../../common/utils/mapper.utils";
import { Injectable } from "@nestjs/common";
import { BaseSubspecificationDto } from "../../dtos/base-subspecification.dto";
import { SubcategorySubspecificationDto } from "../../dtos/subcategory-subspecification.dto";
import { ProductFormSpecificationDto } from "../../dtos/product-form-specification.dto";
import { ProductFormSubspecificationDto } from "../../dtos/product-form-subspecification.dto";

@Injectable()
export class CategoryMapper {

  mapGeneralSpecificationDtoToBaseSpecificationDto(generalSpecificationDto: GeneralSpecificationDto): BaseSpecificationDto {
    const mapperResult = MapperUtils.mapToDto(generalSpecificationDto, BaseSpecificationDto);
    if(mapperResult.children){
      mapperResult.children.map(child => MapperUtils.mapToDto(child, BaseSubspecificationDto))
    }
    return {...mapperResult, is_origin: false};
  }

  mapGeneralSpecificationDtoListToBaseSpecificationDtoList(generalSpecificationDtoList: GeneralSpecificationDto[]): BaseSpecificationDto[] {
    return generalSpecificationDtoList.map(spec => this.mapGeneralSpecificationDtoToBaseSpecificationDto(spec));
  }

  mapBaseSpecificationDtoToSubcategorySpecificationDto(baseSpecificationDto: BaseSpecificationDto): SubcategorySpecificationDto {
    const mapperResult =MapperUtils.mapToDto(baseSpecificationDto, SubcategorySpecificationDto);
    if(mapperResult.children){
      mapperResult.children.map(child => MapperUtils.mapToDto(child, SubcategorySubspecificationDto))
    }
    return {...mapperResult, is_origin: false};
  }

  mapBaseSpecificationDtoListToSubcategorySpecificationDtoList(baseSpecificationDtoList: BaseSpecificationDto[]): SubcategorySpecificationDto[] {
    return baseSpecificationDtoList.map(spec => this.mapBaseSpecificationDtoToSubcategorySpecificationDto(spec));
  }

  mapSubcategorySpecificationToProducSpecificationtFormDto(source: any): any {
    const mapperResult = MapperUtils.mapToDto(source, ProductFormSpecificationDto);
    if(source.children){
      mapperResult.subspecification = source.children.map(child => MapperUtils.mapToDto(child.toObject(), ProductFormSubspecificationDto))
    }
    return mapperResult;
  }

  mapSubcategorySpecificationListToProductSpecificationFormDtoList(source: any[]): any {
    return source.map(spec => this.mapSubcategorySpecificationToProducSpecificationtFormDto(spec));
  }

  mapSchemaToModel(source: any, target: any): any {
    return MapperUtils.mapToDto(source, target);
  }

  mapSchemaListToDtoList(source: any[], target: any): any {
    return source.map(item => this.mapSchemaToModel(item, target));
  }
}