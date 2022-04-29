import HeaderSearch from "../common/components/headerSearch";
import SearchBar from "../common/components/searchBar";
import Menu from "../common/components/menu";
import { useState } from "react";

export default function Search() {
  const [openMenu, setOpenMenu] = useState(false);
  const [search, setSearch] = useState("");
  return (
    <div className="relative z-10 h-screen bg-white">
      {openMenu ? <Menu setOpenMenu={setOpenMenu} /> : null}
      <HeaderSearch pageName={"전체 검색"} setOpenMenu={setOpenMenu} />
      <div className="mx-auto max-w-3xl p-4">
        <SearchBar setSearch={setSearch} />
      </div>
    </div>
  );
}