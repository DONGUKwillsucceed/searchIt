import { Images, Tag } from "@prisma/client";
import { PrintZonePriorities } from "../types/PrintZonePriorities";
import { PrintZoneStatus } from "../types/PrintZoneStatus";

export interface PrintZoneDto {
  id: string;
  created_at: Date;
  updated_at: Date;
  company: string;
  latitude: number;
  longitude: number;
  phone_number: string | null;
  address: string;
  description: string;
  banner_html: string | null;
  priority: PrintZonePriorities;
  status: PrintZoneStatus;
  tags: Tag[];
  images: Images[];
}
