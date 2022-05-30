import Image from "next/image";
import { useRouter } from "next/router";
import { SetStateAction, Dispatch } from "react";

export default function Header(props: {
  title?: string | string[] | undefined;
  isNotice: boolean;
  setIsNotice: Dispatch<SetStateAction<boolean>>;
  isEvent: boolean;
  setIsEvent: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  return (
    <header className="sticky inset-x-0 top-0 z-10 bg-white">
      <div className="mx-auto flex max-w-3xl justify-between p-4">
        <button
          onClick={() => router.back()}
          className="flex h-6 w-6 items-center justify-center"
        >
          <Image src={"/return.svg"} width={6} height={12}></Image>
        </button>

        <div className="font-Suit">{props.title}</div>

        <div />
      </div>
      <div className="">
        <button
          className={`w-1/2 p-4 ${
            props.isNotice
              ? "text-primary border-b-primary border-b-2"
              : "text-gray-500 "
          }`}
          onClick={() => {
            props.setIsNotice(true);
            props.setIsEvent(false);
          }}
        >
          공지사항
        </button>
        <button
          className={`w-1/2 p-4 ${
            props.isEvent
              ? "text-primary border-b-primary border-b-2 "
              : "text-gray-500"
          }`}
          onClick={() => {
            props.setIsNotice(false);
            props.setIsEvent(true);
          }}
        >
          이벤트
        </button>
      </div>
    </header>
  );
}
