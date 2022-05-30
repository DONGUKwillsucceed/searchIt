import Image from "next/image";
import React from "react";
import { Iservices } from "../types/interfaces";

export default function PaperSizeDropDown(props: {
  services: Iservices[];
  showPaperSizeId: string;
  setShowPaperSizeId: React.Dispatch<React.SetStateAction<string>>;
  isDropDown: boolean;
  setIsDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  disableScroll();
  props.services.map((service) => {
    console.log(service.PaperSizes.name);
  });

  const paperSizeSet = new Set(
    props.services.map((service) => service.PaperSizes.name)
  );
  return (
    <div
      className="absolute z-20 h-screen w-full bg-black/20"
      onClick={(e) => {
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
      <div
        className="mx-auto max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      ></div>
    </div>
  );
}

export function disableScroll() {
  document.body.style.overflow = "hidden";
}

export function enableScroll() {
  document.body.style.overflow = "auto";
}
