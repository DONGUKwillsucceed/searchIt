import { Link } from "react-router-dom";
import Logo from "../Images/Logo.svg";

export default function Header_logo() {
  return (
    <nav className="sticky top-0 z-10 flex h-16 w-full items-center justify-center bg-white">
      <Link to="/" className="text-xl text-gray-800">
        <img src={Logo}></img>
      </Link>
    </nav>
  );
}
