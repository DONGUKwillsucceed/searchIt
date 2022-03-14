import Link from "next/link";
import District from "../../public/district.svg";
import University from "../../public/university.svg";
import map_active from "../../public/map_active.svg";
import Image from "next/image";

export default function FindPrinter() {
  return (
    <div>
      <div className="mb-3 w-full">
        <Link href="/map">
          <div className="font-Suit hover: bg-primary flex h-12 w-full cursor-pointer items-center justify-center rounded-md text-white">
            <Image src={map_active} className="pr-2"></Image>
            <div className="text-xs">지도보기</div>
          </div>
        </Link>
      </div>
      <div className="flex w-full justify-between">
        <Link href="/findPrinter/FindByDistrict">
          <div className="font-Suit w-49p bg-secondary flex h-10 items-center justify-center rounded-md p-1 text-gray-500 hover:cursor-pointer">
            <Image src={District} className="pr-2"></Image>
            <div className="text-xs">행정구역별</div>
          </div>
        </Link>
        <Link href="/findPrinter/FindByUni">
          <div className="font-Suit w-49p bg-secondary flex h-10 cursor-pointer items-center justify-center rounded-md p-1 text-gray-500">
            <Image src={University} className="pr-2"></Image>
            <div className="text-xs">대학별</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
