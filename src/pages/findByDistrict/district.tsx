import Image from "next/image";
import Header_FindPrinter from "../../common/components/headerDistrict";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import getPrinterCoords from "../../common/api/getPrinterCoords";
import { IPrinterData } from "../../common/types/interfaces";
import { useRouter } from "next/router";
import SearchBar from "../../common/components/searchBar";

export default function (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();

  return (
    <>
      <Header_FindPrinter />
      <main className="mx-auto flex max-w-3xl flex-col">
        <div className="flex h-32 w-full items-end bg-gray-200">
          <div className="bg-primary h-3/5 w-2/3 p-3 text-white">
            <div className="mb-1 text-xs">가장 가까운 프린트 - 프린트잇</div>
            <div className="text-3xl">행정구역별</div>
          </div>
        </div>

        <div className="my-2">
          <SearchBar />
        </div>

        <div className="mx-auto h-fit w-11/12">
          {props.data.map((printer: IPrinterData) => (
            <div
              key={printer.id}
              className="mb-2 flex w-full items-center justify-between border-b-2 hover:cursor-pointer"
              onClick={() => {
                router.push(`/printers/${printer.id}`);
              }}
            >
              {console.log(printer)}
              <div className="p-2">
                <div className="font-bold">{printer.name}</div>
                <div className="text-xs font-semibold text-gray-400">
                  Address
                </div>
                <div className="flex text-xs">
                  <div className="mr-4">Type</div>
                  <div>{tempColorOptions(printer)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export function tempColorOptions(printer: IPrinterData) {
  if (printer.c && printer.m) {
    return (
      <div className="flex">
        <div className="flex items-center justify-between">
          <Image src="/Color.svg" width={16} height={16}></Image>
          <div className="ml-1">Price</div>
        </div>
        <div className="ml-2 flex items-center justify-between ">
          <Image src="/mono.svg" width={16} height={16}></Image>
          <div className="ml-1">Price</div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        {printer.c ? (
          <div className="flex items-center justify-between">
            <Image src="/Color.svg" width={16} height={16}></Image>
            <div className="ml-1">Price</div>
          </div>
        ) : (
          <div className="ml-2 flex items-center justify-between ">
            <Image src="/mono.svg" width={16} height={16}></Image>
            <div className="ml-1">Price</div>
          </div>
        )}
      </div>
    );
  }
}
export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getPrinterCoords();

  return { props: { data } };
};
