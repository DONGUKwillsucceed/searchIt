import DropDown from "../../common/components/dropDown";
import HeaderSearchDistrct from "../../common/components/headerNearDistrict";
import { useState } from "react";
import * as areas from "./korea-administrative-district.json";
export default function () {
  const [searchArea1, setSearchArea1] = useState("");
  const [searchArea2, setSearchArea2] = useState("");
  // const [searchArea3, setSearchArea3] = useState("동");

  // let test = [];
  // for (let i = 0; i < 10; i++) {
  //   test.push(
  //     <div
  //       key={i}
  //       className="mb-2 flex w-full items-center justify-between border-b-2 hover:cursor-pointer"
  //     >
  //       <div className="p-2">
  //         <div className="font-bold">name</div>
  //         <div className="text-xs font-semibold text-gray-400">Address</div>
  //         <div className="flex text-xs">
  //           <div className="mr-4">Type</div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
  // console.log(areas.area1);
  return (
    <>
      <HeaderSearchDistrct />
      <div className="mx-auto flex w-11/12">
        <DropDown
          name={searchArea1}
          setName={setSearchArea1}
          area={areas.area1}
          defaultValue="시"
        />
        <DropDown
          name={searchArea2}
          setName={setSearchArea2}
          area={areas.area2[searchArea1]}
          defaultValue="구"
        />
      </div>

      {/* <div className="mx-auto w-11/12">{test}</div> */}
    </>
  );
}
