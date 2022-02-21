import { Link } from "react-router-dom";
import Logo from "../Images/Logo.svg";

export default function Header_logo() {
  return (
    <header>
      <nav className="absolute inset-x-0 top-0 z-10 flex h-9 w-full items-center justify-center bg-white shadow-md">
        <Link to="/" className="text-xl text-gray-800">
          <img src={Logo}></img>
        </Link>
      </nav>
    </header>
  );
}
