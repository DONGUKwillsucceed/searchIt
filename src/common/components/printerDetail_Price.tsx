import Image from "next/image";
import { IPrinterDetail } from "../types/interfaces";

export default function PrinterDetail_Price(props: {
  printerDetail: IPrinterDetail;
}) {
  return (
    <>
      <div className="font-Suit mx-auto w-10/12">
        <div className="mb-1 flex w-full justify-between text-xs font-bold text-gray-500">
          <div> 가격</div>
          <div> 한 페이지 당</div>
        </div>
        <div className="flex w-full">
          {props.printerDetail.priceColor != 0 ? (
            <>
              <div className="bg-secondary mr-1 flex h-10 w-1/2 items-center justify-between rounded-md px-3 ">
                <div className="flex items-center">
                  <Image src="/mono.svg" width={16} height={16} />
                </div>
                <div>{props.printerDetail.priceMono}원</div>
              </div>
              <div className="bg-secondary ml-1 flex h-10 w-1/2 items-center justify-between rounded-md px-3 ">
                <div className="flex items-center">
                  <Image src="/color.svg" width={16} height={16} />
                </div>
                <div>{props.printerDetail.priceColor}원</div>
              </div>
            </>
          ) : (
            <div className="bg-secondary mr-1 flex h-10 w-full items-center justify-between rounded-md px-3 ">
              <div className="flex items-center">
                <Image src="/mono.svg" width={16} height={16} />
              </div>
              <div>{props.printerDetail.priceMono}원</div>
            </div>
          )}
        </div>
      </div>
      ;
    </>
  );
}
