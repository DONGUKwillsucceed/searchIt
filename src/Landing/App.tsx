import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../Images/Logo.svg";
import PrinterList from "./PrinterList";

export default function App() {
  return (
    <>
      <header>
        <nav className="absolute inset-x-0 top-0 flex h-9 w-full items-center justify-center shadow-md">
          <Link to="/" className="text-xl text-gray-800">
            <img src={Logo}></img>
          </Link>
        </nav>
      </header>

      <main className="mx-auto flex h-screen max-w-md flex-col pt-9">
        <div className="mx-auto my-4 flex h-12 w-11/12 items-center rounded-md bg-gray-100 p-4 sm:w-full">
          프린터 찾기
        </div>
        <PrinterList></PrinterList>
      </main>

      <footer className="absolute inset-x-0 bottom-0 flex h-12 w-full justify-evenly border-t-2 p-2">
        <Link to="/" className="text-gray-500">
          홈
        </Link>
        <Link to="/test" className="text-gray-500">
          지도
        </Link>
      </footer>
    </>
  );
}
