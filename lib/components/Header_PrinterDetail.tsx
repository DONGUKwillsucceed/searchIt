import Image from "next/image";
import backArrow from "../../public/backArrow.svg";
import { useRouter } from "next/router";

export default function Header_PrinterDetail(props: {
  name?: string;
  color?: number;
  mono?: number;
}) {
  const router = useRouter();

  return (
    <header>
      <nav className="font-Suit fixed inset-x-0 top-0 z-10 mx-auto flex max-w-3xl flex-col bg-white px-5 py-3">
        <div className="flex w-full justify-between py-5">
          <Image
            src={backArrow}
            width={32}
            height={32}
            onClick={() => {
              router.push("/");
            }}
            className="hover:cursor-pointer"
          ></Image>
          <div className="font-Suit text-lg font-bold">{props.name}</div>
          <div></div>
        </div>
        {/* <div className="font-Suit w-full pb-3 text-lg font-bold">
          {props.name}
        </div> */}
        <div className="flex w-full">
          <Image
            src={props.color === 0 ? "/mono.svg" : "/color.svg"}
            width={24}
            height={24}
          ></Image>
          <div className="font-Suit pl-2 text-gray-500">
            {props.color === 0 ? "흑백" : "흑백 컬러"}
            {" 출력 가능"}
          </div>
        </div>
      </nav>
    </header>
  );
}
