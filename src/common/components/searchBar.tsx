import Image from "next/image";
export default function SearchBar() {
  return (
    <div className="mx-auto mt-2 flex h-12 w-11/12 flex-row items-center justify-between rounded-md bg-gray-100 py-2 px-3">
      <div className="text-gray-300">장소를 입력하세요</div>
      <Image src="/search.svg" width={14} height={14}></Image>
    </div>
  );
}
