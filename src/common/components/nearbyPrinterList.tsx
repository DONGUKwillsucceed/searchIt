import React from "react";
import { INearPrinter } from "../types/interfaces";
import ColorOptions from "./colorOptions";
import Link from "next/link";

export default function NearbyPrinterList(props: { printer: INearPrinter }) {
  console.log("NearbyPrinter = ", props.printer);
  // let Locations: JSX.IntrinsicAttributes[] = [];
  // for (let i = 0; i < props.printer.length; i++) {
  //   if (i < 5) {
  //     Locations.push(
  //       <Link
  //         key={props.printer[i].id}
  //         href={`/printers/${props.printer[i].id}`}
  //       >
  //         <div className="flex flex-col border-b-2 py-3 last:border-b-0">
  //           <div className="font-bold">{props.printer[i].company}</div>
  //           <div className="flex text-sm font-semibold text-gray-500">
  //             <div className="text-primary mr-2">
  //               {props.printer[i].distance / 1000 > 1
  //                 ? Math.round(props.printer[i].distance / 10) / 100 + "km"
  //                 : Math.round(props.printer[i].distance) + "m"}
  //             </div>
  //             <div>{props.printer[i].address_detail}</div>
  //           </div>
  //           <div className="flex pt-2 text-xs text-gray-500">
  //             {/* <ColorOptions services={props.nearbyPrinters[i].services} /> */}
  //           </div>
  //         </div>
  //       </Link>
  //     );
  //   }
  // }
  return (
    <>
      <Link key={props.printer.id} href={`/printers/${props.printer.id}`}>
        <div className="flex flex-col border-b-2 py-3 last:border-b-0">
          <div className="font-bold">{props.printer.company}</div>
          <div className="flex text-sm font-semibold text-gray-500">
            <div className="text-primary mr-2">
              {props.printer.distance > 1
                ? Math.round(props.printer.distance * 10) / 10 + "km"
                : Math.round(props.printer.distance * 1000) + "m"}
            </div>
            <div>{props.printer.address_detail}</div>
          </div>
          <div className="flex pt-2 text-xs text-gray-500">
            {/* <ColorOptions services={props.nearbyPrinters[i].services} /> */}
          </div>
        </div>
      </Link>
    </>
  );
}
