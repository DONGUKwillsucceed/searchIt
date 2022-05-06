import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import FixPrinterInfo from "./fixPrinterInfo";

export default function AddFixInfo(props: {
  fixType: string;
  fixList: JSX.Element[];
  setFixList: Dispatch<SetStateAction<JSX.Element[]>>;
  priceMono?: number;
  priceColor?: number;
}) {
  return (
    <button
      className="my-1 flex w-full items-center space-x-2 bg-white p-4 text-sm font-semibold text-gray-500"
      onClick={() => {
        let newList = [...props.fixList];
        newList.push(
          <FixPrinterInfo
            key={newList.length + 1}
            fixType={props.fixType}
            priceMono={props?.priceMono}
            priceColor={props?.priceColor}
          ></FixPrinterInfo>
        );
        props.setFixList(newList);
      }}
    >
      <Image src="/add.svg" width={24} height={24}></Image>
      <div>{props.fixType} 가격 추가</div>
    </button>
  );
}
