import { Inject, Injectable } from "@nestjs/common";
import { IBaseSpecificationService } from "../interfaces/base-specification.service.interface";
import { BaseSpecificationDto } from "../../dtos/base-specification.dto";
import { CategoryBaseSpecification } from "../../domain/schema/category-base-specification.schema";
import { BaseSubspecificationDto } from "../../dtos/base-subspecification.dto";
import { CategoryBaseSubspecification } from "../../domain/schema/category-base-subspecification.schema";
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

  async createBaseSpecification(baseSpecificationDto: BaseSpecificationDto): Promise<CategoryBaseSpecification> {
    const _id = await this.sequenceService.generateId(
      SequenceConstant.PRODUCT_SPECIFICATION_PREFIX
    );
    return this.categoryBaseSpecificationRepository.create({ ...baseSpecificationDto, _id });
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

  async updateBaseSpecification(id: string, baseSpecificationDto: BaseSpecificationDto): Promise<CategoryBaseSpecification> {
    baseSpecificationDto = {...baseSpecificationDto, last_updated_on: new Date()};
    return this.categoryBaseSpecificationRepository.update(id, baseSpecificationDto);
  }

  async deactivateBaseSpecification(id: string, is_active: boolean): Promise<CategoryBaseSpecification> {
    return this.categoryBaseSpecificationRepository.deactivateCategoryBaseSpecificationById(id, is_active);
  }

  async deleteBaseSpecification(id: string): Promise<CategoryBaseSpecification> {
    await this.categoryBaseSubspecificationRepository.deleteCategoryBaseSubspecificationBySpecId(id);
    return this.categoryBaseSpecificationRepository.delete(id);
  }

  async createBaseSubspecification(baseSubspecificationDto: BaseSubspecificationDto): Promise<CategoryBaseSubspecification> {
    const _id = await this.sequenceService.generateId(
      SequenceConstant.PRODUCT_SUBSPECIFICATION_PREFIX
    );
    return this.categoryBaseSubspecificationRepository.create({ ...baseSubspecificationDto, _id });
  }

  async updateBaseSubspecification(id: string, baseSubspecificationDto: BaseSubspecificationDto): Promise<CategoryBaseSubspecification> {
    baseSubspecificationDto = {...baseSubspecificationDto, last_updated_on: new Date()};
    return this.categoryBaseSubspecificationRepository.update(id, baseSubspecificationDto);
  }

  async deactivateBaseSubspecification(id: string, is_active: boolean): Promise<CategoryBaseSubspecification> {
    return this.categoryBaseSubspecificationRepository.deactivateCategoryBaseSubspecificationById(id, is_active);
  }

  async deleteBaseSubspecification(id: string): Promise<CategoryBaseSubspecification> {
    return this.categoryBaseSubspecificationRepository.delete(id);
  }

}