import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import FixPrinterInfoPrice from "./addPrinterInfoPrice";

export default function AddPrinterInfo(props: {
  fixType: string;
  setColorPrice: Dispatch<SetStateAction<string>>;
  setMonoPrice: Dispatch<SetStateAction<string>>;
  isDuplex?: boolean;
  priceMono?: number;
  priceColor?: number;
}) {
  return (
    <div className="mb-1 bg-white">
      {props.isDuplex ? (
        <div className="my-4 text-xs text-gray-500">양면 · 한 페이지 당</div>
      ) : (
        <div className="my-4 text-xs text-gray-500">단면 · 한 페이지 당</div>
      )}
      <div className="flex justify-between space-x-4">
        <FixPrinterInfoPrice
          fixType={props.fixType}
          colorType="mono"
          price={props?.priceMono}
          setPrice={props.setMonoPrice}
        ></FixPrinterInfoPrice>

        <FixPrinterInfoPrice
          fixType={props.fixType}
          colorType="color"
          price={props?.priceColor}
          setPrice={props.setColorPrice}
        ></FixPrinterInfoPrice>
      </div>
    </div>
  );
}
