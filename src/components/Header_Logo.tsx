import { Link } from "react-router-dom";
import Logo from "../Images/Logo.svg";

export default function Header_logo() {
  return (
    <div>
      <nav className="sticky inset-x-0 top-0 flex h-16 w-full items-center justify-center bg-white">
        <Link to="/" className="text-xl text-gray-800">
          <img src={Logo}></img>
        </Link>
      </nav>
    </div>
  );
}
