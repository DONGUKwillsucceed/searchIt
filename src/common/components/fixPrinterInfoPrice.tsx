import { useState } from "react";
import Image from "next/image";
export default function FixPrinterInfoPrice(props: {
  fixType: string;
  price?: number;
  colorType: string;
}) {
  const [willChange, setHasMono] = useState<boolean>(false);

  return (
    <div className="flex w-full flex-col space-y-3">
      <div className="flex space-x-3">
        <button
          className={`${
            willChange ? "bg-primary" : "bg-gray-200"
          } flex items-center rounded-sm p-1 `}
          onClick={() => setHasMono(!willChange)}
        >
          <Image src={"/check.svg"} width={10} height={10}></Image>
        </button>

        {props.colorType === "color" ? (
          <div className="flex space-x-2">
            <Image src="/color.svg" width={12} height={12}></Image>
            <div className="text-sm">컬러 {props.fixType}</div>
          </div>
        ) : (
          <div className="flex space-x-2">
            <Image src="/Mono.svg" width={12} height={12}></Image>
            <div className="text-sm">흑백 {props.fixType}</div>
          </div>
        )}
      </div>

      <input
        placeholder={props?.price ? props.price.toString() + "원" : "입력 가격"}
        className="w-full rounded-md bg-gray-100 p-2 text-sm"
        type="number"
        disabled={!willChange}
      ></input>
      <div className="my-4 text-xs text-gray-500">
        기존 가격: {props?.price}원
      </div>
    </div>
  );
}
