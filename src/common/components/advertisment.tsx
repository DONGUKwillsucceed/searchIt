import bannerAd from "../../../public/printerAd.svg";
import nextArrow from "../../../public/nextArrow.svg";
import Image from "next/image";

export default function Advertism() {
  return (
    <>
      <div className="relative flex w-full items-center justify-center">
        <div className="bg-primary flex h-24 w-full items-center justify-center">
          <div className="font-Suit text-xl font-bold text-white">
            프린트잇 가맹점주 모집
          </div>
          <Image src={"/printer.svg"} width={80} height={82}></Image>
        </div>
        {/* Next arrows */}
        {/* <div className="absolute left-2 flex h-6 w-6 items-center justify-center rounded-full bg-black opacity-100 hover:opacity-30">
          <Image src={nextArrow} />
        </div>
        <div className="absolute right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black opacity-100 hover:opacity-30">
          <Image src={nextArrow} className="rotate-180" />
        </div> */}
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
