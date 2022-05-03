import Image from "next/image";
import { useRouter } from "next/router";

export default function Header_PrinterDetail(props: {
  name?: string;
  color?: number;
  mono?: number;
}) {
  const router = useRouter();
  return (
    <header className="sticky inset-x-0 top-0 z-10 bg-white p-4 ">
      <nav className="mx-auto flex max-w-3xl flex-col">
        <div className="flex w-full justify-between">
          <Image
            src="/return.svg"
            width={10}
            height={16}
            onClick={() => {
              router.back();
            }}
            className="hover:cursor-pointer"
          ></Image>
          <button className="items-center">
            <Image src="/share.svg" width={24} height={24}></Image>
          </button>
        </div>
        <div className="font-Suit my-2 w-full text-lg font-bold">
          {props.name}
        </div>
        <div className="flex w-full">
          <Image
            src={props.color === 0 ? "/mono.svg" : "/bothColor.svg"}
            width={16}
            height={16}
          ></Image>
          <div className="font-Suit pl-2 text-sm text-gray-500">
            {props.color === 0 ? "흑백" : "흑백 컬러"}
            {" 출력 가능"}
          </div>
        </div>
      </nav>
    </header>
  );
}
