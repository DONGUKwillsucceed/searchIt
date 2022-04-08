import HeaderUniversity from "../../common/components/headerUniversity";
import SearchBar from "../../common/components/searchBar";

export function University() {
  let uniList = [];
  const testAmount = 451;
  for (let i = 0; i < testAmount; i++) {
    uniList.push(
      <div key={i}>
        <UniButtons id={i} />
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-3xl">
      <HeaderUniversity />
      <SearchBar />
      <div className=" mx-auto my-4 w-11/12">{uniList}</div>
    </div>
  );
}

export function UniButtons(props: { id: number }) {
  return (
    <button
      className="my-2 flex h-10 w-full items-center justify-between text-lg"
      onClick={() => console.log("id = ", props.id)}
    >
      <div>University </div>
      <div>Amount</div>
    </button>
  );
}

export default University;
