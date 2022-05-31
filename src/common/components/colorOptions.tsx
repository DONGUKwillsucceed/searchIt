import Image from "next/image";
import { Iservices } from "../types/interfaces";

export default function ColorOptions(props: { services: Iservices[] }) {
  props.services.map((service) => {
    console.log(service);
  });
  return <div></div>;
  // console.log("serviceMap", serviceMap);
  // if (
  // ) {
  //   return (
  //     <div className="flex font-semibold text-gray-500">
  //       <div className="flex items-center justify-between">
  //         <Image src="/Color.svg" width={16} height={16}></Image>
  //         <div className="ml-1">컬러 {props.nearPrinter?.priceColor}원</div>
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
