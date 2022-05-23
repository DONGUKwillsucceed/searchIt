import HeaderSearch from "./headerSearch";
import SearchBar from "./searchBar";
import Menu from "./menu";
import { useState } from "react";

export default function SearchAllDesktop() {
  const [openMenu, setOpenMenu] = useState(false);
  const [search, setSearch] = useState("");
  return (
    <div className="font-Suit relative z-10 h-screen bg-white px-4 pt-10">
      <div className="text-lg font-bold my-4">프린터 찾기</div>
      <div>
        <SearchBar setSearch={setSearch} />
      </div>
    </div>
  );
}
