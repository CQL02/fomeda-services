import { ISequenceService } from '../interfaces/sequence.service.interface';
import { SequenceRepository } from '../../domain/repositories/sequence.repository';
export declare class SequenceService implements ISequenceService {
    private readonly sequenceRepository;
    constructor(sequenceRepository: SequenceRepository);
    generateId(prefix: string): Promise<string>;
}
