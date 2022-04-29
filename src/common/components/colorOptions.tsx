import Image from "next/image";
import {
  INearPrinter,
  IPrinterData,
  IPrinterDetail,
} from "../types/interfaces";

export default function ColorOptions(props: {
  printer?: IPrinterData;
  nearPrinter?: INearPrinter;
}) {
  if (
    (props.printer?.c && props.printer?.m) ||
    (props.nearPrinter?.priceColor != 0 && props.nearPrinter?.priceMono != 0)
  ) {
    return (
      <div className="flex font-semibold">
        <div className="flex items-center justify-between">
          <Image src="/Color.svg" width={16} height={16}></Image>
          <div className="ml-1">컬러 {props.nearPrinter?.priceColor}원</div>
        </div>
        <div className="ml-2 flex items-center justify-between ">
          <Image src="/mono.svg" width={16} height={16}></Image>
          <div className="ml-1">흑백 {props.nearPrinter?.priceMono}원</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="font-semibold">
        {props.printer?.c || props.nearPrinter.priceColor != 0 ? (
          <div className="flex items-center justify-between">
            <Image src="/Color.svg" width={16} height={16}></Image>
            <div className="ml-1">컬러 {props.nearPrinter.priceColor}원</div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <Image src="/mono.svg" width={16} height={16}></Image>
            <div className="ml-1">흑백 {props.nearPrinter.priceMono}원</div>
          </div>
        )}
      </div>
    );
  }
}
