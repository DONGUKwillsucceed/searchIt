import Image from "next/image";
import { useRouter } from "next/router";

export default function HeaderUniversity(props?: {
  uniName?: string | string[];
}) {
  const router = useRouter();

  return (
    <div className="font-Suit sticky top-0 z-10 mx-auto flex max-w-3xl flex-col bg-white">
      <div className="flex w-full items-center justify-between p-4">
        <button
          className="flex items-center hover:cursor-pointer"
          onClick={() => router.back()}
        >
          <Image src="/backArrow.svg" width={24} height={24}></Image>
        </button>
        <div>
          {props && props.uniName !== undefined ? props.uniName : "대학별"}
        </div>
        <div></div>
      </div>
    </div>
  );
}
