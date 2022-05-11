import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import FixPrinterInfoPrice from "./fixPrinterInfoPrice";

export default function FixPrinterInfo(props: {
  fixIndex: number;
  fixType: string;
  remove: (id: number) => void;
  priceMono?: number;
  priceColor?: number;
}) {
  return (
    <div className="mb-1 bg-white p-4">
      <div className="my-4 text-sm">{props.fixType} 가격</div>
      <div className="my-4 flex w-full items-center justify-between">
        <div className="text-xs text-gray-500">용지 사이즈</div>
        <button className="flex items-center rounded-md border-2 px-3 py-2">
          <div className="mr-2 text-xs">A4</div>
          <Image
            src="/dropDownArrow.svg"
            className="rotate-180"
            width={12}
            height={8}
          ></Image>
        </button>
      </div>
      <div className="my-4 text-xs text-gray-500">단면 · 한 페이지 당</div>
      <div className="flex justify-between space-x-4">
        <FixPrinterInfoPrice
          fixType={props.fixType}
          colorType="mono"
          price={props?.priceMono}
        ></FixPrinterInfoPrice>
        <FixPrinterInfoPrice
          fixType={props.fixType}
          colorType="color"
          price={props?.priceColor}
        ></FixPrinterInfoPrice>
      </div>

      <button
        className="flex w-full flex-row-reverse text-xs  text-red-500"
        onClick={() => props.remove(props.fixIndex)}
      >
        가격 정보 삭제
      </button>
    </div>
  );
}
