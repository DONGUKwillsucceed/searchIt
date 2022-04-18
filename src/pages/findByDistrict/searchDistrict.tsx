import DropDown from "../../common/components/dropDown";
import HeaderSearch from "../../common/components/headerSearch";
import { useState } from "react";
import * as areas from "./korea-administrative-district.json";
import { Areas } from "../../common/types/interfaces";
export default function () {
  const [searchArea1, setSearchArea1] = useState("");
  const [searchArea2, setSearchArea2] = useState("");
  // const [searchArea3, setSearchArea3] = useState("동");

  return (
    <>
      <HeaderSearch pageName={"행정구역별"} />
      <div className="mx-auto max-w-3xl">
        <div className="mx-auto flex w-11/12">
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
      </div>
    </>
  );
}
