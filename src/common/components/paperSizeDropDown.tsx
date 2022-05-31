import Image from "next/image";
import React from "react";
import { Iservices } from "../types/interfaces";

export default function PaperSizeDropDown(props: {
  services: Iservices[];
  setShowPaperSize: React.Dispatch<React.SetStateAction<string>>;
  showPaperSizeId: string;
  setShowPaperSizeId: React.Dispatch<React.SetStateAction<string>>;
  isDropDown: boolean;
  setIsDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  disableScroll();

  const paperSizeSet = new Set(
    props.services.map((service) => [
      service.PaperSizes.id,
      service.PaperSizes.name,
    ])
  );
  const paperSizeList = Array.from(paperSizeSet);
  for (let i = 0; i < paperSizeList.length - 1; i++) {
    if (paperSizeList[i][0] === paperSizeList[i + 1][0]) {
      paperSizeList.splice(i, 1);
      i--;
    }
  }
  return (
    <div
      className="fixed z-20 h-screen w-full bg-black/20"
      onClick={() => {
        props.setIsDropDown(false);
        enableScroll();
      }}
    >
      <div className="w-full bg-white p-4">
        <div className="mx-auto max-w-3xl">
          <button className="h-6 w-6">
            <Image src="/return.svg" width={6} height={12} />
          </button>
        </div>
      </div>
      <div className="mx-auto max-w-3xl" onClick={(e) => e.stopPropagation()}>
        {paperSizeList.map((paperSize) => (
          <button
            key={paperSize[0]}
            className="flex w-full items-start bg-white p-4 active:bg-gray-100"
            onClick={() => {
              props.setShowPaperSizeId(paperSize[0]);
              props.setShowPaperSize(paperSize[1]);
              props.setIsDropDown(false);
            }}
          >
            {paperSize[1]}
          </button>
        ))}
      </div>
    </div>
  );
}

export function disableScroll() {
  document.body.style.overflow = "hidden";
}

export function enableScroll() {
  document.body.style.overflow = "auto";
}
