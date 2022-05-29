import Image from "next/image";
import { IPrinterDetail } from "../types/interfaces";

export default function PrinterDetail_Price(props: {
  printerDetail: IPrinterDetail;
}) {
  return (
    <>
      <div className="font-Suit my-4 mx-auto w-full">
        <div className="mb-1 flex w-full items-center justify-between font-semibold">
          <div className="text-sm text-gray-500">인쇄 가격</div>
          <div className="flex items-center text-xs">
            <div className=" mr-4 text-gray-400">용지 사이즈</div>
            <button className="flex items-center rounded-md border-2 px-3 py-2">
              <div className="mr-2">A4</div>
              <Image
                src="/dropDownArrow.svg"
                className="rotate-180"
                width={12}
                height={8}
              ></Image>
            </button>
          </div>
        </div>
        <div className="mb-4 flex w-full flex-col">
          <div className=" mb-2 text-xs  font-semibold text-gray-500">
            단면 · 한 페이지 당
          </div>
          {props.printerDetail.priceColor != 0 ? (
            <>
              <div className="flex">
                <Box
                  type={"흑백 인쇄"}
                  price={props.printerDetail.priceMono}
                  Image={"/mono.svg"}
                />
                <Box
                  type={"컬러 인쇄"}
                  price={props.printerDetail.priceColor}
                  Image={"/color.svg"}
                  second={true}
                />
              </div>
            </>
          ) : (
            <Box
              single={true}
              type={"흑백 인쇄"}
              price={props.printerDetail.priceMono}
              Image={"/mono.svg"}
              second={true}
            />
          )}
        </div>

        <div className="flex w-full">
          <Box type={"스캔"} price={50}></Box>
          <Box type={"복사"} price={50} second={true}></Box>
        </div>
      </div>
    </>
  );
}

export function Box(props: {
  single?: boolean;
  type?: string;
  price?: number;
  Image?: string;
  second?: boolean;
}) {
  return (
    <div
      className={`bg-secondary flex flex-col items-center justify-between rounded-md p-3 ${
        props.single ? "w-full" : "w-1/2"
      }  ${props.second ? "" : "mr-2"}`}
    >
      <div className="flex w-full text-xs">
        {props.Image ? (
          <Image src={`${props.Image}`} width={16} height={16} />
        ) : null}
        <div className="ml-2">{props.type}</div>
      </div>
      <div className="grid w-full justify-items-end">{props.price}원</div>
    </div>
  );
}
