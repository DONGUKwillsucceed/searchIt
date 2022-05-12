import React from "react";
import { useState } from "react";
import { INearPrinter } from "../types/interfaces";
import { useRouter } from "next/router";
import ColorOptions from "./colorOptions";
import Link from "next/link";

export default function PrinterList(props: { nearbyPrinters: INearPrinter[] }) {
  const [dropDownActive, setDropDownActive] = useState<boolean>(false);
  const router = useRouter();

  let Locations: JSX.IntrinsicAttributes[] = [];
  for (let i = 0; i < props.nearbyPrinters.length; i++) {
    if (i < 5) {
      Locations.push(
        <Link href={`/printers/${props.nearbyPrinters[i].id}`}>
          <div
            key={props.nearbyPrinters[i].id}
            className="flex flex-col border-b-2 py-3 last:border-b-0"
          >
            <div className="font-bold">{props.nearbyPrinters[i].name}</div>
            <div className="flex text-sm font-semibold text-gray-500">
              <div className="text-primary mr-2">
                {props.nearbyPrinters[i].distance / 1000 > 1
                  ? Math.round(props.nearbyPrinters[i].distance / 10) / 100 +
                    "km"
                  : Math.round(props.nearbyPrinters[i].distance) + "m"}
              </div>
              <div>{props.nearbyPrinters[i].address}</div>
            </div>
            <div className="flex pt-2 text-xs text-gray-500">
              <ColorOptions nearPrinter={props.nearbyPrinters[i]} />
            </div>
          </div>
        </Link>
      );
    }
  }
  console.log(props.nearbyPrinters);
  return (
    <>
      <div
        className={` flex flex-col hover:cursor-pointer ${
          dropDownActive ? "" : "max-h-printerList overflow-hidden  md:max-h-96"
        }`}
      >
        {Locations}
      </div>
    </>
  );
}
