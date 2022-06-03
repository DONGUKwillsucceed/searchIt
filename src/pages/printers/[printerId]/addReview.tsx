import { useState } from "react";
import { IPrinterDetail } from "../../../common/types/interfaces";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { printZoneService } from "../../../backend/service/PrintZone.service";
import AddButton from "../../../common/components/buttonPrimary";
import Image from "next/image";
import AddFixInfo from "../../../common/components/addInfo";
import Header from "../../../common/components/header";

export default function (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [printerDetail] = useState<IPrinterDetail>(props.data);
  const [printFixes, setPrintFixes] = useState<JSX.Element[]>([]);
  const [scanFixes, setScanFixes] = useState<JSX.Element[]>([]);
  const [copyFixes, setCopyFixes] = useState<JSX.Element[]>([]);
  const [isChangingInfo, setIsChangingInfo] = useState<boolean>(true);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header hasBack={true} isArrowBack={true} title="리뷰 남기기" />
      <div className="font-Suit mx-auto min-h-[calc(100vh-56px)] max-w-3xl rounded-b-md bg-white px-4 text-xl font-semibold">
        <div className="font-Suit mb-4 w-full">{printerDetail.company}</div>
        <form>
          <label className="text-sm text-gray-500">리뷰 작성</label>
          <textarea
            required
            placeholder="내용 입력"
            className="h-40 w-full resize-none rounded-md border-none bg-gray-100 p-2 text-sm"
          ></textarea>
        </form>
        <div className="py-2">
          <div className="text-sm text-gray-500">작성자 정보</div>
          <div className="flex">
            <div className="mr-2 rounded-md bg-gray-100 p-3 text-xs">
              &#129325;
            </div>
            <input
              placeholder="삶은계란"
              className="w-full rounded-md bg-gray-100 p-2 text-sm"
            ></input>
          </div>
        </div>

        <div className="py-2">
          <div className="flex ">
            <button
              className={`${
                isChangingInfo ? "bg-primary" : "bg-gray-200"
              } mr-2 flex items-center rounded-sm p-1 `}
              onClick={() => setIsChangingInfo(!isChangingInfo)}
            >
              <Image src={"/check.svg"} width={10} height={10}></Image>
            </button>
            <div className="text-sm text-gray-500">정보 변경 요청</div>
          </div>
        </div>
        <div className="mx-auto max-w-3xl bg-white p-4">
          <AddButton linkTo="/" content="등록하기"></AddButton>
        </div>
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
