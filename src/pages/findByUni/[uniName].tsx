import Image from "next/image";
import getPrinterCoords from "../../common/api/getPrinterCoords";
import { IPrinterData } from "../../common/types/interfaces";
import { useRouter } from "next/router";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import ColorOptions from "../../common/components/colorOptions";
import Menu from "../../common/components/menu";
import { useState, useEffect } from "react";
import Header from "../../common/components/header";
import axios from "axios";

export default function (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const [printers, setPrinters] = useState<IPrinterData[]>([]);

  useEffect(() => {
    axios
      .get(`/api/print-zones/universities/${router.query.id}`)
      .then((res) => {
        setPrinters(res.data);
      });
  }, []);

  return (
    <div className="font-Suit min-h-screen bg-gray-100">
      {openMenu ? <Menu setOpenMenu={setOpenMenu} /> : null}
      <Header hasBack={true} title={router.query.uniName} />
      <div className="mx-auto max-w-3xl ">
        <div className="my-3 flex w-full flex-col rounded-md bg-white p-3">
          {printers.map((printer: IPrinterData) => (
            <div
              key={printer.id}
              className="mb-2 flex w-full items-center justify-between border-b-2 hover:cursor-pointer"
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

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getPrinterCoords();

  return { props: { data } };
};
