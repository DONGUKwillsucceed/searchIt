import HeaderState from "../common/components/headerState";
import Menu from "../common/components/menu";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Index() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="font-Suit min-h-screen bg-gray-100">
      {openMenu ? <Menu setOpenMenu={setOpenMenu} /> : null}
      <HeaderState
        isImageTitle={true}
        imageTitleUrl={"/logo.svg"}
        stateChanger={setOpenMenu}
        rightButtonImage="/menu.svg"
      />
    </div>
  );
}
