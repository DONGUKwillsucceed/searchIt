import {
  IsUUID,
  IsEnum,
  IsPositive,
  IsInt,
} from "class-validator";
import { ColorType } from "../types/ColorType";
import { ServiceProposeStatus } from "../types/ServiceProposeStatus";

export class ServiceCreateDto {
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
  price_duplex_explicit?: number;

  @IsUUID()
  proposed_reply?: string;
}
