
export interface IUserLoc {
  center: {
    lat: number;
    lng: number;
    x?: number;
    y?: number;
  };
}

export interface IPrinterData {
  config:any,
  data:any,
  headers:any,
  request:any,
  status:number,
  statusText:string,

} 