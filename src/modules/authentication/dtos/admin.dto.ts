import {
  IsNotEmpty,
  IsUUID
} from 'class-validator';

export class AdminDto {
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

}
