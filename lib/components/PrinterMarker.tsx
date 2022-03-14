import { IPrinterData } from "../../src/Interfaces";
import { MapMarker } from "react-kakao-maps-sdk";
import GetPrinterCoords from "../functions/GetPrinterCoords";

export default function PrinterMarker() {
  const markerList = GetPrinterCoords().map((printer) => {
    const mapPin = printer.c === true ? "/colorMapPin.svg" : "/monoMapPin.svg";
    return (
      <MapMarker
        image={{
          src: mapPin,
          size: {
            width: 38,
            height: 45,
          },
        }}
        key={printer.id}
        position={{ lat: printer.lat, lng: printer.lon }}
        onClick={() => {
          console.log(printer.id);
        }}
      ></MapMarker>
    );
  });
  return <>{<div>{markerList}</div>}</>;
}
