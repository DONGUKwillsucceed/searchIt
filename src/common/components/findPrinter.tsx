import District from "../../../public/district.svg";
import University from "../../../public/university.svg";
import { useRouter } from "next/router";
import Image from "next/image";

export default function FindPrinter() {
  const router = useRouter();

  return (
    <div>
      <div className="mb-3 w-full">
        <div
          className="font-Suit hover: bg-primary flex h-12 w-full cursor-pointer items-center justify-center rounded-md text-white"
          onClick={() => router.push("/map")}
        >
          <div className="pr-2">
            <Image src="/map_white.svg" width={16} height={16}></Image>
          </div>
          <div className="text-xs">지도보기</div>
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div
          className="font-Suit w-49p bg-secondary flex h-10 items-center justify-center rounded-md p-1 text-gray-500 hover:cursor-pointer"
          onClick={() => {
            router.push("/findByDistrict/district");
          }}
        >
          <Image src={District} className="pr-2"></Image>
          <div className="text-xs">행정구역별</div>
        </div>
        <div
          className="font-Suit w-49p bg-secondary flex h-10 cursor-pointer items-center justify-center rounded-md p-1 text-gray-500"
          onClick={() => {
            router.push("/findByUni/universities");
          }}
        >
          <Image src={University} className="pr-2"></Image>
          <div className="text-xs">대학별</div>
        </div>
      </div>
    </div>
  );
}
