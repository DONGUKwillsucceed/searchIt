import { IMapMarker, IPrinterData } from "../types/interfaces";
import { MapMarker } from "react-kakao-maps-sdk";
import getPrinterCoords from "../api/getPrinterCoords";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PrinterMarker(props: { locations: IMapMarker[] }) {
  const router = useRouter();

  function colorType(colorType: IMapMarker) {
    if (colorType.color.color && colorType.color.mono) {
      return "bothColorMapPin.svg";
    } else if (colorType.color.color) {
      return "colorMapPin.svg";
    } else {
      return "monoMapPin.svg";
    }
  }

  return (
    <>
      {props.locations.map((locations) => (
        <MapMarker
          image={{
            src: colorType(locations),
            size: {
              width: 38,
              height: 45,
            },
          }}
          key={locations.id}
          position={{ lat: locations.latitude, lng: locations.longitude }}
          onClick={() => {
            router.push(`printers/${locations.id}`);
          }}
        ></MapMarker>
      ))}
    </>
  );
}
