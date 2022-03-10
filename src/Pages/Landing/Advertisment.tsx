import bannerAd from "../../Images/PrinterAd.svg";
import nextArrow from "../../Images/nextArrow.svg";
import { useRef } from "react";

export default function Advertism() {
  const sliderRef = useRef(null);

  return (
    <>
      <div className="relative flex max-w-3xl items-center justify-center">
        <div className="scrollbar-none flex max-w-3xl snap-x snap-mandatory overflow-x-scroll">
          <img src={bannerAd} className="mx-3 w-full snap-center"></img>
          <img src={bannerAd} className="mx-3 w-full snap-center"></img>
          <img src={bannerAd} className="mx-3 w-full snap-center"></img>
        </div>
        {/* Next arrows */}
        <div className="absolute left-2 flex h-6 w-6 items-center justify-center rounded-full bg-black opacity-100 hover:opacity-30">
          <img src={nextArrow} />
        </div>
        <div className="absolute right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black opacity-100 hover:opacity-30">
          <img src={nextArrow} className="rotate-180" />
        </div>
      </div>

      {/* Current bar */}
      <div className="mt-1 flex">
        <div className=" mr-1 h-2 w-2 rounded-full bg-gray-300"></div>
        <div className=" mr-1 h-2 w-2 rounded-full bg-gray-300"></div>
        <div className=" h-2 w-2 rounded-full bg-gray-300"></div>
      </div>
    </>
  );
}
