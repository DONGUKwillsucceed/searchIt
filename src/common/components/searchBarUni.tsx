import Image from "next/image";
export default function SearchBarUni(props: {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="mx-auto mt-2 flex h-12 w-11/12 flex-row items-center justify-between rounded-md bg-gray-100 py-2 px-3">
      <input
        type="text"
        className="flex w-full bg-gray-100 focus:outline-none "
        placeholder="장소를 입력하세요"
        onChange={(e) => props.setSearch(e.target.value)}
      ></input>
      <Image src="/search.svg" width={14} height={14}></Image>
    </div>
  );
}
