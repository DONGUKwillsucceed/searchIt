import { IPrinterData } from "../../Interfaces";
import { MapMarker } from "react-kakao-maps-sdk";
import colorMapPin from "../../Images/colorMapPin.svg";
import monoMapPin from "../../Images/monoMapPin.svg";

export default function PrinterMarker(props: {
  printerData: IPrinterData[] | never[];
}) {
  const markerList = props.printerData.map((printer) => {
    const mapPin = printer.c === true ? colorMapPin : monoMapPin;
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
      ></MapMarker>
    );
  });
  return <>{<div>{markerList}</div>}</>;
}
