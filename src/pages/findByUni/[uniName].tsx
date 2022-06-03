import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { printZoneService } from "../../backend/service/PrintZone.service";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import {
  IPaperSize,
  IPrinterData,
  IPrinterDetail,
  IUniPrinter,
} from "../../common/types/interfaces";
import Menu from "../../common/components/menu";
import Header from "../../common/components/header";
import ColorOptions from "../../common/components/colorOptions";
import AddNewPlace from "../../common/components/addNewPlace";
import UniPrinterList from "../../common/components/uniPrinterList";
import { paperService } from "../../backend/service/Paper.service";

export default function (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const [printers] = useState<IUniPrinter[]>(props.data);

  const [paperSize, setPaperSize] = useState<string[]>([]);
  const serviceType = ["인쇄", "스캔", "복사", "팩스"];
  const [repPaperSize, setRepPaperSize] = useState("A4");
  const [repServiceType, setRepServiceType] = useState("인쇄");
  console.log(printers);

  useEffect(() => {
    props.paperSize.map((paper: IPaperSize) => {
      setPaperSize((prev) => [...prev, paper.name]);
    });
  }, []);

  return (
    <div className="font-Suit min-h-screen bg-gray-100">
      {openMenu ? <Menu setOpenMenu={setOpenMenu} /> : null}
      <Header hasBack={true} title={router.query.uniName} />

      <div className="mx-auto max-w-3xl ">
        <div className=" flex min-h-[calc(100vh-60px)] w-full flex-col justify-between rounded-b-md bg-white p-4">
          {printers.length > 0 ? (
            <div>
              {printers.map((printer: IUniPrinter) => (
                <UniPrinterList
                  key={printer.id}
                  printer={printer}
                  services={printer.Services}
                  paperSize={paperSize}
                  serviceType={serviceType}
                  repPaperSize={repPaperSize}
                  repServiceType={repServiceType}
                ></UniPrinterList>
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
  const paperSize = await paperService.findPaperSizeMany();
  if (typeof context.query.id === "string") {
    data = await printZoneService.findManyByTagId(context.query.id);
  }
  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
      paperSize: JSON.parse(JSON.stringify(paperSize)),
    },
  };
};
