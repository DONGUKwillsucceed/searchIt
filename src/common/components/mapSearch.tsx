import backArrow from "../../../public/backArrow.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { useStoreActions } from "../utils/globalState";
import SearchBar from "./searchBar";

export default function MapSearch() {
  const router = useRouter();
  const setSearchPrinterOnMap = useStoreActions(
    (actions) => actions.setSearchPrinterOnMap
  );
  return (
    <div className="absolute z-10 w-full p-5 sm:max-w-3xl ">
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
          Search
        </button>
      </div>
    </div>
  );
}
