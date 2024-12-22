import {
  IsNotEmpty,
  IsDate,
  IsString,
  IsBoolean,
} from 'class-validator';

export class ContentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDate()
  created_on: Date;

  @IsString()
  @IsNotEmpty()
  created_by: string;

  @IsDate()
  last_updated_on: Date;

  @IsString()
  last_updated_by: string;

}
