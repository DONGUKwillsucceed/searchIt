import Image from "next/image";
import { useRouter } from "next/router";

export default function HeaderAddPlace(props: { locationAddress: string }) {
  const router = useRouter();

  return (
    <div className="font-Suit absolute top-0 z-20 h-16 w-full border-b-2 bg-white">
      <div className="mx-auto flex max-w-3xl items-center justify-between p-5">
        <button
          className="flex items-center hover:cursor-pointer"
          onClick={() => router.back()}
        >
          <Image src="/return.svg" width={12} height={12}></Image>
        </button>
        <div>신규 장소 등록</div>
        <div></div>
      </div>

      <div className="relative top-4 z-20 mx-auto h-12 w-11/12 rounded-md bg-white p-3">
        {props.locationAddress}
      </div>
    </div>
  );
}
