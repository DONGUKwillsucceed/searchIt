import SearchBar from "./searchBar";
import Menu from "./menu";
import AddNewPlace from "./addNewPlace";
import { useState } from "react";
import { IPaperSize, IPrinterDetail } from "../types/interfaces";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import PrinterList from "./printerList";
import ColorOptions from "./colorOptions";

export default function SearchAllDesktop(props: { paperSize: IPaperSize[] }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<IPrinterDetail[]>([]);

  const [paperSize, setPaperSize] = useState<string[]>([]);
  const serviceType = ["인쇄", "스캔", "복사", "팩스"];
  const [repPaperSize, setRepPaperSize] = useState("A4");
  const [repServiceType, setRepServiceType] = useState("인쇄");

  const router = useRouter();
  useEffect(() => {
    props.paperSize.map((paper) => {
      setPaperSize((prev) => [...prev, paper.name]);
    });
  }, []);
  useEffect(() => {
    const delayDebonce = setTimeout(() => {
      console.log(search);
      axios
        .get(`/api/print-zones?q=${search}`)
        .then((res) => {
          setSearchResult(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 500);
    if (search === "") {
      setSearchResult([]);
    }

    return () => clearTimeout(delayDebonce);
  }, [search]);

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
            <div
              className={`${searchResult.length > 0 ? "w-full" : "my-auto"}`}
            >
              {searchResult.length > 0 ? (
                <div className="">
                  {searchResult.map((printer: IPrinterDetail) => (
                    <PrinterList
                      key={printer.id}
                      printer={printer}
                      services={printer.services}
                      paperSize={paperSize}
                      serviceType={serviceType}
                      repPaperSize={repPaperSize}
                      repServiceType={repServiceType}
                    ></PrinterList>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  <Image src={"/noResult.svg"} width={140} height={104}></Image>
                  <div className="text-center">검색 결과가 없습니다</div>
                </div>
              )}
            </div>
          )}
          <AddNewPlace />
        </div>
      </div>
    </div>
  );
}
