import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsNotEmpty,
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
}

export class CreateMenuDto {
  @IsString()
  @IsNotEmpty()
  branch: string;

  @IsDefined()
  @IsArray()
  @ValidateNested()
  @Type(() => MenuItemDTO)
  menuItems: MenuItemDTO[];
}
