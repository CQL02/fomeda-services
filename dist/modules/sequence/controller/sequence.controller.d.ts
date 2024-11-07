import { SequenceDto } from '../dtos/sequence.dto';
import { ISequenceService } from "../services/interfaces/sequence.service.interface";
export declare class SequenceController {
    private readonly sequenceService;
    constructor(sequenceService: ISequenceService);
    generateId(sequenceDto: SequenceDto): Promise<string>;
}
