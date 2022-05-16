import SearchBarUni from "../../common/components/searchBarUni";
import Menu from "../../common/components/menu";
import { useState } from "react";
import { UniList } from "../../common/types/interfaces";
import Link from "next/link";
import Header from "../../common/components/header";
import { tagService } from "../../backend/service/Tag.service";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function University(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [uniList, setUniList] = useState([]);

  const [openMenu, setOpenMenu] = useState(false);
  const [search, setSearch] = useState("");
  console.log("props: ", props);

  return (
    <div className="min-h-screen bg-gray-100">
      {openMenu ? <Menu setOpenMenu={setOpenMenu} /> : null}
      <Header hasBack={true} title={"대학별"} />
      <main className="mx-auto max-w-3xl ">
        <div className=" flex w-full flex-col rounded-b-md bg-white p-4 pb-0">
          <SearchBarUni setSearch={setSearch} />
          <div className="my-4 w-full">
            {props.univWithCount.map((uni: UniList) => {
              if (
                uni.university.toLowerCase().indexOf(search) > -1 ||
                uni.university.indexOf(search) > -1
              ) {
                return (
                  <div key={uni.id} className="mt-4 first:mt-0">
                    <UniButtons
                      name={uni.university}
                      count={uni.count}
                      id={uni.id}
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

export function UniButtons(props: { name: string; count: number; id: string }) {
  return (
    <Link
      href={{
        pathname: `/findByUni/${props.name}`,
        query: { id: `${props.id}` },
      }}
    >
      <button className="font-Suit flex h-10 w-full items-center justify-between text-lg">
        <div>{`${props.name}`}</div>
        <div className="text-gray-500">{props.count}</div>
      </button>
    </Link>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const univWithCount = await tagService.findManyByTagTypeWithPrintZoneCount(
    "university"
  );

  return { props: { univWithCount } };
};
