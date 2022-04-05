import { useState } from "react";
import { IPrinterDetail } from "../../common/types/Interfaces";
import Image from "next/image";
import Header_PrinterDetail from "../../common/components/Header_PrinterDetail";
import PrinterDetail_Introduction from "../../common/components/PrinterDetail_Introduction";
import { GetPrinterDetail } from "../../common/api/GetPrinterDetail";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import PrinterDetail_Price from "../../common/components/PrinterDetail_Price";

export default function (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [printerDetail, setPrinterDetail] = useState<IPrinterDetail>(
    props.data
  );
  const [dropDownActive, setDropDownActive] = useState<boolean>(false);

  // console.log(printerDetail);
  return (
    <>
      <Header_PrinterDetail
        name={printerDetail?.name}
        color={printerDetail?.priceColor}
        mono={printerDetail?.priceMono}
      />
      <main className="mx-auto flex h-screen max-w-3xl flex-col">
        <div className="mx-auto mt-32 w-10/12 flex-col pt-5 sm:max-w-3xl">
          <div className="bg-secondary flex justify-center">
            <Image
              alt="printer"
              src={printerDetail?.imageUrl}
              width={292}
              height={194}
              className="rounded-md "
            ></Image>
          </div>
        </div>

        {/*Address / PhoneNum */}
        <div className="mx-auto mt-4 w-10/12">
          <div className="bg-secondary font-Suit mb-2 flex h-10 items-center rounded-md px-3 ">
            <div className=" pr-3 text-xs">주소</div>
            <div className="text-sm">{printerDetail?.address}</div>
          </div>
          <div className="bg-secondary font-Suit mb-2 flex h-10 items-center rounded-md px-3 ">
            <div className=" pr-3 text-xs">전화번호</div>
            <div className="text-sm">
              {printerDetail?.maintainer?.phoneNumber}
            </div>
          </div>
        </div>

        {/*Price*/}
        <PrinterDetail_Price printerDetail={printerDetail} />
        <PrinterDetail_Introduction
          printerDetail={printerDetail}
          dropDownActive={dropDownActive}
        />
        <button
          onClick={() => setDropDownActive(!dropDownActive)}
          className="font-Suit mx-auto mt-2 flex h-10 w-10/12 justify-center text-sm text-gray-500"
        >
          {dropDownActive ? (
            <div className="flex ">
              <div className="mr-2">접기</div>
              <Image src="/dropDownArrow.svg" width={12} height={8} />
            </div>
          ) : (
            <div className="flex">
              <div className="mr-2">더보기</div>
              <Image
                src="/dropDownArrow.svg"
                width={12}
                height={8}
                className="rotate-180"
              />
            </div>
          )}
        </button>

        <div className="font-Suit mx-auto mt-4 w-10/12">
          <div className="mb-2 text-xs font-bold text-gray-500">
            프린터 정보
          </div>

          <div className="mb-2 flex w-full justify-center">
            <div className="w-32">
              <Image
                src={printerDetail?.printer.imageUrl}
                width={300}
                height={300}
                layout="responsive"
              ></Image>
            </div>
          </div>

          <div className="mb-3 w-full text-xs text-gray-500">
            <div className="flex justify-between ">
              <span>모델명</span>
              <span>{printerDetail.printer.name}</span>
            </div>
            <div className="flex justify-between">
              <span>출력속도</span>
              <span>{printerDetail.printer.ppm}</span>
            </div>
            <div className="flex justify-between">
              <span>해상도</span>
              <span>{printerDetail.printer.resolution}</span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await GetPrinterDetail(context.query.printerId);

  return { props: { data } };
};