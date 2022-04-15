import Image from "next/image";
import { IPrinterData } from "../types/interfaces";

export default function ColorOptions(props: { printer: IPrinterData }) {
  if (props.printer.c && props.printer.m) {
    return (
      <div className="flex">
        <div className="flex items-center justify-between">
          <Image src="/Color.svg" width={16} height={16}></Image>
          <div className="ml-1">Price</div>
        </div>
        <div className="ml-2 flex items-center justify-between ">
          <Image src="/mono.svg" width={16} height={16}></Image>
          <div className="ml-1">Price</div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="flex items-center justify-between">
          {props.printer.c ? (
            <Image src="/Color.svg" width={16} height={16}></Image>
          ) : (
            <Image src="/mono.svg" width={16} height={16}></Image>
          )}
          <div className="ml-1">Price</div>
        </div>
      </div>
    );
  }
}
