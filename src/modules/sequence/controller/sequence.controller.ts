import { Body, Controller, Inject, Put } from "@nestjs/common";
import { SequenceDto } from '../dtos/sequence.dto';
import { SequenceService } from '../services/implementations/sequence.services';
import { ISequenceService } from "../services/interfaces/sequence.service.interface";

@Controller('sequence')
export class SequenceController {
  constructor(@Inject(SequenceService.name) private readonly sequenceService: ISequenceService) {}

  @Put('generate-id')
  async generateId(@Body() sequenceDto: SequenceDto): Promise<string> {
    return await this.sequenceService.generateId(sequenceDto.prefix);
  }
}
