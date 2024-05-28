import {
  IsNotEmpty,
  IsDate,
  IsUUID
} from 'class-validator';

export class AdminDto {
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @IsDate()
  created_on: Date;

  @IsDate()
  last_updated_on: Date;
}
