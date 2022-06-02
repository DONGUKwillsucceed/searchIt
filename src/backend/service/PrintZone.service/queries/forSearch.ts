import {
  AreaCode,
  PaperSizes,
  PaperTypes,
  PrintZones,
  Services,
  ServiceType,
} from "@prisma/client";
import { PrintZoneSearchResultDto } from "../../../dto/PrintZoneDto";
import { PrintZonePriorities } from "../../../types/PrintZonePriorities";
import { PrintZoneStatus } from "../../../types/PrintZoneStatus";
import { areaService } from "../../Area.service";

export const pzSearchQueryIncludeProps = {
  AreaCode: true,
  Services: {
    include: {
      PaperSizes: true,
      PaperTypes: true,
      ServiceType: true,
    },
  },
};
export type pzSearchQueryResult = PrintZones & {
  AreaCode: AreaCode;
  Services: (Services & {
    PaperSizes: PaperSizes;
    PaperTypes: PaperTypes;
    ServiceType: ServiceType;
  })[];
};
export function pzSearchQueryResultToDto(r: pzSearchQueryResult): PrintZoneSearchResultDto {
  return {
    id: r.id,
    created_at: r.created_at,
    updated_at: r.updated_at,
    company: r.company,
    latitude: r.latitude,
    longitude: r.longitude,
    phone_number: r.phone_number,
    address: areaService.toKoreanAddress(r.AreaCode, r.address_detail),
    description: r.description,
    banner_html: r.banner_html,
    priority: r.priority as PrintZonePriorities,
    status: r.status as PrintZoneStatus,
    services: r.Services,
  };
}
