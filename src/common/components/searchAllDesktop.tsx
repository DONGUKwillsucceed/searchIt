import SearchBar from "./searchBar";
import Menu from "./menu";
import AddNewPlace from "./addNewPlace";
import { useState } from "react";

export default function SearchAllDesktop() {
  const [openMenu, setOpenMenu] = useState(false);
  const [search, setSearch] = useState("");
  return (
    <div className="font-Suit relative z-10 h-screen bg-white px-4 pt-14">
      <div className="my-4 text-lg font-bold">프린터 찾기</div>
      <div className="mx-auto h-[calc(100vh-116px)] max-w-3xl bg-white ">
        <SearchBar setSearch={setSearch} isAutoFocus={true} />
        <div className="font-Suit flex h-[calc(100%-100px)] flex-col items-center justify-between">
          {search === "" ? (
            <div className="my-auto space-y-4 text-center">
              <div className="font-medium">이렇게 검색해보세요</div>
              <div className="flex flex-col items-center text-sm">
                <div className="font-semibold">지역명 + 번지</div>
                <div className="mb-4 text-gray-500">도곡동 12-1</div>
                <div className="font-semibold">태그 검색</div>
                <div className="mb-4 text-gray-500">
                  #한국대학교 #스터디카페
                </div>
                <div className="font-semibold">매장 검색</div>
                <div className="text-gray-500">스타벅스 대치점</div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
          <AddNewPlace />
        </div>
      </div>
    </div>
  );
}
