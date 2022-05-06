import { useRouter } from "next/router";
import Image from "next/image";

export default function HeaderAddReview() {
  const router = useRouter();
  return (
    <header className="sticky inset-x-0 top-0 z-10 bg-white p-4 ">
      <div className="font-Suit mx-auto flex max-w-3xl justify-between">
        <button className="flex items-center" onClick={() => router.back()}>
          <Image src="/backArrow.svg" width={24} height={24}></Image>
        </button>
        <div>리뷰 남기기</div>
        <div></div>
      </div>
    </header>
  );
}
