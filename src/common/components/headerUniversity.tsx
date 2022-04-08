import Image from "next/image";
import { useRouter } from "next/router";

export default function HeaderUniversity() {
  const router = useRouter();

  return (
    <div className="font-Suit sticky mx-auto flex flex-col">
      <div className="flex w-full items-center justify-between p-4">
        <button
          className="flex items-center hover:cursor-pointer"
          onClick={() => router.back()}
        >
          <Image src="/backArrow.svg" width={24} height={24}></Image>
        </button>
        <div>대학별</div>
        <div></div>
      </div>
    </div>
  );
}
