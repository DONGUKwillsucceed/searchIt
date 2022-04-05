import Image from "next/image";
import Header_FindPrinter from "../../common/components/Header_FindPrinter";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import GetPrinterCoords from "../../common/api/GetPrinterCoords";
import { IPrinterData } from "../../common/types/Interfaces";
import { useRouter } from "next/router";

export default function (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();
  const currentPageUrl = router.query.type;
  const headerTitle = currentPageUrl === "FindByUni" ? "대학별" : "행정구역별";

  return (
    <>
      <Header_FindPrinter headerTitle={headerTitle} />
      <main className="mx-auto flex max-w-3xl flex-col">
        <div className="flex h-32 w-full items-center justify-center bg-gray-200">
          {headerTitle}
        </div>
        <div className="scrollbar-thin mt-9 h-36 w-full items-center overflow-y-scroll pt-5 sm:max-w-3xl">
          <div className="mx-auto flex h-10 w-11/12 items-center rounded-md bg-gray-200 px-2 ">
            <Image src="/search.svg" width={24} height={24}></Image>
          </div>
        </div>
        <div className="mx-auto h-fit w-11/12">
          {props.data.map((printer: IPrinterData) => (
            <div
              key={printer.id}
              className="mr-2 mb-2 h-full snap-start justify-center rounded-sm border-b-2 hover:cursor-pointer"
              onClick={() => {
                router.push(`/printers/${printer.id}`);
              }}
            >
              <div className="flex">
                <div className="my-5 ml-1 mr-3 flex w-6 items-center justify-center rounded-md">
                  {printer.c ? (
                    <Image
                      src="/color.svg"
                      width={16}
                      height={16}
                      className="h-6 w-6"
                    />
                  ) : (
                    <Image
                      src="/mono.svg"
                      width={16}
                      height={16}
                      className="h-6 w-6"
                    />
                  )}
                </div>
                <div className="flex w-full flex-row items-center justify-between ">
                  <div className="ml-2 flex h-full flex-col justify-between py-2 font-bold">
                    <div>{printer.name}</div>
                    <div className="flex">
                      <div className="text-xs text-gray-400">
                        Address
                        {/* {CoordsToAddress(printer.lon, printer.lat)} */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await GetPrinterCoords();

  return { props: { data } };
};
