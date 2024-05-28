import { Injectable } from '@nestjs/common';
import { ISequenceService } from '../interfaces/sequence.service.interface';
import { SequenceRepository } from '../../domain/repositories/sequence.repository';

@Injectable()
export class SequenceService implements ISequenceService {
  constructor(private readonly sequenceRepository: SequenceRepository) {}

  async generateId(prefix: string): Promise<string> {
    const sequenceDoc = await this.sequenceRepository.findOneAndUpdate(prefix, {
      $inc: { sequence_value: 1 },
    });

    const paddedValue = sequenceDoc.sequence_value.toString().padStart(12, '0');
    return `${prefix}${paddedValue}`;
  }
}
