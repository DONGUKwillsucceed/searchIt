import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import { printZoneService } from "../../backend/service/PrintZone.service";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { IPrinterData } from "../../common/types/interfaces";
import Menu from "../../common/components/menu";
import Header from "../../common/components/header";
import ColorOptions from "../../common/components/colorOptions";
import AddNewPlace from "../../common/components/addNewPlace";

export default function (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const [printers] = useState<IPrinterData[]>(props.data);

  return (
    <div className="font-Suit min-h-screen bg-gray-100">
      {openMenu ? <Menu setOpenMenu={setOpenMenu} /> : null}
      <Header hasBack={true} title={router.query.uniName} />

      <div className="mx-auto max-w-3xl ">
        <div className=" flex min-h-[calc(100vh-60px)] w-full flex-col justify-between rounded-b-md bg-white p-4">
          {printers.length > 0 ? (
            <div>
              {printers.map((printer: IPrinterData) => (
                <div
                  key={printer.id}
                  className="mb-2 flex w-full items-center justify-between border-b-2 border-gray-100 last:border-none hover:cursor-pointer"
                  onClick={() => {
                    router.push(`/printers/${printer.id}`);
                  }}
                >
                  <div className="p-2">
                    <div className="font-bold">{printer.company}</div>
                    <div className="text-xs font-semibold text-gray-400">
                      {printer.address_detail}
                    </div>
                    <div className="mt-2 flex text-xs">
                      <div className="mr-4 flex items-center">
                        <Image src="/file.svg" height={18} width={18}></Image>
                        Type
                      </div>
                      <ColorOptions printer={printer} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="my-auto flex justify-center">
              검색 결과가 없습니다
            </div>
          )}
          <AddNewPlace />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let data;
  if (typeof context.query.id === "string") {
    data = await printZoneService.findManyByTagId(context.query.id);
  }
  return { props: { data: JSON.parse(JSON.stringify(data)) } };
};
