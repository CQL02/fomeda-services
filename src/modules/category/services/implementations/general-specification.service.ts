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
import { CategoryGeneralSpecification } from "../../domain/schema/category-general-specification.schema";
import { CategoryGeneralSubspecification } from "../../domain/schema/category-general-subspecification.schema";
import { SequenceService } from "../../../sequence/services/sequence.services";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GeneralSpecificationService implements IGeneralSpecificationService {
  constructor(
    private readonly sequenceService: SequenceService,
    private readonly generalSubspecificationRepository: CategoryGeneralSubspecificationRepository,
    private readonly generalSpecificationRepository: CategoryGeneralSpecificationRepository
  ) {
  }

  async createGeneralSpecification(generalSpecificationDto: GeneralSpecificationDto): Promise<CategoryGeneralSpecification> {
    const _id = await this.sequenceService.generateId(
      SequenceConstant.PRODUCT_SPECIFICATION_PREFIX
    );
    return this.generalSpecificationRepository.create({ ...generalSpecificationDto, _id });
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

  async updateGeneralSpecification(id: string, generalSpecificationDto: GeneralSpecificationDto): Promise<CategoryGeneralSpecification> {
    return this.generalSpecificationRepository.update(id, generalSpecificationDto);
  }

  async deactivateGeneralSpecification(id: string, is_active: boolean): Promise<CategoryGeneralSpecification> {
    return this.generalSpecificationRepository.update(id, is_active);
  }

  async deleteGeneralSpecification(id: string): Promise<CategoryGeneralSpecification> {
    return this.generalSpecificationRepository.delete(id);
  }

  async createGeneralSubspecification(generalSubspecificationDto: GeneralSubspecificationDto): Promise<CategoryGeneralSubspecification> {
    const _id = await this.sequenceService.generateId(
      SequenceConstant.PRODUCT_SUBSPECIFICATION_PREFIX
    );
    return this.generalSubspecificationRepository.create({ ...generalSubspecificationDto, _id });
  }

  async findAllGeneralSubspecification(): Promise<CategoryGeneralSubspecification[]> {
    return this.generalSubspecificationRepository.findAll();
  }

  async updateGeneralSubspecification(id: string, generalSubspecificationDto: GeneralSubspecificationDto): Promise<CategoryGeneralSubspecification> {
    return this.generalSubspecificationRepository.update(id, generalSubspecificationDto);
  }

  async deactivateGeneralSubspecification(id: string, is_active: boolean): Promise<CategoryGeneralSubspecification> {
    return this.generalSubspecificationRepository.deactivateCategoryById(id, is_active);
  }

  async deleteGeneralSubspecification(id: string): Promise<CategoryGeneralSubspecification> {
    return this.generalSubspecificationRepository.delete(id);
  }

}