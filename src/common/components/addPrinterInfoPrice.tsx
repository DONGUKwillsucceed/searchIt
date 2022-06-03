import { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
export default function FixPrinterInfoPrice(props: {
  fixType: string;
  setPrice: Dispatch<SetStateAction<string>>;
  price?: number;
  colorType: string;
}) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [price, setPrice] = useState<string>();

  useEffect(() => {
    console.log("isActive: ", isActive);
    if (isActive === false) {
      props.setPrice("");
    }
  }, [isActive]);

  return (
    <div className="flex w-full flex-col space-y-3">
      <div className="flex space-x-3">
        <button
          className={`${
            isActive ? "bg-primary" : "bg-gray-200"
          } flex items-center rounded-sm p-1 `}
          onClick={() => setIsActive(!isActive)}
        >
          <Image src={"/check.svg"} width={10} height={10}></Image>
        </button>

        {props.colorType === "color" ? (
          <div className="flex space-x-2">
            <Image src="/color.svg" width={16} height={16}></Image>
            <div className="text-sm">컬러 {props.fixType}</div>
          </div>
        ) : (
          <div className="flex space-x-2">
            <Image src="/Mono.svg" width={16} height={16}></Image>
            <div className="text-sm">흑백 {props.fixType}</div>
          </div>
        )}
      </div>

      <input
        placeholder={"1 페이지 당 가격"}
        className="w-full rounded-md bg-gray-100 p-2 text-sm"
        type="number"
        disabled={!isActive}
        onChange={(e) => {
          props.setPrice(e.target.value);
        }}
      ></input>
    </div>
  );
}
