import { Inject, Injectable } from "@nestjs/common";
import { ISubcategorySpecificationService } from "../interfaces/subcategory-specification.service.interface";
import { SubcategorySpecificationDto } from "../../dtos/subcategory-specification.dto";
import { SubcategorySpecification } from "../../domain/schema/subcategory-specification.schema";
import { SubcategorySubspecificationDto } from "../../dtos/subcategory-subspecification.dto";
import { SubcategorySubspecification } from "../../domain/schema/subcategory-subspecification.schema";
import { SubcategorySpecificationRepository } from "../../domain/repositories/subcategory-specification.repository";
import { SequenceService } from "../../../sequence/services/implementations/sequence.services";
import {
  SubcategorySubspecificationRepository
} from "../../domain/repositories/subcategory-subspecification.repository";
import { SequenceConstant } from "../../../../common/constant/sequence.constant";
import { BaseSpecificationService } from "./base-specification.service";
import { CategoryMapper } from "../mapper/category.mapper";
import { CategoryService } from "./category.service";
import { IBaseSpecificationService } from "../interfaces/base-specification.service.interface";
import { ICategoryService } from "../interfaces/category.service.interface";
import { ISequenceService } from "../../../sequence/services/interfaces/sequence.service.interface";

@Injectable()
export class SubcategorySpecificationService implements ISubcategorySpecificationService {
  constructor(
    private readonly subcategorySpecificationRepository: SubcategorySpecificationRepository,
    private readonly subcategorySubspecificationRepository: SubcategorySubspecificationRepository,
    private readonly categoryMapper: CategoryMapper,
    @Inject(SequenceService.name) private readonly sequenceService: ISequenceService,
    @Inject(CategoryService.name) private readonly categoryService: ICategoryService,
    @Inject(BaseSpecificationService.name) private readonly baseSpecificationService: IBaseSpecificationService
  ) {
  }

  async createSubcategorySpecification(subcategorySpecificationDto: SubcategorySpecificationDto): Promise<SubcategorySpecification> {
    const _id = await this.sequenceService.generateId(
      SequenceConstant.PRODUCT_SPECIFICATION_PREFIX
    );
    return this.subcategorySpecificationRepository.create({ ...subcategorySpecificationDto, _id });
  }

  async findSubcategorySpecificationById(id: string): Promise<SubcategorySpecification[]> {
    const subcategory = await this.categoryService.findOneSubcategoryById(id);
    const baseSpecList = this.categoryMapper.mapBaseSpecificationDtoListToSubcategorySpecificationDtoList(
      await this.baseSpecificationService.findBaseSpecificationByCatId(subcategory.cat_id)
    );

    const specificationList = await this.subcategorySpecificationRepository.findAllByFilter({ subcat_id: id });
    const specificationIdList = specificationList.map(spec => spec._id);
    const subspecificationList = await this.subcategorySubspecificationRepository.findAllByFilter({ subcat_spec_id: { $in: specificationIdList } });

    const result = specificationList.map(spec => {
      const filteredSubspec = subspecificationList.filter(subspec => subspec.subcat_spec_id === spec._id.toString());
      return filteredSubspec.length > 0 ? { ...spec.toObject(), children: filteredSubspec } : spec.toObject();
    });

    return [...baseSpecList, ...result];
  }

  async updateSubcategorySpecification(id: string, subcategorySpecificationDto: SubcategorySpecificationDto): Promise<SubcategorySpecification> {
    subcategorySpecificationDto = { ...subcategorySpecificationDto, last_updated_on: new Date() };
    return this.subcategorySpecificationRepository.update(id, subcategorySpecificationDto);
  }

  async deactivateSubcategorySpecification(id: string, is_active: boolean): Promise<SubcategorySpecification> {
    return this.subcategorySpecificationRepository.deactivateSubcategorySpecificationById(id, is_active);
  }

  async deleteSubcategorySpecification(id: string): Promise<SubcategorySpecification> {
    await this.subcategorySubspecificationRepository.deleteSubcategorySubspecificationBySpecId(id);
    return this.subcategorySpecificationRepository.delete(id);
  }

  async createSubcategorySubspecification(subcategorySubspecificationDto: SubcategorySubspecificationDto): Promise<SubcategorySubspecification> {
    const _id = await this.sequenceService.generateId(
      SequenceConstant.PRODUCT_SUBSPECIFICATION_PREFIX
    );
    return this.subcategorySubspecificationRepository.create({ ...subcategorySubspecificationDto, _id });
  }

  async updateSubcategorySubspecification(id: string, subcategorySubspecificationDto: SubcategorySubspecificationDto): Promise<SubcategorySubspecification> {
    subcategorySubspecificationDto = { ...subcategorySubspecificationDto, last_updated_on: new Date() };
    return this.subcategorySubspecificationRepository.update(id, subcategorySubspecificationDto);
  }

  async deactivateSubcategorySubspecification(id: string, is_active: boolean): Promise<SubcategorySubspecification> {
    return this.subcategorySubspecificationRepository.deactivateSubcategorySubspecificationById(id, is_active);
  }

  async deleteSubcategorySubspecification(id: string): Promise<SubcategorySubspecification> {
    return this.subcategorySubspecificationRepository.delete(id);
  }

}