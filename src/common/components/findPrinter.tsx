import District from "../../../public/district.svg";
import University from "../../../public/university.svg";
import { useRouter } from "next/router";
import Image from "next/image";

export default function FindPrinter() {
  const router = useRouter();

  return (
    <div className="font-Suit">
      <div className="mb-3 w-full">
        <button
          className="bg-primary flex h-12 w-full cursor-pointer items-center justify-center rounded-md text-white active:bg-teal-500"
          onClick={() => router.push("/map")}
        >
          <div className="pr-2">
            <Image src="/map_white.svg" width={16} height={16}></Image>
          </div>
          <div className="text-xs">지도보기</div>
        </button>
      </div>
      <div className="flex w-full justify-between">
        <button
          className="font-Suit w-49p bg-secondary flex h-10 items-center justify-center rounded-md p-1 text-gray-500 active:bg-gray-100"
          onClick={() => {
            router.push("/findByDistrict/searchDistrict");
          }}
        >
          <div className="mr-1">
            <Image src={District}></Image>
          </div>
          <div className="text-xs">행정구역별</div>
        </button>
        <button
          className="font-Suit w-49p bg-secondary flex h-10 items-center justify-center rounded-md p-1 text-gray-500 active:bg-gray-100"
          onClick={() => {
            router.push("/findByUni/universities");
          }}
        >
          <div className="mr-1">
            <Image src={University}></Image>
          </div>
          <div className="text-xs">대학별</div>
        </button>
      </div>
    </div>
  );
}
