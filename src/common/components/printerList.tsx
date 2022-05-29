import React from "react";
import { INearPrinter } from "../types/interfaces";
import ColorOptions from "./colorOptions";
import Link from "next/link";

export default function PrinterList(props: { nearbyPrinters: INearPrinter[] }) {

  let Locations: JSX.IntrinsicAttributes[] = [];
  for (let i = 0; i < props.nearbyPrinters.length; i++) {
    if (i < 5) {
      Locations.push(
        <Link
          key={props.nearbyPrinters[i].id}
          href={`/printers/${props.nearbyPrinters[i].id}`}
        >
          <div className="flex flex-col border-b-2 py-3 last:border-b-0">
            <div className="font-bold">{props.nearbyPrinters[i].company}</div>
            <div className="flex text-sm font-semibold text-gray-500">
              <div className="text-primary mr-2">
                {props.nearbyPrinters[i].distance / 1000 > 1
                  ? Math.round(props.nearbyPrinters[i].distance / 10) / 100 +
                    "km"
                  : Math.round(props.nearbyPrinters[i].distance) + "m"}
              </div>
              <div>{props.nearbyPrinters[i].address_detail}</div>
            </div>
            <div className="flex pt-2 text-xs text-gray-500">
              <ColorOptions nearPrinter={props.nearbyPrinters[i]} />
            </div>
          </div>
        </Link>
      );
    }
  }
  return (
    <>
      <div
        className={` max-h-printerList flex flex-col overflow-hidden hover:cursor-pointer  md:max-h-96`}
      >
        {Locations}
      </div>
    </>
  );
}
