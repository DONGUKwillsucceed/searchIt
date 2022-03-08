import bannerAd from "../../Images/PrinterAd.svg";
import nextArrow from "../../Images/nextArrow.svg";
import { useRef } from "react";

export default function Advertism() {
  const sliderRef = useRef(null);
  console.log(sliderRef, " test");
  return (
    <>
      <div className="relative flex max-w-3xl items-center justify-center">
        <div
          ref={sliderRef}
          className="scrollbar-none relative flex w-fit snap-x snap-mandatory items-center overflow-x-scroll md:bg-red-600"
        >
          <div className="flex justify-center bg-red-400">
            <div className="sm:w-3xl bg-primary flex h-20 w-96 snap-start items-center justify-center">
              <div>
                <img src={bannerAd} className="w-advertisement bg-primary" />
              </div>
            </div>
          </div>

          <div className="flex justify-center bg-red-400">
            <div className="sm:w-3xl bg-primary flex h-20 w-96 snap-start items-center justify-center">
              <div>
                <img src={bannerAd} className="w-advertisement bg-primary" />
              </div>
            </div>
          </div>

          <div className="flex justify-center bg-red-400">
            <div className="sm:w-3xl bg-primary flex h-20 w-96 snap-start items-center justify-center">
              <div>
                <img src={bannerAd} className="w-advertisement bg-primary" />
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute
         left-2 flex h-6 w-6 items-center justify-center rounded-full bg-black opacity-100 hover:opacity-30"
        >
          <img src={nextArrow} />
        </div>
        <div className="absolute right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black opacity-100 hover:opacity-30">
          <img src={nextArrow} className="rotate-180" />
        </div>
      </div>
      <div className="mt-1 flex">
        <div className=" mr-1 h-2 w-2 rounded-full bg-gray-300"></div>
        <div className=" mr-1 h-2 w-2 rounded-full bg-gray-300"></div>
        <div className=" h-2 w-2 rounded-full bg-gray-300"></div>
      </div>
    </>
  );
}
