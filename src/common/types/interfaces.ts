export interface IUserLoc {
  center: {
    lat: number;
    lng: number;
  };
}
export interface mapView {
  center: {
    lat: number;
    lng: number;
  };
  viewLevel?: number;
  hasChangedCenter?: boolean;
  hasAllowedGeo?: boolean;
}

export interface ISlider {
  top: number;
  left: number;
}

export interface IDistanceOptions {
  option: string;
}

export interface IPrinterDetail {
  address: string;
  banner_html: string;
  company: string;
  created_at: string;
  description: string;
  id: string;
  images: string[];
  latitude: number;
  longitude: number;
  phone_number: string;
  priority: string;
  services: Iservices[];
  status: string;
  tags: Array<{
    TagType_id: string;
    created_at: string;
    id: string;
    search_engine_expose: number;
    value: string;
    weight: number;
  }>;
  updated_at: string;
}
export interface Iservices {
  PaperSize_id: string;
  PaperSizes: {
    created_at: string;
    description: string;
    id: string;
    name: string;
    name_en: string;
    updated_at: string;
  };
  paperType_id: string;
  paperTypes: {
    created_at: string;
    description: string;
    id: string;
    paper: string;
    paper_en: string;
    updated_at: string;
  };
  PrintZone_id: string;
  ServiceType: {
    created_at: string;
    description: string;
    id: string;
    type: string;
    type_en: string;
    updated_at: string;
  };
  ServiceType_id: string;
  color_type: string;
  created_at: string;
  id: string;
  price: number;
  price_duplex_explicit: number;
  proposed_reply: string;
  status: string;
  updated_at: string;
}

export interface INearPrinter {
  AreaCode_id: string;
  address_detail: string;
  banner_html: null;
  company: string;
  created_at: string;
  description: string;
  distance: number;
  id: string;
  latitude: number;
  longitude: number;
  phone_number: string;
  priority: string;
  services: Iservices[];
  status: string;
  updated_at: string;
  writer_ip: string;
}

export interface IPrinterData {
  AreaCode_id: string;
  address_detail: string;
  company: string;
  created_at: string;
  id: string;
  latitude: number;
  longitude: number;
  priority: string;
  status: string;
  updated_at: string;
}

export interface IMousePosition {
  lat: number;
  lng: number;
}
export interface UniList {
  count: number;
  id: string;
  university: string;
}

export interface INoticeEvent {
  created_at: string;
  id: string;
  title: string;
  type: string;
}

export interface IArea {
  id: string;
  ko_area_1: string;
  ko_area_2: string;
  ko_area_3: string;
  en_area_1: string;
  en_area_2: string;
  en_area_3: string;
  en_area_4: string;
}
