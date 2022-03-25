import { IPrinterData } from "../../src/Interfaces";
import { MapMarker } from "react-kakao-maps-sdk";
import FetchPrinterCoords from "../api/GetPrinterCoords";
import { useRouter } from "next/router";

export default function PrinterMarker() {
  const router = useRouter();
  const markerList = FetchPrinterCoords().map((printer) => {
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
          router.push(`/printers/${printer.id}`);
        }}
      ></MapMarker>
    );
  });
  return <>{<div>{markerList}</div>}</>;
}
