import { IsIn, IsString } from 'class-validator';
import { SequenceConstant } from '../../../common/constant/sequence.constant';

export class SequenceDto {
  @IsString()
  @IsIn(Object.values(SequenceConstant))
  prefix: string;
}
