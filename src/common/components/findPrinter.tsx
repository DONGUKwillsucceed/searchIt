import District from "../../../public/district.svg";
import University from "../../../public/university.svg";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

export default function FindPrinter() {
  const router = useRouter();

  return (
    <div className="font-Suit">
      <div className="mb-3 w-full">
        <Link href={"/map"}>
          <button className="bg-primary flex h-12 w-full cursor-pointer items-center justify-between rounded-md px-4 py-2 text-white active:bg-red-500">
            <div className="flex space-x-2">
              <Image src="/compass.svg" width={16} height={16}></Image>
              <div className="text-xs font-semibold">프린터 검색</div>
            </div>
            <Image
              src="/nextArrow.svg"
              width={12}
              height={12}
              className="rotate-180"
            ></Image>
          </button>
        </Link>
      </div>

      <div className="flex w-full justify-between">
        <Link href={"/findByDistrict/searchDistrict"}>
          <button className="font-Suit w-49p bg-secondary flex h-10 items-center justify-center rounded-md p-1 text-gray-500 active:bg-gray-100">
            <div className="mr-1">
              <Image src={District}></Image>
            </div>
            <div className="text-xs">행정구역별</div>
          </button>
        </Link>

        <Link href={"/findByUni/universities"}>
          <button className="font-Suit w-49p bg-secondary flex h-10 items-center justify-center rounded-md p-1 text-gray-500 active:bg-gray-100">
            <div className="mr-1">
              <Image src={University}></Image>
            </div>
            <div className="text-xs">대학별</div>
          </button>
        </Link>
      </div>
    </div>
  );
}
