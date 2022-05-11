import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import Search from "./searchAllMobile";

export default function DropDown(props: {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  searchArea: string;
  setSearchArea?: Dispatch<SetStateAction<string>>;
  area?: Array<string> | undefined;
  hasBackDrop: boolean;
  setHasBackDrop: Dispatch<SetStateAction<boolean>>;
  isAreaOpen: boolean;
  setIsAreaOpen: Dispatch<SetStateAction<boolean>>;
  defaultValue?: string;
  closeAllDropDown: () => void;
}) {
  const options = props.area?.map((name) => {
    return (
      <button
        className="z-30 flex w-full items-center justify-between py-2 px-4 last:mb-6 active:bg-slate-100"
        onClick={() => {
          props.setName(`${name}`), props.setSearchArea?.("선택");
          props.setIsAreaOpen(false);
          props.setHasBackDrop(false);
        }}
        key={name}
      >
        {name}
        {props.searchArea == name && (
          <Image src="/checkBlack.svg" width={12} height={12}></Image>
        )}
      </button>
    );
  });

  return (
    <div>
      <button
        className="font-Suit relative z-30 my-2 mr-2 h-8 w-fit rounded-md border-2 bg-white px-2 py-1 text-sm text-gray-500"
        onClick={() => {
          props.closeAllDropDown();
          props.setIsAreaOpen(props.isAreaOpen ? false : true);
          props.setHasBackDrop(props.isAreaOpen ? false : true);
        }}
      >
        <div className="flex justify-between">
          <div>{props.name ? props.name : props.defaultValue}</div>
          <div className="mx-1">
            <Image
              src="/return.svg"
              width={8}
              height={8}
              className="-rotate-90"
            />
          </div>
        </div>
      </button>
      {props.isAreaOpen && (
        <div className="absolute left-0 z-20 w-full">
          <div className="mx-auto flex max-w-3xl flex-col justify-center bg-white">
            <div className="flex w-full justify-center text-xs text-gray-500">
              {props.defaultValue} 선택
            </div>
            <div className="scrollbar-none relative max-h-96 overflow-y-scroll text-sm font-medium">
              {options}
            </div>
            {props.area?.length && props.area?.length > 0 ? (
              <div className="absolute bottom-0 h-10 w-full bg-gradient-to-b from-transparent to-white" />
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
