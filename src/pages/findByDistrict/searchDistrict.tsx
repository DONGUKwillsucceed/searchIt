import DropDown from "../../common/components/dropDown";
import HeaderSearch from "../../common/components/headerSearch";
import Menu from "../../common/components/menu";
import { useState } from "react";
import * as areas from "./korea-administrative-district.json";
import { Areas } from "../../common/types/interfaces";
export default function () {
  const [openMenu, setOpenMenu] = useState(false);
  const [searchArea1, setSearchArea1] = useState("");
  const [searchArea2, setSearchArea2] = useState("");
  // const [searchArea3, setSearchArea3] = useState("동");

  return (
    <div className="min-h-screen bg-gray-100">
      {openMenu ? <Menu setOpenMenu={setOpenMenu} /> : null}
      <HeaderSearch pageName={"행정구역별"} setOpenMenu={setOpenMenu} />
      <div className="mx-auto max-w-3xl">
        <div className="mx-auto my-3 flex rounded-md bg-white p-4">
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
    </div>
  );
}
