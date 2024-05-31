import {
  IsNotEmpty,
  IsDate,
  IsString,
  IsBoolean,
  IsArray
} from 'class-validator';

export class AnnouncementDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsNotEmpty()
  file_uploaded:[];

  @IsDate()
  created_on: Date;

  @IsString()
  @IsNotEmpty()
  created_by: string;

  @IsDate()
  updated_on: Date;

  @IsString()
  updated_by: string;

  @IsBoolean()
  visibility: boolean;
}
