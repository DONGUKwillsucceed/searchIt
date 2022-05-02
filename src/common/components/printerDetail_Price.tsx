import Image from "next/image";
import { IPrinterDetail } from "../types/interfaces";

export default function PrinterDetail_Price(props: {
  printerDetail: IPrinterDetail;
}) {
  return (
    <>
      <div className="font-Suit mx-auto w-full">
        <div className="mb-1 flex w-full justify-between px-1 text-xs font-bold text-gray-500">
          <div>가격</div>
          <div>한 페이지 당</div>
        </div>
        <div className="flex w-full">
          {props.printerDetail.priceColor != 0 ? (
            <>
              <Box
                type={"흑백 인쇄"}
                price={props.printerDetail.priceMono}
                Image={"/mono.svg"}
              />
              <Box
                type={"컬러 인쇄"}
                price={props.printerDetail.priceColor}
                Image={"/color.svg"}
              />
            </>
          ) : (
            <Box
              single={true}
              type={"흑백 인쇄"}
              price={props.printerDetail.priceMono}
              Image={"/mono.svg"}
            />
          )}
        </div>

        <div className="my-2 flex w-full">
          <Box type={"스캔"} price={50}></Box>
          <Box type={"복사"} price={50}></Box>
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
}) {
  return (
    <div
      className={`bg-secondary flex flex-col items-center justify-between rounded-md py-2 px-3 ${
        props.single ? "w-full" : "mr-1 w-1/2"
      }  `}
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
