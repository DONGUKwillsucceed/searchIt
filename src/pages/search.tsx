import HeaderSearch from "../common/components/headerSearch";
import SearchBar from "../common/components/searchBar";

export default function () {
  return (
    <div>
      <HeaderSearch pageName={"전체 검색"} />
      <div className="mx-auto max-w-3xl">
        <SearchBar />
      </div>
    </div>
  );
}
