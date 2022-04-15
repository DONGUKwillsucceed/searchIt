import { useRouter } from "next/router";
import Image from "next/image";

export default function () {
  const router = useRouter();

  return (
    <nav className="font-Suit sticky top-0 z-20 mx-auto flex max-w-3xl items-center justify-between bg-white px-5 py-3">
      <Image
        src="/backArrow.svg"
        width={25}
        height={25}
        onClick={() => {
          router.back();
        }}
        className="hover:cursor-pointer"
      ></Image>
      <div className="font-Suit">행정구역별</div>
      <div></div>
    </nav>
  );
}
