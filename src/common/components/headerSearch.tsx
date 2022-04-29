import Image from "next/image";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

export default function (props?: { pageName?: string | string[] }) {
  const router = useRouter();

  return (
    <div className="font-Suit sticky top-0 z-20 h-16 border-b-2 bg-white">
      <div className="mx-auto flex max-w-3xl items-center justify-between p-5">
        <button
          className="flex items-center hover:cursor-pointer"
          onClick={() => router.back()}
        >
          <Image src="/return.svg" width={12} height={12}></Image>
        </button>
        <div>{props?.pageName}</div>
        <div></div>
      </div>
    </div>
  );
}
