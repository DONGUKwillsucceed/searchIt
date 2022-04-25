import backArrow from "../../../public/backArrow.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { useStoreActions } from "../utils/globalState";

export default function MapSearchbar() {
  const router = useRouter();
  const setSearchPrinterOnMap = useStoreActions(
    (actions) => actions.setSearchPrinterOnMap
  );
  return (
    <div className="absolute z-10 w-full p-5 xl:hidden ">
      <div className="flex h-12 w-full items-center rounded-md bg-white p-5 shadow-md">
        <div className="mr-2 flex">
          <Image
            src={backArrow}
            onClick={() => {
              setSearchPrinterOnMap({
                center: {
                  lat: undefined,
                  lng: undefined,
                },
              }),
                router.back();
            }}
            className="hover:cursor-pointer"
          />
        </div>
        <button
          className="w-full cursor-pointer bg-white"
          onClick={() => router.push("/search")}
        >
          <div className="flex w-full items-center justify-between">
            <div></div>
            <div className="text-sm text-gray-600 opacity-70">장소 검색</div>
            <Image src="/search.svg" width={14} height={14}></Image>
          </div>
        </button>
      </div>
    </div>
  );
}
