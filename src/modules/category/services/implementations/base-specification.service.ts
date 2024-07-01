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

  async createBaseSpecification(baseSpecificationDto: BaseSpecificationDto): Promise<BaseSpecificationDto> {
    const _id = await this.sequenceService.generateId(
      SequenceConstant.PRODUCT_SPECIFICATION_PREFIX
    );

    const result = await this.categoryBaseSpecificationRepository.create({
      ...baseSpecificationDto,
      _id
    });
    return this.categoryMapper.mapSchemaToModel(result, BaseSpecificationDto);
  }

  async findBaseSpecificationByCatId(id: string): Promise<BaseSpecificationDto[]> {
    const generalSpecList = this.categoryMapper.mapGeneralSpecificationDtoListToBaseSpecificationDtoList(
      await this.generalSpecificationService.findAllGeneralSpecification()
    );

    const specificationList = await this.categoryBaseSpecificationRepository.findAllByFilter({ cat_id: id });
    const specificationIdList = specificationList.map(spec => spec._id);
    const subspecificationList = await this.categoryBaseSubspecificationRepository.findAllByFilter({ subcat_spec_id: { $in: specificationIdList } });

    const result = specificationList.map(spec => {
      const filteredSubspec = subspecificationList.filter(subspec => subspec.subcat_spec_id === spec._id.toString());
      return filteredSubspec.length > 0 ? { ...spec.toObject(), children: filteredSubspec } : spec.toObject();
    });
    return [...generalSpecList, ...result];
  }

  async updateBaseSpecification(id: string, baseSpecificationDto: BaseSpecificationDto): Promise<BaseSpecificationDto> {
    baseSpecificationDto = { ...baseSpecificationDto, last_updated_on: new Date() };
    const result = await this.categoryBaseSpecificationRepository.update(id, baseSpecificationDto)
    return this.categoryMapper.mapSchemaToModel(result, BaseSpecificationDto);
  }

  async deactivateBaseSpecification(id: string, is_active: boolean): Promise<BaseSpecificationDto> {
    const result = await this.categoryBaseSpecificationRepository.deactivateCategoryBaseSpecificationById(id, is_active)
    return this.categoryMapper.mapSchemaToModel(result, BaseSpecificationDto);
  }

  async deleteBaseSpecification(id: string): Promise<BaseSpecificationDto> {
    await this.categoryBaseSubspecificationRepository.deleteCategoryBaseSubspecificationBySpecId(id);
    const result = await this.categoryBaseSpecificationRepository.delete(id);
    return this.categoryMapper.mapSchemaToModel(result, BaseSpecificationDto);
  }

  async createBaseSubspecification(baseSubspecificationDto: BaseSubspecificationDto): Promise<BaseSubspecificationDto> {
    const _id = await this.sequenceService.generateId(
      SequenceConstant.PRODUCT_SUBSPECIFICATION_PREFIX
    );
    const result = await this.categoryBaseSubspecificationRepository.create({ ...baseSubspecificationDto, _id });
    return this.categoryMapper.mapSchemaToModel(result, BaseSubspecificationDto);
  }

  async updateBaseSubspecification(id: string, baseSubspecificationDto: BaseSubspecificationDto): Promise<BaseSubspecificationDto> {
    baseSubspecificationDto = { ...baseSubspecificationDto, last_updated_on: new Date() };
    const result = await this.categoryBaseSubspecificationRepository.update(id, baseSubspecificationDto)
    return this.categoryMapper.mapSchemaToModel(result, BaseSubspecificationDto);
  }

  async deactivateBaseSubspecification(id: string, is_active: boolean): Promise<BaseSubspecificationDto> {
    const result = await this.categoryBaseSubspecificationRepository.deactivateCategoryBaseSubspecificationById(id, is_active);
    return this.categoryMapper.mapSchemaToModel(result, BaseSubspecificationDto);
  }

  async deleteBaseSubspecification(id: string): Promise<BaseSubspecificationDto> {
    const result = await this.categoryBaseSubspecificationRepository.delete(id);
    return this.categoryMapper.mapSchemaToModel(result, BaseSubspecificationDto);
  }

}