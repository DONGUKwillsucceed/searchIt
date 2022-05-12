import {
  ArrayUnique,
  IsEnum,
  IsNumber,
  IsPhoneNumber,
  Length,
  MaxLength,
  ValidateNested,
} from "class-validator";
import { ReporterTypes } from "../types/ReporterTypes";
import { ServiceCreateDto } from "./ServiceCreateDto";

export class PrintZoneCreateDto {
  @MaxLength(200)
  company: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsPhoneNumber("KR")
  phone_number?: string;

  @Length(10)
  area_code: string;

  @MaxLength(200)
  address_detail: string;

  @MaxLength(800)
  description: string;

  @ArrayUnique()
  @MaxLength(40, { each: true })
  tags: string[]; // sanitize 해야 함

  @ValidateNested({ each: true })
  services: ServiceCreateDto[];

  @IsEnum(ReporterTypes)
  reportedBy: ReporterTypes;
}
