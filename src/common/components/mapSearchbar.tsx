import backArrow from "../../../public/backArrow.svg";
import Image from "next/image";
import { useRouter } from "next/router";

export default function MapSearchbar(props: {
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  return (
    <div className="absolute top-14 z-10 w-full p-4 xl:hidden ">
      <button
        className="flex w-full cursor-pointer items-center justify-between rounded-md bg-white p-4"
        onClick={() => props.setIsSearching(true)}
      >
        <div className="text-sm text-gray-600 opacity-70">장소 검색</div>
        <Image src="/search.svg" width={14} height={14}></Image>
      </button>
    </div>
  );
}
