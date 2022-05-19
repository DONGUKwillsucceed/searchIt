import {
  IsUUID,
  IsEnum,
  IsPositive,
  IsInt,
  IsOptional,
} from "class-validator";
import { ColorType } from "../types/ColorType";

export class ServiceCreateDto {
  @IsUUID(4)
  id: string;

  @IsUUID(4)
  paperSizeId: string;

  @IsUUID(4)
  paperTypeId: string;

  @IsUUID(4)
  serviceTypeId: string;

  @IsUUID(4)
  printZoneId: string;

  @IsEnum(ColorType)
  color_type: ColorType;

  @IsPositive()
  @IsInt()
  price: number;

  @IsPositive()
  @IsInt()
  @IsOptional()
  price_duplex_explicit?: number;

  @IsUUID()
  @IsOptional()
  proposed_reply?: string;
}
