import { Type } from "class-transformer";
import {
  ArrayUnique,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
  Length,
  MaxLength,
  ValidateNested,
} from "class-validator";
import { ReplyStatus } from "../types/ReplyStatus";
import { ServiceCreateDto } from "./ServiceCreateDto";

export class ReplyCreateDto {
  @IsUUID(4)
  id: string;

  @MaxLength(10)
  writer_emoji: string;

  @MaxLength(40)
  writer_name: string;

  @MaxLength(800)
  comment: string;

  @IsUUID(4)
  printZoneId: string;

  @IsEnum(ReplyStatus)
  status: number;

  @IsNumber()
  reportCount: number;

  @IsUUID(4, { each: true })
  imageIds: string[];

  @MaxLength(40, { each: true })
  tags: string[];

  @ValidateNested({ each: true })
  @Type(() => ServiceCreateDto)
  services: ServiceCreateDto[];
}
