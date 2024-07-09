import { IGeneralSpecificationService } from "../interfaces/general-specification.service.interface";
import { GeneralSpecificationDto } from "../../dtos/general-specification.dto";
import { GeneralSubspecificationDto } from "../../dtos/general-subspecification.dto";
import {
  CategoryGeneralSpecificationRepository
} from "../../domain/repositories/category-general-specification.repository";
import {
  CategoryGeneralSubspecificationRepository
} from "../../domain/repositories/category-general-subspecification.repository";
import { SequenceConstant } from "../../../../common/constant/sequence.constant";
import { SequenceService } from "../../../sequence/services/implementations/sequence.services";
import { Inject, Injectable } from "@nestjs/common";
import { ISequenceService } from "../../../sequence/services/interfaces/sequence.service.interface";
import { CategoryMapper } from "../mapper/category.mapper";
import { ObjectUtils } from "../../../../common/utils/object.utils";
import { CategoryErrorConstant, CategoryException } from "../../../../common/exception/category.exception";
import { StringUtils } from "../../../../common/utils/string.utils";

@Injectable()
export class GeneralSpecificationService implements IGeneralSpecificationService {
  constructor(
    private readonly generalSubspecificationRepository: CategoryGeneralSubspecificationRepository,
    private readonly generalSpecificationRepository: CategoryGeneralSpecificationRepository,
    private readonly categoryMapper: CategoryMapper,
    @Inject(SequenceService.name) private readonly sequenceService: ISequenceService
  ) {
  }

  async createGeneralSpecification(generalSpecificationDto: GeneralSpecificationDto): Promise<GeneralSpecificationDto> {
    if(ObjectUtils.isEmpty(generalSpecificationDto) || StringUtils.isEmpty(generalSpecificationDto.subcat_spec_name)){
      throw new CategoryException(CategoryErrorConstant.INVALID_SPECIFICATION)
    }

    const _id = await this.sequenceService.generateId(
      SequenceConstant.PRODUCT_SPECIFICATION_PREFIX
    );
    const result = await this.generalSpecificationRepository.create({ ...generalSpecificationDto, _id });
    return this.categoryMapper.mapSchemaToModel(result, GeneralSpecificationDto);
  }

  async findAllGeneralSpecification(): Promise<GeneralSpecificationDto[]> {
    const generalSpecificationList = await this.generalSpecificationRepository.findAll();
    const generalSubspecificationList = await this.generalSubspecificationRepository.findAll();

    const result = generalSpecificationList.map(spec => {
      const filteredSubspec = generalSubspecificationList.filter(subspec => subspec.subcat_spec_id === spec._id.toString());
      return filteredSubspec.length > 0 ? { ...spec.toObject(), children: filteredSubspec } : spec.toObject();
    });
    return result;
  }

  async updateGeneralSpecification(id: string, generalSpecificationDto: GeneralSpecificationDto): Promise<GeneralSpecificationDto> {
    if(ObjectUtils.isEmpty(generalSpecificationDto) || StringUtils.isEmpty(generalSpecificationDto.subcat_spec_name)){
      throw new CategoryException(CategoryErrorConstant.INVALID_SPECIFICATION)
    }

    generalSpecificationDto = { ...generalSpecificationDto, last_updated_on: new Date() };
    const result = await this.generalSpecificationRepository.update(id, generalSpecificationDto);

    if(ObjectUtils.isEmpty(result)) {
      throw new CategoryException(CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
    }

    return this.categoryMapper.mapSchemaToModel(result, GeneralSpecificationDto);
  }

  async deactivateGeneralSpecification(id: string, is_active: boolean): Promise<GeneralSpecificationDto> {
    const result = await this.generalSpecificationRepository.deactivateGeneralSpecificationById(id, is_active);

    if(ObjectUtils.isEmpty(result)) {
      throw new CategoryException(CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
    }

    return this.categoryMapper.mapSchemaToModel(result, GeneralSpecificationDto);
  }

  async deleteGeneralSpecification(id: string): Promise<GeneralSpecificationDto> {
    await this.generalSubspecificationRepository.deleteGeneralSubspecificationBySpecId(id);
    const result = await this.generalSpecificationRepository.delete(id);

    if(ObjectUtils.isEmpty(result)) {
      throw new CategoryException(CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
    }

    return this.categoryMapper.mapSchemaToModel(result, GeneralSpecificationDto);
  }

  async createGeneralSubspecification(generalSubspecificationDto: GeneralSubspecificationDto): Promise<GeneralSubspecificationDto> {
    if(ObjectUtils.isEmpty(generalSubspecificationDto) || StringUtils.isEmpty(generalSubspecificationDto.subcat_subspec_name)){
      throw new CategoryException(CategoryErrorConstant.INVALID_SPECIFICATION)
    }

    const _id = await this.sequenceService.generateId(
      SequenceConstant.PRODUCT_SUBSPECIFICATION_PREFIX
    );
    const result = await this.generalSubspecificationRepository.create({ ...generalSubspecificationDto, _id });
    return this.categoryMapper.mapSchemaToModel(result, GeneralSubspecificationDto);
  }

  async findAllGeneralSubspecification(): Promise<GeneralSubspecificationDto[]> {
    const result = await this.generalSubspecificationRepository.findAll();
    return this.categoryMapper.mapSchemaListToDtoList(result, GeneralSubspecificationDto);
  }

  async updateGeneralSubspecification(id: string, generalSubspecificationDto: GeneralSubspecificationDto): Promise<GeneralSubspecificationDto> {
    if(ObjectUtils.isEmpty(generalSubspecificationDto) || StringUtils.isEmpty(generalSubspecificationDto.subcat_subspec_name)){
      throw new CategoryException(CategoryErrorConstant.INVALID_SPECIFICATION)
    }

    generalSubspecificationDto = { ...generalSubspecificationDto, last_updated_on: new Date() };
    const result = await this.generalSubspecificationRepository.update(id, generalSubspecificationDto);

    if(ObjectUtils.isEmpty(result)) {
      throw new CategoryException(CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
    }

    return this.categoryMapper.mapSchemaToModel(result, GeneralSubspecificationDto);
  }

  async deactivateGeneralSubspecification(id: string, is_active: boolean): Promise<GeneralSubspecificationDto> {
    const result = await this.generalSubspecificationRepository.deactivateGeneralSubspecificationById(id, is_active);

    if(ObjectUtils.isEmpty(result)) {
      throw new CategoryException(CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
    }

    return this.categoryMapper.mapSchemaToModel(result, GeneralSubspecificationDto);
  }

  async deleteGeneralSubspecification(id: string): Promise<GeneralSubspecificationDto> {
    const result = await this.generalSubspecificationRepository.delete(id);

    if(ObjectUtils.isEmpty(result)) {
      throw new CategoryException(CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
    }

    return this.categoryMapper.mapSchemaToModel(result, GeneralSubspecificationDto);
  }

}