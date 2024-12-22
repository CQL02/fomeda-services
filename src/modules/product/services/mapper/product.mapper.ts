import { Injectable } from "@nestjs/common";
import { MapperUtils } from "../../../../common/utils/mapper.utils";

@Injectable()
export class ProductMapper {

  mapSchemaToModel(source: any, target: any): any {
    return MapperUtils.mapToDto(source, target);
  }

  mapSchemaListToDtoList(source: any[], target: any): any {
    return source.map(item => this.mapSchemaToModel(item, target));
  }

  mapDtoToSchema(source: any, target: any): any {
    return MapperUtils.mapToSchema(source, target);
  }

}