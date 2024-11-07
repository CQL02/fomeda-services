import { IGeneralSpecificationService } from "../interfaces/general-specification.service.interface";
import { GeneralSpecificationDto } from "../../dtos/general-specification.dto";
import { GeneralSubspecificationDto } from "../../dtos/general-subspecification.dto";
import { CategoryGeneralSpecificationRepository } from "../../domain/repositories/category-general-specification.repository";
import { CategoryGeneralSubspecificationRepository } from "../../domain/repositories/category-general-subspecification.repository";
import { ISequenceService } from "../../../sequence/services/interfaces/sequence.service.interface";
import { CategoryMapper } from "../mapper/category.mapper";
import { Request } from "express";
export declare class GeneralSpecificationService implements IGeneralSpecificationService {
    private readonly generalSubspecificationRepository;
    private readonly generalSpecificationRepository;
    private readonly categoryMapper;
    private readonly sequenceService;
    constructor(generalSubspecificationRepository: CategoryGeneralSubspecificationRepository, generalSpecificationRepository: CategoryGeneralSpecificationRepository, categoryMapper: CategoryMapper, sequenceService: ISequenceService);
    createGeneralSpecification(req: Request, generalSpecificationDto: GeneralSpecificationDto): Promise<GeneralSpecificationDto>;
    findAllGeneralSpecification(): Promise<GeneralSpecificationDto[]>;
    findAllActiveGeneralSpecification(): Promise<GeneralSpecificationDto[]>;
    findGeneralSpecificationById(id: string): Promise<GeneralSpecificationDto>;
    updateGeneralSpecification(req: Request, id: string, generalSpecificationDto: GeneralSpecificationDto): Promise<GeneralSpecificationDto>;
    deactivateGeneralSpecification(req: Request, id: string, is_active: boolean): Promise<GeneralSpecificationDto>;
    deleteGeneralSpecification(id: string): Promise<GeneralSpecificationDto>;
    createGeneralSubspecification(req: Request, generalSubspecificationDto: GeneralSubspecificationDto): Promise<GeneralSubspecificationDto>;
    findAllGeneralSubspecification(): Promise<GeneralSubspecificationDto[]>;
    findGeneralSubspecificationById(id: string): Promise<GeneralSubspecificationDto>;
    updateGeneralSubspecification(req: Request, id: string, generalSubspecificationDto: GeneralSubspecificationDto): Promise<GeneralSubspecificationDto>;
    deactivateGeneralSubspecification(req: Request, id: string, is_active: boolean): Promise<GeneralSubspecificationDto>;
    deleteGeneralSubspecification(id: string): Promise<GeneralSubspecificationDto>;
}
