import { Inject, Injectable } from "@nestjs/common";
import { IBaseSpecificationService } from "../interfaces/base-specification.service.interface";
import { BaseSpecificationDto } from "../../dtos/base-specification.dto";
import { BaseSubspecificationDto } from "../../dtos/base-subspecification.dto";
import { CategoryBaseSpecificationRepository } from "../../domain/repositories/category-base-specification.repository";
import {
  CategoryBaseSubspecificationRepository
} from "../../domain/repositories/category-base-subspecification.repository";
import { SequenceService } from "../../../sequence/services/implementations/sequence.services";
import { SequenceConstant } from "../../../../common/constant/sequence.constant";
import { GeneralSpecificationService } from "./general-specification.service";
import { CategoryMapper } from "../mapper/category.mapper";
import { IGeneralSpecificationService } from "../interfaces/general-specification.service.interface";
import { ISequenceService } from "../../../sequence/services/interfaces/sequence.service.interface";
import { ObjectUtils } from "../../../../common/utils/object.utils";
import { CategoryErrorConstant, CategoryException } from "../../../../common/exception/category.exception";
import { StringUtils } from "../../../../common/utils/string.utils";
import { Request } from "express";

@Injectable()
export class BaseSpecificationService implements IBaseSpecificationService {
  constructor(
    private readonly categoryBaseSpecificationRepository: CategoryBaseSpecificationRepository,
    private readonly categoryBaseSubspecificationRepository: CategoryBaseSubspecificationRepository,
    private readonly categoryMapper: CategoryMapper,
    @Inject(SequenceService.name) private readonly sequenceService: ISequenceService,
    @Inject(GeneralSpecificationService.name) private readonly generalSpecificationService: IGeneralSpecificationService
  ) {
  }

  async createBaseSpecification(req: Request, baseSpecificationDto: BaseSpecificationDto): Promise<BaseSpecificationDto> {
    if (ObjectUtils.isEmpty(baseSpecificationDto) || StringUtils.isEmpty(baseSpecificationDto.subcat_spec_name)) {
      throw new CategoryException(CategoryErrorConstant.INVALID_SPECIFICATION);
    }

    const specification = await this.categoryBaseSpecificationRepository.findBySpecificationName(baseSpecificationDto.subcat_spec_name.trim(), baseSpecificationDto.cat_type, baseSpecificationDto.cat_id);
    if(ObjectUtils.isNotEmpty(specification)) {
      throw new CategoryException(CategoryErrorConstant.DUPLICATE_SPECIFICATION);
    }

    const _id = await this.sequenceService.generateId(
      SequenceConstant.PRODUCT_BASE_SPECIFICATION_PREFIX
    );
    const user_id = req.user;

    const result = await this.categoryBaseSpecificationRepository.create({
      ...baseSpecificationDto, _id, created_by: user_id, last_updated_by: user_id
    });
    return this.categoryMapper.mapSchemaToModel(result, BaseSpecificationDto);
  }

  async findBaseSpecificationByCatId(id: string): Promise<BaseSpecificationDto[]> {
    const generalSpecList = this.categoryMapper.mapGeneralSpecificationDtoListToBaseSpecificationDtoList(
      await this.generalSpecificationService.findAllGeneralSpecification()
    );

    const specificationList = await this.categoryBaseSpecificationRepository.findAllByFilterWithUsername({ cat_id: id });
    const specificationIdList = specificationList.map(spec => spec._id);
    const subspecificationList = await this.categoryBaseSubspecificationRepository.findAllByFilterWithUsername({ subcat_spec_id: { $in: specificationIdList } });

    const result = specificationList.map(spec => {
      const filteredSubspec = subspecificationList.filter(subspec => subspec.subcat_spec_id === spec._id.toString());
      return filteredSubspec.length > 0 ? { ...spec, children: filteredSubspec } : spec;
    });
    return [...generalSpecList, ...result];
  }
  async findActiveBaseSpecificationByCatId(id: string): Promise<BaseSpecificationDto[]> {
    const generalSpecList = this.categoryMapper.mapGeneralSpecificationDtoListToBaseSpecificationDtoList(
      await this.generalSpecificationService.findAllActiveGeneralSpecification()
    );

    const specificationList = await this.categoryBaseSpecificationRepository.findAllByFilter({ cat_id: id, is_active: true });
    const specificationIdList = specificationList.map(spec => spec._id);
    const subspecificationList = await this.categoryBaseSubspecificationRepository.findAllByFilter({ subcat_spec_id: { $in: specificationIdList }, is_active: true });

    const result = specificationList.map(spec => {
      const filteredSubspec = subspecificationList.filter(subspec => subspec.subcat_spec_id === spec._id.toString());
      return filteredSubspec.length > 0 ? { ...spec.toObject(), children: filteredSubspec } : spec.toObject();
    });
    return [...generalSpecList, ...result];
  }

  async findActiveBaseSpecificationByCatIds(ids: string[]): Promise<BaseSpecificationDto[]> {
    const filter: any = { is_active: true };
    if (ids && ids.length > 0) {
      filter.cat_id = { $in: ids };
    }

    const specificationList = await this.categoryBaseSpecificationRepository.findAllByFilter(filter);
    const specificationIdList = specificationList.map(spec => spec._id);
    const subspecificationList = await this.categoryBaseSubspecificationRepository.findAllByFilter({ subcat_spec_id: { $in: specificationIdList }, is_active: true });

    const result = specificationList.map(spec => {
      const filteredSubspec = subspecificationList.filter(subspec => subspec.subcat_spec_id === spec._id.toString());
      return (filteredSubspec.length > 0 ? { ...spec.toObject(), children: filteredSubspec } : spec.toObject());
    });

    return this.categoryMapper.mapSchemaToModel(result, BaseSpecificationDto);
  }

  async findBaseSpecificationById(id: string): Promise<BaseSpecificationDto> {
    const result = await this.categoryBaseSpecificationRepository.findOneById(id);

    if (ObjectUtils.isEmpty(result)) {
      throw new CategoryException(CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
    }

    return this.categoryMapper.mapSchemaToModel(result.toObject(), BaseSpecificationDto);
  }


  async updateBaseSpecification(req: Request, id: string, baseSpecificationDto: BaseSpecificationDto): Promise<BaseSpecificationDto> {
    if (ObjectUtils.isEmpty(baseSpecificationDto) || StringUtils.isEmpty(baseSpecificationDto.subcat_spec_name)) {
      throw new CategoryException(CategoryErrorConstant.INVALID_SPECIFICATION);
    }

    const specification = await this.categoryBaseSpecificationRepository.findBySpecificationName(baseSpecificationDto.subcat_spec_name.trim(), baseSpecificationDto.cat_type, baseSpecificationDto.cat_id);
    if(ObjectUtils.isNotEmpty(specification)) {
      throw new CategoryException(CategoryErrorConstant.DUPLICATE_SPECIFICATION);
    }

    const user_id = String(req.user);

    baseSpecificationDto = { ...baseSpecificationDto, last_updated_on: new Date(), last_updated_by: user_id };
    const result = await this.categoryBaseSpecificationRepository.update(id, baseSpecificationDto);

    if (ObjectUtils.isEmpty(result)) {
      throw new CategoryException(CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
    }

    return this.categoryMapper.mapSchemaToModel(result, BaseSpecificationDto);
  }

  async deactivateBaseSpecification(req: Request, id: string, is_active: boolean): Promise<BaseSpecificationDto> {
    const result = await this.categoryBaseSpecificationRepository.deactivateCategoryBaseSpecificationById(req, id, is_active);

    if (ObjectUtils.isEmpty(result)) {
      throw new CategoryException(CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
    }

    return this.categoryMapper.mapSchemaToModel(result, BaseSpecificationDto);
  }

  async deleteBaseSpecification(id: string): Promise<BaseSpecificationDto> {
    await this.categoryBaseSubspecificationRepository.deleteCategoryBaseSubspecificationBySpecId(id);
    const result = await this.categoryBaseSpecificationRepository.delete(id);

    if (ObjectUtils.isEmpty(result)) {
      throw new CategoryException(CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
    }

    return this.categoryMapper.mapSchemaToModel(result, BaseSpecificationDto);
  }

  async createBaseSubspecification(req: Request, baseSubspecificationDto: BaseSubspecificationDto): Promise<BaseSubspecificationDto> {
    if (ObjectUtils.isEmpty(baseSubspecificationDto) || StringUtils.isEmpty(baseSubspecificationDto.subcat_subspec_name)) {
      throw new CategoryException(CategoryErrorConstant.INVALID_SPECIFICATION);
    }

    const subspecification = await this.categoryBaseSubspecificationRepository.findBySubspecificationName(baseSubspecificationDto.subcat_spec_id, baseSubspecificationDto.subcat_subspec_name.trim());
    if(ObjectUtils.isNotEmpty(subspecification)){
      throw new CategoryException(CategoryErrorConstant.DUPLICATE_SUBSPECIFICATION);
    }

    const _id = await this.sequenceService.generateId(
      SequenceConstant.PRODUCT_BASE_SUBSPECIFICATION_PREFIX
    );
    const user_id = req.user;

    const result = await this.categoryBaseSubspecificationRepository.create({ ...baseSubspecificationDto, _id, created_by: user_id, last_updated_by: user_id });
    return this.categoryMapper.mapSchemaToModel(result, BaseSubspecificationDto);
  }

  async findBaseSubspecificationById(id: string): Promise<BaseSubspecificationDto> {
    const result = await this.categoryBaseSubspecificationRepository.findOneById(id);

    if (ObjectUtils.isEmpty(result)) {
      throw new CategoryException(CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
    }

    return this.categoryMapper.mapSchemaToModel(result.toObject(), BaseSubspecificationDto);
  }

  async updateBaseSubspecification(req: Request, id: string, baseSubspecificationDto: BaseSubspecificationDto): Promise<BaseSubspecificationDto> {
    if (ObjectUtils.isEmpty(baseSubspecificationDto) || StringUtils.isEmpty(baseSubspecificationDto.subcat_subspec_name)) {
      throw new CategoryException(CategoryErrorConstant.INVALID_SPECIFICATION);
    }

    const subspecification = await this.categoryBaseSubspecificationRepository.findBySubspecificationName(baseSubspecificationDto.subcat_spec_id, baseSubspecificationDto.subcat_subspec_name.trim());
    if(ObjectUtils.isNotEmpty(subspecification)){
      throw new CategoryException(CategoryErrorConstant.DUPLICATE_SUBSPECIFICATION);
    }

    const user_id = String(req.user);

    baseSubspecificationDto = { ...baseSubspecificationDto, last_updated_on: new Date(), last_updated_by: user_id };
    const result = await this.categoryBaseSubspecificationRepository.update(id, baseSubspecificationDto);

    if (ObjectUtils.isEmpty(result)) {
      throw new CategoryException(CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
    }

    return this.categoryMapper.mapSchemaToModel(result, BaseSubspecificationDto);
  }

  async deactivateBaseSubspecification(req: Request, id: string, is_active: boolean): Promise<BaseSubspecificationDto> {
    const result = await this.categoryBaseSubspecificationRepository.deactivateCategoryBaseSubspecificationById(req, id, is_active);

    if (ObjectUtils.isEmpty(result)) {
      throw new CategoryException(CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
    }

    return this.categoryMapper.mapSchemaToModel(result, BaseSubspecificationDto);
  }

  async deleteBaseSubspecification(id: string): Promise<BaseSubspecificationDto> {
    const result = await this.categoryBaseSubspecificationRepository.delete(id);

    if (ObjectUtils.isEmpty(result)) {
      throw new CategoryException(CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
    }

    return this.categoryMapper.mapSchemaToModel(result, BaseSubspecificationDto);
  }

}