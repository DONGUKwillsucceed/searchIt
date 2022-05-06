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
            width={8}
            height={14}
            onClick={() => {
              router.back();
            }}
            className="hover:cursor-pointer"
          ></Image>
          <button className="items-center">
            <Image src="/share.svg" width={24} height={24}></Image>
          </button>
        </div>
      </nav>
    </header>
  );
}
