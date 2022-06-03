import Image from "next/image";
import { IPaperSize, Iservices } from "../types/interfaces";
import { useEffect, useState } from "react";

export default function ColorOptions(props: {
  services: Iservices[];
  paperSize: string[];
  serviceType: string[];
  repPaperSize: string;
  repServiceType: string;
}) {
  useEffect(() => {
    props.services.map((service) => {
      if (!props.paperSize.includes(props.repPaperSize)) {
      }
      if (!props.serviceType.includes(props.repServiceType)) {
      }
    });
  }, []);

  return (
    <div className="flex space-x-1">
      {props.services.map((service) => (
        <div key={service.id} className="flex flex-row">
          {service.color_type === "mono" &&
            service.PaperSizes.name === props.repPaperSize &&
            service.ServiceType.type === props.repServiceType && (
              <div className="flex font-semibold text-gray-500">
                <div className="flex items-center justify-between">
                  <Image src="/mono.svg" width={16} height={16}></Image>
                  <div className="ml-1">흑백 {service.price}원</div>
                </div>
              </div>
            )}
          {service.color_type === "color" &&
            service.PaperSizes.name === props.repPaperSize &&
            service.ServiceType.type === props.repServiceType && (
              <div className="flex font-semibold text-gray-500">
                <div className="flex items-center justify-between">
                  <Image src="/color.svg" width={16} height={16}></Image>
                  <div className="ml-1">컬러 {service.price}원</div>
                </div>
              </div>
            )}
        </div>
      ))}
    </div>
  );
  // if (service.PaperSizes.name == repPaperSize) {
  //   return (
  //     <div classname="flex font-semibold text-gray-500">
  //       <div classname="flex items-center justify-between">
  //         <image src="/color.svg" width={16} height={16}></image>
  //         <div classname="ml-1">컬러 {props.nearprinter?.pricecolor}원</div>
  //       </div>
  //       <div className="ml-2 flex items-center justify-between ">
  //         <Image src="/mono.svg" width={16} height={16}></Image>
  //         <div className="ml-1">흑백 {props.nearPrinter?.priceMono}원</div>
  //       </div>
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div className="font-semibold">
  //       {props.printer?.c || props.nearPrinter.priceColor != 0 ? (
  //         <div className="flex items-center justify-between">
  //           <Image src="/Color.svg" width={16} height={16}></Image>
  //           <div className="ml-1">컬러 {props.nearPrinter.priceColor}원</div>
  //         </div>
  //       ) : (
  //         <div className="flex items-center justify-between">
  //           <Image src="/mono.svg" width={16} height={16}></Image>
  //           <div className="ml-1">흑백 {props.nearPrinter.priceMono}원</div>
  //         </div>
  //       )}
  //     </div>
  //   );
  // }
}
