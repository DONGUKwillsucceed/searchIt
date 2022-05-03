import Image from "next/image";
import { useRouter } from "next/router";

export default function HeaderReview() {
  const router = useRouter();
  return (
    <header className="sticky inset-x-0 top-0 z-10 bg-white p-4 ">
      <div className="mx-auto flex max-w-3xl justify-between">
        <button onClick={() => router.back()}>
          <Image src={"/return.svg"} width={10} height={16}></Image>
        </button>
        <div className="font-Suit ">리뷰</div>
        <button>
          <Image src={"/writeReview.svg"} width={24} height={24}></Image>
        </button>
      </div>
    </header>
  );
}
