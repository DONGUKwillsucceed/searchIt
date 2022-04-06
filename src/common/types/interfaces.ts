export interface IUserLoc {
  center: {
    lat: number;
    lng: number;
    x?: number;
    y?: number;
  };
  hasChangedCenter?: boolean;
  hasAllowedGeo?: boolean;
  defaultLevel?: number;
}

export interface ISlider {
  top: number;
  left: number;
  x: number;
  y: number;
}

export interface IDistanceOptions {
  option: string;
}

export interface IPrinterDetail {
  address: string;
  agentVersion?: string;
  coordinates?: {
    latitue?: number;
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
  name: string;
  stat: string;
}

export interface IMousePosition {
  lat: number;
  lng: number;
}
