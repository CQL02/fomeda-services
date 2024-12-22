import {
  IsDate,
  IsNotEmpty,
  IsObject, IsString,
} from 'class-validator';

export class CarouselDto {
  @IsObject()
  @IsNotEmpty()
  image: object;

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
