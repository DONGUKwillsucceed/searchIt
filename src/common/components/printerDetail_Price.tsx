import Image from "next/image";
import { Iservices } from "../types/interfaces";
import { useEffect, useState, useRef } from "react";
import PaperSizeDropDown from "./paperSizeDropDown";

export default function PrinterDetail_Price(props: {
  services: Iservices[];
  serviceType: string;
  showPaperSizeId: string;
  hasMono: boolean;
  hasColor: boolean;
}) {
  const isDouble = useRef(false);
  const isDuplex = useRef(false);
  const serviceTypeAmount = useRef(0);
  const [displayPrice, setDisplayPrice] = useState<(JSX.Element | undefined)[]>(
    []
  );
  const [displayDuplexPrice, setDisplayDuplexPrice] = useState<
    (JSX.Element | undefined)[]
  >([]);

  useEffect(() => {
    props.services.map((service) => {
      if (
        service.PaperSize_id === props.showPaperSizeId &&
        service.ServiceType.type === props.serviceType
      ) {
        serviceTypeAmount.current += 1;
        if (service.price_duplex_explicit) {
          isDuplex.current = true;
        }
      }
    });
    if (serviceTypeAmount.current >= 2) {
      console.log("tru!");
      isDouble.current = true;
    }

    const list = props.services.map((service) => {
      if (
        service.PaperSize_id === props.showPaperSizeId &&
        service.ServiceType.type === props.serviceType
      ) {
        if (service.ServiceType.type === "스캔") {
          return (
            <Box
              key={service.id}
              double={isDouble.current}
              type={service.ServiceType.type}
              price={service.price}
            />
          );
        }
        return (
          <Box
            key={service.id}
            colorType={service.color_type}
            double={isDouble.current}
            type={service.ServiceType.type}
            Image={`/${service.color_type}.svg`}
            price={service.price}
          />
        );
      }
    });

    const duplexList = props.services.map((service) => {
      if (
        service.PaperSize_id === props.showPaperSizeId &&
        service.ServiceType.type === props.serviceType &&
        isDuplex.current
      ) {
        return (
          <Box
            key={service.id}
            colorType={service.color_type}
            double={isDouble.current}
            type={service.ServiceType.type}
            Image={`/${service.color_type}.svg`}
            price={service.price_duplex_explicit}
          />
        );
      }
    });

    setDisplayPrice(list);
    setDisplayDuplexPrice(duplexList);
  }, []);

  if (serviceTypeAmount.current >= 1) {
    return (
      <>
        <div className="font-Suit mb-1 flex w-full items-center justify-between font-semibold">
          <div className="text-sm text-gray-500">{props.serviceType} 가격</div>
        </div>
        <div className="font-Suit my-4 flex w-full flex-col">
          <div className=" mb-2 text-xs  font-semibold text-gray-500">
            단면 · 한 페이지 당
          </div>
          <div className="flex">{displayPrice}</div>
          {props.serviceType === "인쇄" && isDuplex.current === true && (
            <div>
              <div className=" my-2 text-xs  font-semibold text-gray-500">
                양면 · 두 페이지 당
              </div>
              <div className="flex">{displayDuplexPrice}</div>
            </div>
          )}
        </div>
      </>
    );
  }
  return null;
}

export function Box(props: {
  double?: boolean;
  colorType?: string;
  type?: string;
  price?: number;
  Image?: string;
}) {
  return (
    <div
      className={`bg-secondary flex flex-col items-center justify-between rounded-md p-3 ${
        props.double ? "mr-2 w-1/2" : "w-full"
      }`}
    >
      <div className="flex w-full text-xs">
        {props.Image ? (
          <Image src={`${props.Image}`} width={16} height={16} />
        ) : null}
        <div className="ml-2">
          {props.colorType ? (
            <div>{`${props.colorType == "color" ? "컬러" : "흑백"} ${
              props.type
            }`}</div>
          ) : (
            props.type + " 가격"
          )}
        </div>
      </div>
      <div className="grid w-full justify-items-end">
        {props.price || "0"}원
      </div>
    </div>
  );
}
