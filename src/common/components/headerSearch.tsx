import Image from "next/image";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

export default function (props?: {
  pageName?: string | string[];
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();

  console.log(router.route.split("/")[1]);

  return (
    <div className="font-Suit sticky top-0 z-20 h-16 border-b-2 bg-white">
      <div className="mx-auto flex max-w-3xl items-center justify-between p-5">
        <button
          className="flex items-center hover:cursor-pointer"
          onClick={() => router.back()}
        >
          <Image src="/backArrow.svg" width={24} height={24}></Image>
        </button>
        <div>{props?.pageName}</div>
        <button onClick={() => props?.setOpenMenu(true)} className="flex">
          <Image src={"/menu.svg"} alt="menu" width={24} height={24} />
        </button>
      </div>
    </div>
  );
}
