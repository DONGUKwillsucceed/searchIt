import { Link } from "react-router-dom";
import Logo from "../Images/Logo.svg";
import backArrow from "../Images/backArrow.svg";

export default function Header_District() {
  const currentPageUrl = window.location.href.split("/")[3];
  const headerTitle = currentPageUrl === "findByUni" ? "대학별" : "행정구역별";
  return (
    <header>
      <nav className="font-Suit fixed inset-x-0 top-0 z-10 mx-auto flex max-w-3xl items-center justify-between bg-white px-5 py-3">
        <Link to="/" className="text-xl text-gray-800">
          <img src={backArrow}></img>
        </Link>
        <div className="font-Suit">{headerTitle}</div>
        <div></div>
      </nav>
    </header>
  );
}
