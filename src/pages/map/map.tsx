import React from "react";
import { Link } from "react-router-dom";
import { NaverMap } from "react-naver-maps";
import Logo from "../../Images/Logo.svg";

export default function Test() {
  return (
    <div>
      <nav className="flex h-9 w-full items-center justify-center shadow-md">
        <Link to="/" className="text-xl text-gray-800">
          <img src={Logo}></img>
        </Link>
      </nav>
      <main>
        <NaverMap
          ncpClientId="mju0v203tf"
          style={{
            width: "100%",
            height: "600px",
          }}
        ></NaverMap>
      </main>

      <footer className="absolute inset-x-0 bottom-0 flex h-12 w-full justify-evenly border-t-2 p-2">
        <Link to="/" className="text-gray-500">
          홈
        </Link>
        <Link to="/test" className="text-gray-500">
          지도
        </Link>
      </footer>
    </div>
  );
}
