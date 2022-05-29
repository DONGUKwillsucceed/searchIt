import Logo from "../../../public/logo.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { useStoreActions } from "../utils/globalState";
import { Dispatch, SetStateAction } from "react";

export default function HeaderMap(props: {
  title: string;
  isSearching: boolean;
  setIsSearching: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const setSearchPrinterOnMap = useStoreActions(
    (actions) => actions.setSearchPrinterOnMap
  );

  return (
    <div>
      <div className="font-Suit absolute z-20 flex h-14 w-full justify-between bg-white p-4 xl:hidden">
        {props?.isSearching === true ? (
          <button
            onClick={() => {
              props.setIsSearching(false);
            }}
            className="flex h-6 w-6 items-center justify-center"
          >
            <Image src="/return.svg" width={6} height={12}></Image>
          </button>
        ) : (
          <button
            onClick={() => {
              setSearchPrinterOnMap({
                center: {
                  lat: undefined,
                  lng: undefined,
                },
              }),
                router.back();
            }}
            className="flex h-6 w-6 items-center justify-center"
          >
            <Image src="/return.svg" width={6} height={12}></Image>
          </button>
        )}

        <div>{props.title}</div>
        <div></div>
      </div>
      <div className="absolute z-20 hidden h-14 w-full justify-center border-b-2 bg-white xl:flex">
        <Image
          src={Logo}
          alt="logo"
          onClick={() => {
            router.push("/");
          }}
          className="hover:cursor-pointer"
        />
      </div>
    </div>
  );
}
