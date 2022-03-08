import backArrow from "../Images/backArrow.svg";
import { Link } from "react-router-dom";
export default function Map_search() {
  return (
    <div className="absolute z-10 w-full p-5 sm:max-w-3xl ">
      <div className="flex h-12 w-full items-center rounded-md bg-white p-5 shadow-md">
        <Link to="/">
          <img src={backArrow} />
        </Link>
      </div>
    </div>
  );
}
