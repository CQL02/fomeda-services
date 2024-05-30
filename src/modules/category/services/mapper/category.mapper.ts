import { GeneralSpecificationDto } from "../../dtos/general-specification.dto";
import { BaseSpecificationDto } from "../../dtos/base-specification.dto";
import { SubcategorySpecificationDto } from "../../dtos/subcategory-specification.dto";

export class CategoryMapper {

  mapGeneralSpecificationDtoToBaseSpecificationDto(generalSpecificationDto: GeneralSpecificationDto): BaseSpecificationDto {
    return {
      cat_id: "",
      cat_type: generalSpecificationDto.cat_type,
      subcat_spec_name: generalSpecificationDto.subcat_spec_name,
      created_by: generalSpecificationDto.created_by,
      created_on: generalSpecificationDto.created_on,
      last_updated_by: generalSpecificationDto.last_updated_by,
      last_updated_on: generalSpecificationDto.last_updated_on,
      is_active: generalSpecificationDto.is_active,
      allow_input: generalSpecificationDto.allow_input,
      is_origin: false,
      children: generalSpecificationDto.children?.map(subspecificationDto => ({
        subcat_spec_id: subspecificationDto.subcat_spec_id,
        subcat_subspec_name: subspecificationDto.subcat_subspec_name,
        created_by: subspecificationDto.created_by,
        created_on: subspecificationDto.created_on,
        last_updated_by: subspecificationDto.last_updated_by,
        last_updated_on: subspecificationDto.last_updated_on,
        is_active: subspecificationDto.is_active,
      })),
    }
  }

  mapGeneralSpecificationDtoListToBaseSpecificationDtoList(generalSpecificationDtoList: GeneralSpecificationDto[]): BaseSpecificationDto[] {
    return generalSpecificationDtoList.map(spec => this.mapGeneralSpecificationDtoToBaseSpecificationDto(spec));
  }

  mapBaseSpecificationDtoToSubcategorySpecificationDto(baseSpecificationDto: BaseSpecificationDto): SubcategorySpecificationDto {
    return {
      subcat_id: "",
      cat_type: baseSpecificationDto.cat_type,
      subcat_spec_name: baseSpecificationDto.subcat_spec_name,
      created_by: baseSpecificationDto.created_by,
      created_on: baseSpecificationDto.created_on,
      last_updated_by: baseSpecificationDto.last_updated_by,
      last_updated_on: baseSpecificationDto.last_updated_on,
      is_active: baseSpecificationDto.is_active,
      allow_input: baseSpecificationDto.allow_input,
      is_origin: false,
      children: baseSpecificationDto.children?.map(subspecificationDto => ({
        subcat_id: "",
        subcat_spec_id: subspecificationDto.subcat_spec_id,
        subcat_subspec_name: subspecificationDto.subcat_subspec_name,
        created_by: subspecificationDto.created_by,
        created_on: subspecificationDto.created_on,
        last_updated_by: subspecificationDto.last_updated_by,
        last_updated_on: subspecificationDto.last_updated_on,
        is_active: subspecificationDto.is_active,
      })),
    }
  }

  mapBaseSpecificationDtoListToSubcategorySpecificationDtoList(baseSpecificationDtoList: BaseSpecificationDto[]): SubcategorySpecificationDto[] {
    return baseSpecificationDtoList.map(spec => this.mapBaseSpecificationDtoToSubcategorySpecificationDto(spec));
  }

}