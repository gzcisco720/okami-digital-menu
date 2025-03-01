import { IsDefined, IsNumber } from 'class-validator';

export class UpdateMenuPriceDto {
  @IsDefined()
  @IsNumber()
  buffetPrice: number;
}
