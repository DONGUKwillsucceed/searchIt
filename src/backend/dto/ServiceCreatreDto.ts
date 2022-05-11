import {
  validate,
  validateOrReject,
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max,
} from "class-validator";
import { ServiceProposeStatus } from "../types/ServiceProposeStatus";

export class ServiceCreateDto {
  paperSize: {
    id: string;
  };
  paperType: {
    id: string;
  };
  serviceType: {
    id: string;
  };
  color_type: ColorType;
  @IsInt()
  price: number;
  price_duplex_explicit?: number;
  proposed_reply: string;
  status: ServiceProposeStatus;
}
