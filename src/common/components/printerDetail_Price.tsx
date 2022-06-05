import Image from "next/image";
import { Iservices } from "../types/interfaces";
import { useEffect, useState, useRef } from "react";
import { PriceBox } from "./priceBox";
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

  console.log(props.serviceType, serviceTypeAmount.current);
  useEffect(() => {
    serviceTypeAmount.current = 0;
    isDouble.current = false;
    isDuplex.current = false;

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
            <PriceBox
              key={service.id}
              double={isDouble.current}
              type={service.ServiceType.type}
              price={service.price}
            />
          );
        }
        return (
          <PriceBox
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
          <PriceBox
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
  }, [props.showPaperSizeId]);

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
