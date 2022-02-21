import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Advertism from "./Advertisment";
import PrinterList from "./PrinterList";
import Header_logo from "../components/Header_Logo";
import Menu from "../components/Menu";

export default function App() {
  return (
    <>
      <Header_logo />
      <main className="mx-auto flex h-screen max-w-md flex-col pt-9">
        <Advertism />
        <div className="my-7 flex h-12 w-11/12 flex-col rounded-md text-lg font-bold sm:w-full">
          <div className="">프린터 찾기</div>
          <div className="flex w-full justify-between px-8">
            <button>District</button>
            <button>Unis</button>
          </div>
        </div>
        <PrinterList></PrinterList>
      </main>
      <Menu />
    </>
  );
}
