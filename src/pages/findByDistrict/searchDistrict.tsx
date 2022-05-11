import DropDown from "../../common/components/dropDown";
import HeaderSearch from "../../common/components/headerSearch";
import { useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { areaService } from "../../backend/service/Area.service";
import * as areas from "./korea-administrative-district.json";
import { Areas } from "../../common/types/interfaces";

export default function () {
  const [searchArea1, setSearchArea1] = useState("");
  const [searchArea2, setSearchArea2] = useState("");
  // const [searchArea3, setSearchArea3] = useState("동");
  const [hasBackDrop, setHasBackDrop] = useState(false);
  const [isArea1Open, setIsArea1Open] = useState(false);
  const [isArea2Open, setIsArea2Open] = useState(false);
  // const [isArea3Open, setIsArea3Open] = useState(false);

  function closeAllDropDown() {
    setIsArea1Open(false);
    setIsArea2Open(false);
    // setIsArea3Open(false);
    setHasBackDrop(false);
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div
        className={`${
          hasBackDrop ? "absolute z-10 h-screen w-full bg-black/20" : "hidden"
        }`}
        onClick={() => closeAllDropDown()}
      />
      <HeaderSearch pageName={"행정구역별"} />
      <div className="mx-auto h-3/4 w-full max-w-3xl bg-white ">
        <div className="relative z-30 flex rounded-b-md bg-white p-4">
          <DropDown
            name={searchArea1}
            setName={setSearchArea1}
            searchArea={searchArea1}
            setSearchArea={setSearchArea2}
            hasBackDrop={hasBackDrop}
            setHasBackDrop={setHasBackDrop}
            isAreaOpen={isArea1Open}
            setIsAreaOpen={setIsArea1Open}
            closeAllDropDown={closeAllDropDown}
            area={areas.area1}
            defaultValue="시/도"
          />
          <DropDown
            name={searchArea2}
            setName={setSearchArea2}
            searchArea={searchArea2}
            area={areas.area2[searchArea1 as keyof Areas]}
            hasBackDrop={hasBackDrop}
            setHasBackDrop={setHasBackDrop}
            isAreaOpen={isArea2Open}
            setIsAreaOpen={setIsArea2Open}
            closeAllDropDown={closeAllDropDown}
            defaultValue="구/군/시"
          />
        </div>
        {!searchArea2 || searchArea2 === "선택" ? (
          <div className="flex w-full flex-col items-center py-52">
            <div className=" mb-2 font-bold">해정구역을 선택해주세요</div>
            <div className="font-medium">내 주변 프린터를 보려면</div>
            <div className="font-medium">상단 구/군/시까지 선택 해야합니다</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   const data = await areaService.findAllArea2();
//   return { props: { data } };
// };
