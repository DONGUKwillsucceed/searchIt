import React from "react";
import downArrow from "../../../public/downArrow.svg";
import mono from "../../../public/mono.svg";
import color from "../../../public/color.svg";
import { useEffect, useState } from "react";
import { INearPrinter, IUserLoc } from "../types/Interfaces";
import { useRouter } from "next/router";
import Image from "next/image";

export default function PrinterList(props: {
  loc: IUserLoc | undefined;
  nearbyPrinters: INearPrinter[];
}) {
  const [dropDownActive, setDropDownActive] = useState<boolean>(false);
  const router = useRouter();

  const Locations: JSX.IntrinsicAttributes[] = props.nearbyPrinters.map(
    (printer) => {
      return (
        <div
          key={printer.id}
          onClick={() => {
            router.push(`/printers/main/${printer.id}`);
          }}
        >
          <div className="mr-2 mb-2 h-full snap-start justify-center rounded-sm border-b-2">
            <div className="flex">
              <div className="my-5 ml-1 mr-4 flex w-6 items-center justify-center rounded-md">
                {printer.priceColor != 0 ? (
                  <Image src={color} className="h-6 w-6" />
                ) : (
                  <Image src={mono} className="h-6 w-6" />
                )}
              </div>
              <div className="flex w-full flex-row items-center justify-between ">
                <div className="ml-2 flex h-full flex-col justify-between py-2">
                  <div>{printer.name}</div>
                  <div className="flex">
                    <div className="text-primary pr-2 text-xs">
                      {printer.distance / 1000 > 1
                        ? Math.round(printer.distance / 10) / 100 + "km"
                        : Math.round(printer.distance) + "m"}
                    </div>
                    <div className="text-xs text-gray-400">
                      {printer.address}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  );
  return (
    <>
      {dropDownActive === false ? (
        <div
          className="max-h-printerList flex flex-col overflow-hidden hover:cursor-pointer md:max-h-96"
          id="slider"
        >
          {Locations}
        </div>
      ) : (
        <div className="flex flex-col hover:cursor-pointer" id="slider">
          {Locations}
        </div>
      )}
      {Locations.length > 9 ? (
        <div>
          <button
            onClick={() => setDropDownActive(!dropDownActive)}
            className="flex w-full flex-col items-center justify-center"
          >
            <div className="font-Suit text-xs text-gray-800">
              {dropDownActive ? "접기" : "전체 보기"}
            </div>
            <div>
              {dropDownActive ? (
                <Image src={downArrow} className="mt-1 rotate-180" />
              ) : (
                <Image src={downArrow} />
              )}
            </div>
          </button>
        </div>
      ) : null}
    </>
  );
}
