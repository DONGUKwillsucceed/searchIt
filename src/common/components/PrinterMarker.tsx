import { IPrinterData } from "../types/Interfaces";
import { MapMarker } from "react-kakao-maps-sdk";
import FetchPrinterCoords from "../api/GetPrinterCoords";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PrinterMarker() {
  const router = useRouter();
  const [printer, setPrinter] = useState<IPrinterData[]>([]);

  useEffect(() => {
    const fetchPrinterCoords = async () => {
      const data = await FetchPrinterCoords();
      setPrinter(data);
    };
    fetchPrinterCoords();
  }, []);

  return (
    <>
      {printer.map((locations: IPrinterData) => (
        <MapMarker
          image={{
            src: locations.c === true ? "/colorMapPin.svg" : "/monoMapPin.svg",
            size: {
              width: 38,
              height: 45,
            },
          }}
          key={locations.id}
          position={{ lat: locations.lat, lng: locations.lon }}
          onClick={() => {
            router.push(`printers/${locations.id}`);
          }}
        ></MapMarker>
      ))}
    </>
  );
}
