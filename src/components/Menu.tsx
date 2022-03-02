import { Link } from "react-router-dom";
import home_active from "../Images/home_active.svg";
import home_disabled from "../Images/home_disabled.svg";
import map_active from "../Images/map_active.svg";
import map_disabled from "../Images/map_disabled.svg";

export default function (props: { currentPage: string }) {
  return (
    <footer className="font-Suit fixed inset-x-0 bottom-0 z-10 mx-auto flex h-fit w-full justify-evenly border-t-2 bg-white p-2">
      <Link to="/" className="items-center text-gray-500">
        <div>
          <img
            src={props.currentPage === "Home" ? home_active : home_disabled}
          ></img>
        </div>
        <div className="text-center">홈</div>
      </Link>
      <Link to="map" className="items-center text-gray-500">
        <div className="flex justify-center">
          <img
            src={props.currentPage === "Map" ? map_active : map_disabled}
          ></img>
        </div>
        <div className="text-center">지도</div>
      </Link>
    </footer>
  );
}
