import { useEffect, useState } from "react";
import AddNewPlace from "../common/components/addNewPlace";
import HeaderMap from "../common/components/headerMap";
import SearchBar from "../common/components/searchBar";
import { printZoneService } from "../backend/service/PrintZone.service";
import searchAll from "./api/print-zones/search/search";

export default function () {
  const [search, setSearch] = useState("");
  useEffect(() => {
    // const data = searchAll(search);
  }, [search]);
  return (
    <div className="absolute z-20 h-screen w-screen bg-gray-100 xl:hidden">
      <div className="mx-auto  mt-14 h-[calc(100vh-56px)] max-w-3xl bg-white p-4 ">
        <SearchBar setSearch={setSearch} isAutoFocus={true} />
        <div className="font-Suit flex h-[calc(100%-48px)] flex-col items-center justify-between">
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