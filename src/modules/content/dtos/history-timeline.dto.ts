import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsObject,
  IsString,
} from 'class-validator';

export class HistoryTimelineDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  date: string;

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
