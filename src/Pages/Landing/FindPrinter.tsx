import { Link } from "react-router-dom";
import District from "../../Images/District.svg";
import University from "../../Images/University.svg";
import map_active from "../../Images/map_active.svg";

export default function FindPrinter() {
  return (
    <div className="mt-2 flex h-fit w-full flex-col justify-between rounded-md p-4 text-lg font-bold sm:w-full">
      <div className="pb-4">프린터 찾기</div>
      <div className="">
        <div className="mb-3 w-full">
          <Link
            to="map"
            className="font-Suit bg-primary flex h-12 w-full items-center justify-center rounded-md text-white"
          >
            <img src={map_active} className="pr-2"></img>
            <div className="text-xs">지도보기</div>
          </Link>
        </div>
        <div className="flex w-full justify-between">
          <Link
            to="findByDistrict"
            className="font-Suit w-49p bg-secondary flex h-10 items-center justify-center rounded-md p-1 text-gray-500"
          >
            <img src={District} className="pr-2"></img>
            <div className="text-xs">행정구역별</div>
          </Link>
          <Link
            to="findByUni"
            className="font-Suit w-49p bg-secondary flex h-10 items-center justify-center rounded-md p-1 text-gray-500"
          >
            <img src={University} className="pr-2"></img>
            <div className="text-xs">대학별</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
