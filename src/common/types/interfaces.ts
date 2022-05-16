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
  agentVersion?: string;
  coordinate?: {
    latitude?: number;
    longitude?: number;
  };

  description?: string;
  id: string;
  imageUrl?: string;
  lastConnectedAt?: string;
  maintainer?: {
    gmail?: string;
    id?: string;
    name?: string;
    phoneNumber?: string;
  };
  name: string;
  priceColor?: number;
  priceMono?: number;
  printer: {
    duplex?: boolean;
    id?: string;
    name?: string;
    ppm?: number;
    imageUrl?: string;
    resolution?: string;
  };
  status?: string;
  workHour?: string;
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
