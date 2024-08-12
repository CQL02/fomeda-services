import {
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class SessionDto {
  @IsString()
  @IsNotEmpty()
  session_id: string;
}
