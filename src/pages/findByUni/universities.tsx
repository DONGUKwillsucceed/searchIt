import SearchBarUni from "../../common/components/searchBarUni";
import Menu from "../../common/components/menu";
import * as university from "./test.json";
import { useState } from "react";
import { useRouter } from "next/router";
import Header from "../../common/components/header";

export function University() {
  const uniList = university.uni;
  const [openMenu, setOpenMenu] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-gray-100">
      {openMenu ? <Menu setOpenMenu={setOpenMenu} /> : null}
      <Header hasBack={true} title={"대학별"} />
      <main className="mx-auto max-w-3xl ">
        <div className=" flex w-full flex-col rounded-b-md bg-white p-4 pb-0">
          <SearchBarUni setSearch={setSearch} />
          <div className="my-4 w-full">
            {uniList.map((university, index) => {
              if (
                university.name.toLowerCase().indexOf(search) > -1 ||
                university.name.indexOf(search) > -1
              ) {
                return (
                  <div key={index} className="mt-4 first:mt-0">
                    <UniButtons
                      district={university.district}
                      name={university.name}
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

export function UniButtons(props: { district: string; name: string }) {
  const router = useRouter();
  return (
    <button
      className="font-Suit flex h-10 w-full items-center justify-between text-lg"
      onClick={() => router.push(`/findByUni/${props.name}`)}
    >
      <div>{`${props.name} ${props.district}캠퍼스`}</div>
      <div>Amount</div>
    </button>
  );
}

export default University;
