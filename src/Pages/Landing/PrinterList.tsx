import downArrow from "../../Images/downArrow.svg";
import mono from "../../Images/Mono.svg";
import color from "../../Images/Color.svg";
import { useEffect, useState } from "react";
import { FetchPrinterData } from "../../API/PrinterInfo";
import { IPrinterData } from "../../Interfaces";

export default function PrinterList() {
  // let Locations: JSX.IntrinsicAttributes[] = [];
  const testAmount = 20;

  const [dropDownActive, setDropDownActive] = useState<boolean>(false);
  const [printerData, setPrinterData] = useState<IPrinterData[] | never[]>([]);

  useEffect(() => {
    async function getPrinterData() {
      const res = await FetchPrinterData();
      setPrinterData(res);
    }

    getPrinterData();
  });

  const Locations: JSX.IntrinsicAttributes[] = printerData.map((printer) => {
    return (
      <div
        key={printer.id}
        onClick={() => {
          console.log(printer.id);
        }}
      >
        <div className="mr-2 mb-2 h-full snap-start justify-center rounded-sm border-b-2">
          <div className="flex">
            <div className="my-5 ml-1 mr-4 flex w-6 items-center justify-center rounded-md">
              {printer.c ? (
                <img src={color} className="h-6 w-6" />
              ) : (
                <img src={mono} className="h-6 w-6" />
              )}
            </div>
            <div className="flex w-full flex-row items-center justify-between ">
              <div className="ml-2 flex h-full flex-col justify-between py-2">
                <div>{printer.name}</div>
                <div className="flex">
                  <div className="text-primary pr-2 text-xs">거리</div>
                  <div className="text-xs text-gray-400"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return (
    <>
      <div className=" font-Suit h-fit  w-full rounded-md p-4 text-lg font-bold">
        <div className="mb-3 flex w-full items-center justify-between">
          <div className="mb-1 text-lg font-bold">내 주변 프린터</div>
          <div className="bg-primary-light text-primary rounded-md py-1 px-3 text-sm hover:bg-blue-200"></div>
        </div>

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
                  <img src={downArrow} className="mt-1 rotate-180" />
                ) : (
                  <img src={downArrow} />
                )}
              </div>
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
}
