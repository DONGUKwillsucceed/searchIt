import AddFixInfo from "../../../common/components/addFixInfo";
import { useState } from "react";
import { IPrinterDetail } from "../../../common/types/interfaces";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { printZoneService } from "../../../backend/service/PrintZone.service";
import Header from "../../../common/components/header";

export default function (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [printerDetail] = useState<IPrinterDetail>(props.data);
  const [printFixes, setPrintFixes] = useState<JSX.Element[]>([]);
  const [scanFixes, setScanFixes] = useState<JSX.Element[]>([]);
  const [copyFixes, setCopyFixes] = useState<JSX.Element[]>([]);

  return (
    <div>
      <Header
        hasBack={true}
        isArrowBack={true}
        title={"정보 변경 요청"}
      ></Header>
      <div className="mx-auto max-w-3xl">
        <div>
          {printFixes}
          {scanFixes}
          {copyFixes}
        </div>
        {/* <AddFixInfo
          fixType="인쇄"
          fixList={printFixes}
          setFixList={setPrintFixes}
          priceColor={printerDetail.priceColor}
          priceMono={printerDetail.priceMono}
        ></AddFixInfo>
        <AddFixInfo
          fixType="스캔"
          fixList={scanFixes}
          setFixList={setScanFixes}
          priceColor={printerDetail.priceColor}
          priceMono={printerDetail.priceMono}
        ></AddFixInfo>
        <AddFixInfo
          fixType="복사"
          fixList={copyFixes}
          setFixList={setCopyFixes}
          priceColor={printerDetail.priceColor}
          priceMono={printerDetail.priceMono}
        ></AddFixInfo> */}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let data;
  if (typeof context.query.printerId === "string") {
    data = await printZoneService.findUnique(context.query.printerId);
  }
  return { props: { data: JSON.parse(JSON.stringify(data)) } };
};
