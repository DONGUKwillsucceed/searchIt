import HeaderSearch from "../../common/components/headerSearch";
import Image from "next/image";
import getPrinterCoords from "../../common/api/getPrinterCoords";
import { IPrinterData } from "../../common/types/interfaces";
import { useRouter } from "next/router";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import ColorOptions from "../../common/components/colorOptions";
import Menu from "../../common/components/menu";
import { useState } from "react";

export default function (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="font-Suit min-h-screen bg-gray-100">
      {openMenu ? <Menu setOpenMenu={setOpenMenu} /> : null}
      <HeaderSearch pageName={router.query.uniName} />
      <div className="mx-auto max-w-3xl ">
        <div className="my-3 flex w-full flex-col rounded-md bg-white p-3">
          {props.data.map((printer: IPrinterData) => (
            <div
              key={printer.id}
              className="mb-2 flex w-full items-center justify-between border-b-2 hover:cursor-pointer"
              onClick={() => {
                router.push(`/printers/${printer.id}`);
              }}
            >
              <div className="p-2">
                <div className="font-bold">{printer.name}</div>
                <div className="text-xs font-semibold text-gray-400">
                  Address
                </div>
                <div className="mt-2 flex text-xs">
                  <div className="mr-4 flex items-center">
                    <Image src="/file.svg" height={18} width={18}></Image>
                    Type
                  </div>
                  {/* <div>{tempColorOptions(printer)}</div> */}
                  <ColorOptions printer={printer} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
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
