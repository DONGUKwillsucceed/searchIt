import Image from "next/image";

export default function SearchBar(props: {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  isAutoFocus: boolean;
}) {
  return (
    <div className="mx-auto flex h-12 w-full flex-row items-center justify-between rounded-md bg-gray-100 py-2 px-3">
      <input
        type="text"
        className="flex w-full bg-gray-100 focus:outline-none "
        placeholder="장소를 입력하세요"
        spellCheck={false}
        onChange={(e) => props.setSearch(e.target.value)}
        {...(props.isAutoFocus ? { autoFocus: true } : {})}
      ></input>
      <Image src="/search.svg" width={14} height={14}></Image>
    </div>
  );
}
