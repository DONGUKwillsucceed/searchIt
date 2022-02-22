import { IPrinterData } from "../Interfaces";
import { MapMarker } from "react-kakao-maps-sdk";
import mapPin from "../Images/map-pin.png";

export default function PrinterMarker(props: {
  printerData: IPrinterData[] | never[];
}) {
  const markerList = props.printerData.map((printer) => {
    return (
      <MapMarker
        image={{
          src: mapPin,
          size: {
            width: 32,
            height: 36.5,
          },
        }}
        key={printer.id}
        position={{ lat: printer.lat, lng: printer.lon }}
      ></MapMarker>
    );
  });
  return <>{<div>{markerList}</div>}</>;
}
