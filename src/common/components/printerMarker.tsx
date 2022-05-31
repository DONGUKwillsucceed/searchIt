import { IPrinterData } from "../types/interfaces";
import { MapMarker } from "react-kakao-maps-sdk";
import getPrinterCoords from "../api/getPrinterCoords";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PrinterMarker() {
  const router = useRouter();
  const [printer, setPrinter] = useState([]);

  useEffect(() => {
    const fetchPrinterCoords = async () => {
      const data = await getPrinterCoords();
      setPrinter(data);
    };
    fetchPrinterCoords();
  }, []);

  return (
    <>
      {printer.map(
        (locations: { c: boolean; id: number; lat: number; lon: number }) => (
          <MapMarker
            image={{
              src:
                locations.c === true ? "/colorMapPin.svg" : "/monoMapPin.svg",
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
        )
      )}
    </>
  );
}
