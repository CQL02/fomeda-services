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
import { Request } from "express";

@Injectable()
export class GeneralSpecificationService implements IGeneralSpecificationService {
  constructor(
    private readonly generalSubspecificationRepository: CategoryGeneralSubspecificationRepository,
    private readonly generalSpecificationRepository: CategoryGeneralSpecificationRepository,
    private readonly categoryMapper: CategoryMapper,
    @Inject(SequenceService.name) private readonly sequenceService: ISequenceService
  ) {
  }

  async createGeneralSpecification(req: Request, generalSpecificationDto: GeneralSpecificationDto): Promise<GeneralSpecificationDto> {
    if(ObjectUtils.isEmpty(generalSpecificationDto) || StringUtils.isEmpty(generalSpecificationDto.subcat_spec_name)){
      throw new CategoryException(CategoryErrorConstant.INVALID_SPECIFICATION)
    }

    const specification = await this.generalSpecificationRepository.findBySpecificationName(generalSpecificationDto.subcat_spec_name.trim(), generalSpecificationDto.cat_type);
    if(ObjectUtils.isNotEmpty(specification)) {
      throw new CategoryException(CategoryErrorConstant.DUPLICATE_SPECIFICATION)
    }

    const _id = await this.sequenceService.generateId(
      SequenceConstant.PRODUCT_GENERAL_SPECIFICATION_PREFIX
    );
    const user_id = req.user;

    const result = await this.generalSpecificationRepository.create({ ...generalSpecificationDto, _id, created_by: user_id, last_updated_by: user_id });
    return this.categoryMapper.mapSchemaToModel(result, GeneralSpecificationDto);
  }

  async findAllGeneralSpecification(): Promise<GeneralSpecificationDto[]> {
    const generalSpecificationList = await this.generalSpecificationRepository.findAllWithUsername();
    const generalSubspecificationList = await this.generalSubspecificationRepository.findAllWithUsername();

    const result = generalSpecificationList.map(spec => {
      const filteredSubspec = generalSubspecificationList.filter(subspec => subspec.subcat_spec_id === spec._id.toString());
      return filteredSubspec.length > 0 ? { ...spec, children: filteredSubspec } : spec;
    });
    return result;
  }

  async findAllActiveGeneralSpecification(): Promise<GeneralSpecificationDto[]> {
    const generalSpecificationList = await this.generalSpecificationRepository.findAllByFilter({ is_active: true });
    const generalSubspecificationList = await this.generalSubspecificationRepository.findAllByFilter({ is_active: true });

    const result = generalSpecificationList.map(spec => {
      const filteredSubspec = generalSubspecificationList.filter(subspec => subspec.subcat_spec_id === spec._id.toString());
      return filteredSubspec.length > 0 ? { ...spec.toObject(), children: filteredSubspec } : spec.toObject();
    });
    return result;
  }

  async findGeneralSpecificationById(id: string): Promise<GeneralSpecificationDto> {
    const result = await this.generalSpecificationRepository.findOneById(id);

    if(ObjectUtils.isEmpty(result)) {
      throw new CategoryException(CategoryErrorConstant.SPECIFICATION_NOT_FOUND)
    }

    return this.categoryMapper.mapSchemaToModel(result.toObject(), GeneralSpecificationDto);
  }

  async updateGeneralSpecification(req: Request, id: string, generalSpecificationDto: GeneralSpecificationDto): Promise<GeneralSpecificationDto> {
    if(ObjectUtils.isEmpty(generalSpecificationDto) || StringUtils.isEmpty(generalSpecificationDto.subcat_spec_name)){
      throw new CategoryException(CategoryErrorConstant.INVALID_SPECIFICATION)
    }

    const user_id = String(req.user);

    generalSpecificationDto = { ...generalSpecificationDto, last_updated_on: new Date(), last_updated_by: user_id };
    const result = await this.generalSpecificationRepository.update(id, generalSpecificationDto);

    if(ObjectUtils.isEmpty(result)) {
      throw new CategoryException(CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
    }

    return this.categoryMapper.mapSchemaToModel(result, GeneralSpecificationDto);
  }

  async deactivateGeneralSpecification(req: Request, id: string, is_active: boolean): Promise<GeneralSpecificationDto> {
    const result = await this.generalSpecificationRepository.deactivateGeneralSpecificationById(req, id, is_active);

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

  async createGeneralSubspecification(req: Request, generalSubspecificationDto: GeneralSubspecificationDto): Promise<GeneralSubspecificationDto> {
    if(ObjectUtils.isEmpty(generalSubspecificationDto) || StringUtils.isEmpty(generalSubspecificationDto.subcat_subspec_name)){
      throw new CategoryException(CategoryErrorConstant.INVALID_SPECIFICATION)
    }

    const subspecification = await this.generalSubspecificationRepository.findBySubspecificationName(generalSubspecificationDto.subcat_spec_id, generalSubspecificationDto.subcat_subspec_name.trim());
    if(ObjectUtils.isNotEmpty(subspecification)){
      throw new CategoryException(CategoryErrorConstant.DUPLICATE_SUBSPECIFICATION);
    }

    const _id = await this.sequenceService.generateId(
      SequenceConstant.PRODUCT_GENERAL_SUBSPECIFICATION_PREFIX
    );
    const user_id = req.user;

    const result = await this.generalSubspecificationRepository.create({ ...generalSubspecificationDto, _id, created_by: user_id, last_updated_by: user_id });
    return this.categoryMapper.mapSchemaToModel(result, GeneralSubspecificationDto);
  }

  async findAllGeneralSubspecification(): Promise<GeneralSubspecificationDto[]> {
    const result = await this.generalSubspecificationRepository.findAll();
    return this.categoryMapper.mapSchemaListToDtoList(result, GeneralSubspecificationDto);
  }

  async findGeneralSubspecificationById(id: string): Promise<GeneralSubspecificationDto> {
    const result = await this.generalSubspecificationRepository.findOneById(id);

    if(ObjectUtils.isEmpty(result)) {
      throw new CategoryException(CategoryErrorConstant.SPECIFICATION_NOT_FOUND)
    }

    return this.categoryMapper.mapSchemaToModel(result.toObject(), GeneralSubspecificationDto);
  }

  async updateGeneralSubspecification(req: Request, id: string, generalSubspecificationDto: GeneralSubspecificationDto): Promise<GeneralSubspecificationDto> {
    if(ObjectUtils.isEmpty(generalSubspecificationDto) || StringUtils.isEmpty(generalSubspecificationDto.subcat_subspec_name)){
      throw new CategoryException(CategoryErrorConstant.INVALID_SPECIFICATION)
    }

    const user_id = String(req.user);

    generalSubspecificationDto = { ...generalSubspecificationDto, last_updated_on: new Date(), last_updated_by: user_id };
    const result = await this.generalSubspecificationRepository.update(id, generalSubspecificationDto);

    if(ObjectUtils.isEmpty(result)) {
      throw new CategoryException(CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
    }

    return this.categoryMapper.mapSchemaToModel(result, GeneralSubspecificationDto);
  }

  async deactivateGeneralSubspecification(req: Request, id: string, is_active: boolean): Promise<GeneralSubspecificationDto> {
    const result = await this.generalSubspecificationRepository.deactivateGeneralSubspecificationById(req, id, is_active);

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