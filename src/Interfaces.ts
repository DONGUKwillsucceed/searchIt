export interface IUserLoc {
  center: {
    lat: number;
    lng: number;
    x?: number;
    y?: number;
  };
  changedCenter: boolean;
}

export interface IPrinterData {
  c: boolean;
  id: string;
  lat: number;
  lon: number;
  name: string;
  stat: string;
}
