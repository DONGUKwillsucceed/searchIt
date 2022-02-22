import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Advertism from "./Advertisment";
import PrinterList from "./PrinterList";
import Header_logo from "../components/Header_Logo";
import Menu from "../components/Menu";
import District from "../Images/District.svg";
import University from "../Images/University.svg";
export default function App() {
  return (
    <>
      <Header_logo />
      <main className="mx-auto flex h-screen max-w-md flex-col pt-14">
        <Advertism />
        <div className="mt-8 flex h-fit w-full flex-col justify-between rounded-md p-4 text-lg font-bold sm:w-full">
          <div className="pb-4">프린터 찾기</div>
          <div className="flex w-full justify-around">
            <button className="font-Suit w-10/21 flex h-10 items-center justify-center rounded-md border-2 p-1 text-gray-500">
              <img src={District} className="pr-2"></img>
              <div className="text-xs">행정구역별</div>
            </button>
            <button className="font-Suit w-10/21 flex h-10 items-center justify-center rounded-md border-2 p-1 text-gray-500">
              <img src={University} className="pr-2"></img>
              <div className="text-xs">대학별</div>
            </button>
          </div>
        </div>
        <PrinterList></PrinterList>
      </main>
      <Menu currentPage="Home" />
    </>
  );
}
