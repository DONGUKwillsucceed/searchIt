import { IPrinterData } from "../Interfaces";
import { MapMarker } from "react-kakao-maps-sdk";

export default function PrinterMarker(props: {
  printerData: IPrinterData[] | never[];
}) {
  const markerList = props.printerData.map((printer) => {
    return (
      <MapMarker
        key={printer.id}
        position={{ lat: printer.lat, lng: printer.lon }}
      ></MapMarker>
    );
  });
  return <>{<div>{markerList}</div>}</>;
}
