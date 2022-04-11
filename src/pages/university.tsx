import HeaderUniversity from "../common/components/headerUniversity";
import SearchBarUni from "../common/components/searchBarUni";
import * as university from "./findByDistrict/test.json";
import { useState } from "react";

export function University() {
  const uniList = university.uni;
  const [search, setSearch] = useState("");

  return (
    <div className="mx-auto max-w-3xl">
      <HeaderUniversity />
      <SearchBarUni setSearch={setSearch} />
      <div className=" mx-auto my-4 w-11/12">
        {uniList.map((university, index) => {
          if (
            university.name.toLowerCase().indexOf(search) > -1 ||
            university.name.indexOf(search) > -1
          ) {
            return (
              <div key={index}>
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
  );
}

export function UniButtons(props: { district: string; name: string }) {
  return (
    <button
      className="font-Suit text- my-4 flex h-10 w-full items-center justify-between text-lg"
      // onClick={() => console.log("id = ", props.id)}
    >
      <div>{`${props.name} ${props.district}캠퍼스`}</div>
      <div>Amount</div>
    </button>
  );
}

export default University;
