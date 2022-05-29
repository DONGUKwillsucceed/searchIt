import path from 'path';
import { ColorType } from '../types/ColorType';
import { ServiceProposeStatus } from '../types/ServiceProposeStatus';

interface PrintZoneCreateDto {
  company: string;
  latitude: number;
  longitude: number;
  phone_number?: string;
  area_code: number;
  address_detail: string;
  description?: string;
  tags: string[]; // sanitize 해야 함
  services: ServiceCreateDto[];
};


interface ServiceCreateDto {
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
  price: number;
  price_duplex_explicit?: number;
  proposed_reply: string;
  status: ServiceProposeStatus;
}