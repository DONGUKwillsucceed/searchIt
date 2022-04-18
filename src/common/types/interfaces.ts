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
  id: string;
  name: string;
  address: string;
  description: string;
  agentVersion: string;
  lastConnectedAt: string;
  imageURL: string;
  status: string;
  workHour: string;
  priceMono: number;
  priceColor: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  maintainterID: string;
  printerId: string;
  distance: number;
}

export interface IPrinterData {
  c: boolean;
  id: string;
  lat: number;
  lon: number;
  m: boolean;
  name: string;
  stat: string;
}

export interface IMousePosition {
  lat: number;
  lng: number;
}

export interface Areas {
  서울시: string[];
  부산시: string[];
  인천시: string[];
  대구시: string[];
  광주시: string[];
  대전시: string[];
  울산시: string[];
  세종시: string[];
  경기도: string[];
  강원도: string[];
  충청북도: string[];
  충청남도: string[];
  경상북도: string[];
  경상남도: string[];
  전라북도: string[];
  전라남도: string[];
  제주도: string[];
}
