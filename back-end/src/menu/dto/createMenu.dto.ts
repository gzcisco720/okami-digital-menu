import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class MenuItemDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  description: string;

  @IsString()
  category?: string;
}

export class CreateMenuDto {
  @IsString()
  @IsNotEmpty()
  branch: string;

  @IsDefined()
  @IsNumber()
  buffetPrice: number;

  @IsDefined()
  @IsArray()
  @ValidateNested()
  @Type(() => MenuItemDTO)
  menuItems: MenuItemDTO[];
}
