import {
  AreaCode,
  Images,
  PaperSizes,
  PaperTypes,
  PrintZones,
  PrintZone_Image,
  PrintZone_Tag,
  Services,
  ServiceType,
  Tag,
} from "@prisma/client";
import { PrintZonePriorities } from "../../../types/PrintZonePriorities";
import { PrintZoneStatus } from "../../../types/PrintZoneStatus";
import { areaService } from "../../Area.service";

export const pzFullQueryIncludeProps = {
  AreaCode: true,
  PrintZone_Tag: {
    include: {
      Tag: true,
    },
  },
  PrintZone_Image: {
    include: {
      Images: true,
    },
  },
  Services: {
    include: {
      PaperSizes: true,
      PaperTypes: true,
      ServiceType: true,
    },
  },
};
export type pzFullQueryResult = PrintZones & {
  PrintZone_Tag: (PrintZone_Tag & {
    Tag: Tag;
  })[];
  AreaCode: AreaCode;
  PrintZone_Image: (PrintZone_Image & {
    Images: Images;
  })[];
  Services: (Services & {
    PaperSizes: PaperSizes;
    PaperTypes: PaperTypes;
    ServiceType: ServiceType;
  })[];
};
export function pzFullQueryResultToDto(r: pzFullQueryResult) {
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
      tags: r.PrintZone_Tag.map((pz_t) => pz_t.Tag),
      images: r.PrintZone_Image.map((pz_im) => pz_im.Images),
      services: r.Services,
    };
  }