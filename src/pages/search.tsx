import { useEffect, useState } from "react";
import AddNewPlace from "../common/components/addNewPlace";
import SearchBar from "../common/components/searchBar";
import { printZoneService } from "../backend/service/PrintZone.service";
import Image from "next/image";
import axios from "axios";
import {
  INearPrinter,
  IPaperSize,
  IPrinterData,
  IPrinterDetail,
  IServiceType,
} from "../common/types/interfaces";
import { useRouter } from "next/router";
import ColorOptions from "../common/components/colorOptions";
import PrinterList from "../common/components/printerList";

export default function (props: { paperSize: IPaperSize[] }) {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<IPrinterDetail[]>([]);

  // const paperSize = [props.paperSize.map((paper) => paper.name)];
  const [paperSize, setPaperSize] = useState<string[]>([]);
  const serviceType = ["인쇄", "스캔", "복사", "팩스"];
  const [repPaperSize, setRepPaperSize] = useState("A4");
  const [repServiceType, setRepServiceType] = useState("인쇄");

  const router = useRouter();
  console.log(paperSize);
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
          console.log(res.data);
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
