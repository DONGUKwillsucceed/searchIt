import { Link } from "react-router-dom";
import home from "../Images/home.svg";
import map from "../Images/map.svg";

export default function () {
  return (
    <footer className="absolute inset-x-0 bottom-0 z-10 flex h-fit w-full justify-evenly border-t-2 bg-white p-2">
      <Link to="/" className="items-center text-gray-500">
        <div>
          <img src={home}></img>
        </div>
        <div className="text-center">홈</div>
      </Link>
      <Link to="/test" className="items-center text-gray-500">
        <div className="flex justify-center">
          <img src={map}></img>
        </div>
        <div className="text-center">지도</div>
      </Link>
    </footer>
  );
}
