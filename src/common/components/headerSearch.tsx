import Image from "next/image";
import { useRouter } from "next/router";

export default function (props?: { pageName?: string | string[] }) {
  const router = useRouter();

  console.log(router.route.split("/")[1]);

  return (
    <div className="font-Suit sticky top-0 z-20 mx-auto flex max-w-3xl items-center justify-between bg-white px-5 py-3">
      <button
        className="flex items-center hover:cursor-pointer"
        onClick={() => router.back()}
      >
        <Image src="/backArrow.svg" width={24} height={24}></Image>
      </button>
      <div>{props?.pageName}</div>
      <div></div>
    </div>
  );
}
