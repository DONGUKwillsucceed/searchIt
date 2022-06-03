import React from "react";
import {
  INearPrinter,
  IPrinterDetail,
  Iservices,
  IUniPrinter,
} from "../types/interfaces";
import ColorOptions from "./colorOptions";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export default function UniPrinterList(props: {
  printer: IUniPrinter;
  services: Iservices[];
  paperSize: string[];
  serviceType: string[];
  repPaperSize: string;
  repServiceType: string;
}) {
  let Locations: JSX.IntrinsicAttributes[] = [];
  const router = useRouter();
  console.log(props.printer.company, props.services);
  return (
    <Link href={`/printers/${props.printer.id}`}>
      <div
        className="mb-2 flex w-full items-center border-b-2 border-gray-100 last:border-none hover:cursor-pointer"
        onClick={() => {
          router.push(`/printers/${props.printer.id}`);
        }}
      >
        <div className="p-2">
          <div className="font-bold">{props.printer.company}</div>
          <div className="text-xs font-semibold text-gray-400">
            {props.printer.address_detail}
          </div>
          {props.services && (
            <div className="mt-2 flex text-xs">
              <div className="mr-4 flex items-center space-x-1">
                <Image src="/file.svg" height={18} width={18}></Image>
                <div>{props.repPaperSize}</div>
              </div>
              <ColorOptions
                services={props.services}
                paperSize={props.paperSize}
                serviceType={props.serviceType}
                repPaperSize={props.repPaperSize}
                repServiceType={props.repServiceType}
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
