import HeaderSearch from "./headerSearch";
import SearchBar from "./searchBar";
import Menu from "./menu";
import { useState } from "react";

export default function Search() {
  const [openMenu, setOpenMenu] = useState(false);
  const [search, setSearch] = useState("");
  return (
    <div className="relative z-10 h-screen bg-white">
      {openMenu ? <Menu setOpenMenu={setOpenMenu} /> : null}
      <HeaderSearch pageName={"전체 검색"} setOpenMenu={setOpenMenu} />
      <div className="mx-auto max-w-3xl">
        <SearchBar setSearch={setSearch} />
      </div>
    </div>
  );
}
