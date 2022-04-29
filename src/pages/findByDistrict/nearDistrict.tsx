import HeaderSearch from "../../common/components/headerSearch";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import getPrinterCoords from "../../common/api/getPrinterCoords";
import { Areas, IPrinterData } from "../../common/types/interfaces";
import { useState } from "react";
import { useRouter } from "next/router";
import ColorOptions from "../../common/components/colorOptions";
import * as areas from "./korea-administrative-district.json";
import SearchBar from "../../common/components/searchBar";
import DropDown from "../../common/components/dropDown";
import Menu from "../../common/components/menu";

export default function (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [searchArea1, setSearchArea1] = useState("시");
  const [searchArea2, setSearchArea2] = useState("구");
  const [searchArea3, setSearchArea3] = useState("동");

  // console.log(props.data);
  return (
    <div className="min-h-screen bg-gray-100">
      {openMenu ? <Menu setOpenMenu={setOpenMenu} /> : null}
      <main className="mx-auto max-w-3xl">
        <div className="flex h-32 w-full items-end bg-gray-200">
          <div className="bg-primary h-3/5 w-2/3 p-3 text-white">
            <div className="mb-1 text-xs">가장 가까운 프린트 - 프린트잇</div>
            <div className="text-3xl">행정구역별</div>
          </div>
        </div>

        <div className="flex flex-col rounded-b-md bg-white p-4">
          <div className="my-2">
            <SearchBar setSearch={setSearch} />
          </div>

          <div className="mx-auto flex w-full">
            <DropDown
              name={searchArea1}
              setName={setSearchArea1}
              setSearchArea2={setSearchArea2}
              area={areas.area1}
              defaultValue="시"
            />
            <DropDown
              name={searchArea2}
              setName={setSearchArea2}
              area={areas.area2[searchArea1 as keyof Areas]}
              defaultValue="구"
            />
          </div>

          <div className="mx-auto h-fit w-full">
            {props.data.map((printer: IPrinterData) => (
              <div
                key={printer.id}
                className="mb-2 flex w-full items-center justify-between border-b-2 last:mb-0 last:border-b-0 hover:cursor-pointer"
                onClick={() => {
                  router.push(`/printers/${printer.id}`);
                }}
              >
                <div className="p-2">
                  <div className="font-bold">{printer.name}</div>
                  <div className="text-xs font-semibold text-gray-400">
                    Address
                  </div>
                  <div className="flex text-xs">
                    <div className="mr-4">Type</div>
                    <ColorOptions printer={printer} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getPrinterCoords();

  return { props: { data } };
};
