import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import AddPrinterInfo from "./addPrinterInfo";

export default function AddFixInfo(props: {
  fixType: string;
  fixList: JSX.Element[];
  setFixList: Dispatch<SetStateAction<JSX.Element[]>>;
  priceMono?: number;
  priceColor?: number;
}) {
  function removeItem(index: number) {
    console.log("index: ", index);
    console.log("fixList ", props.fixList);
    console.log("affter", props.fixList.splice(index - 1, 1));
    // props.setFixList(props.fixList.splice(index, 1));
  }
  const [monoPrice, setMonoPrice] = useState('');
  const [colorPrice, setColorPrice] = useState('');

  return (
    <button
      className="my-1 flex w-full items-center space-x-2 bg-white p-4 text-sm font-semibold text-gray-500"
      onClick={() => {
        props.setFixList([
          ...props.fixList,
          <AddPrinterInfo
            key={props.fixList.length + 1}
            fixType={props.fixType}
            setColorPrice={setColorPrice}
            setMonoPrice={setMonoPrice}
            priceMono={props?.priceMono}
            priceColor={props?.priceColor}
          />,
        ]);
      }}
    >
      <Image src="/add.svg" width={24} height={24}></Image>
      <div>{props.fixType} 가격 추가</div>
    </button>
  );
}
