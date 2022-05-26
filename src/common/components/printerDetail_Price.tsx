import Image from "next/image";
import { Iservices } from "../types/interfaces";
import { useEffect, useState, useRef } from "react";

export default function PrinterDetail_Price(props: {
  services: Iservices[];
  serviceType: string;
  showPaperSizeId: string;
  hasMono: boolean;
  hasColor: boolean;
}) {
  const isDouble = useRef(false);
  const isDuplex = useRef(false);
  const [displayPrice, setDisplayPrice] = useState<(JSX.Element | undefined)[]>(
    []
  );
  const [displayDuplexPrice, setDisplayDuplexPrice] = useState<
    (JSX.Element | undefined)[]
  >([]);

  useEffect(() => {
    const serviceAmount = props.services.map((service) => {
      if (
        service.PaperSize_id === props.showPaperSizeId &&
        service.ServiceType.type === props.serviceType
      ) {
        if (service.price_duplex_explicit) {
          isDuplex.current = true;
        }
      }
    });
    if (serviceAmount.length > 1) {
      isDouble.current = true;
    }

    const list = props.services.map((service) => {
      if (
        service.PaperSize_id === props.showPaperSizeId &&
        service.ServiceType.type === props.serviceType
      ) {
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

  return (
    <>
      <div className="font-Suit my-4 flex w-full flex-col">
        <div className=" mb-2 text-xs  font-semibold text-gray-500">
          단면 · 한 페이지 당
        </div>
        <div className="flex">{displayPrice}</div>
        <div className=" my-2 text-xs  font-semibold text-gray-500">
          양면 · 두 페이지 당
        </div>
        <div className="flex">{displayDuplexPrice}</div>
      </div>
    </>
  );
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
          {`${props.colorType === "mono" ? "흑백 " : "컬러 "}`}
          {props.type}
        </div>
      </div>
      <div className="grid w-full justify-items-end">
        {props.price || "0"}원
      </div>
    </div>
  );
}
