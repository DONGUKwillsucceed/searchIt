import { ArrayUnique, IsInt, IsNumber, IsPhoneNumber, IsString, Length, MaxLength, ValidateNested } from "class-validator";
import { ServiceCreateDto } from "./ServiceCreateDto";

export class PrintZoneCreateDto {
  @MaxLength(200)
  company: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsPhoneNumber('KR')
  phone_number?: string;

  @IsInt()
  area_code: number;

  @MaxLength(200)
  address_detail: string;

  @MaxLength(800)
  description?: string;

  @ArrayUnique()
  @MaxLength(40, { each: true })
  tags: string[]; // sanitize 해야 함

  @ValidateNested({ each: true })
  services: ServiceCreateDto[];
}
