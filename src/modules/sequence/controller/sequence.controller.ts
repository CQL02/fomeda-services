import { Body, Controller, Put } from '@nestjs/common';
import { SequenceDto } from '../dtos/sequence.dto';
import { SequenceService } from '../services/implementations/sequence.services';

@Controller('sequence')
export class SequenceController {
  constructor(private readonly sequenceService: SequenceService) {}

  @Put('generate-id')
  async generateId(@Body() sequenceDto: SequenceDto): Promise<string> {
    return await this.sequenceService.generateId(sequenceDto.prefix);
  }
}
