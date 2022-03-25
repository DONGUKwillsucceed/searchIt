import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IPrinterDetail } from "../../src/Interfaces";
import Image from "next/image";
import Header_PrinterDetail from "../../lib/components/Header_PrinterDetail";

import { GetPrinterDetail } from "../../lib/api/GetPrinterDetail";
import { isConstructorDeclaration } from "typescript";

export default function () {
  const router = useRouter();
  let currentPageUrl: string | string[] | undefined;
  const [printerDetail, setPrinterDetail] = useState<IPrinterDetail>();

  if (router.query.printerId) {
    currentPageUrl = router.query.printerId;
  }
  let placeImage: string | string[] | undefined = "/";
  let printerImage: string | string[] | undefined = "/";
  if (printerDetail) {
    placeImage = printerDetail.imageUrl;
    printerImage = printerDetail.printer.imageUrl;
  }

  useEffect(() => {
    async function fetchPrinterDetail() {
      const data = await GetPrinterDetail(currentPageUrl);
      setPrinterDetail(data);
    }
    if (currentPageUrl !== undefined) {
      fetchPrinterDetail();
    }
  }, [currentPageUrl]);

  console.log("PD =", printerDetail);
  console.log("link = ", printerDetail?.imageUrl);
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
            {/* <Image
              alt="printer"
              src={imageLink}
              width={300}
              height={300}
              className="rounded-md "
            ></Image> */}
            <img
              src={printerDetail?.imageUrl}
              className="max-h-80 rounded-md"
            ></img>
          </div>
        </div>

        {/*Address / PhoneNum */}
        <div className="mx-auto mt-4 w-10/12">
          <div className="bg-secondary mb-2 flex h-10 items-center rounded-md px-3">
            <div className="pr-3 text-xs">주소</div>
            <div>{printerDetail?.address}</div>
            {/* <div className="">복사</div> */}
          </div>
        </div>

        {/*Price*/}
        <div className="font-Suit mx-auto w-10/12">
          <div className="mb-1 flex w-full justify-between text-xs font-bold text-gray-500">
            <div> 가격</div>
            <div> 한 페이지 당</div>
          </div>
          <div className="bg-secondary flex h-16 items-center justify-between rounded-md px-3">
            <Image src="/mono.svg" width={24} height={24}></Image>
            <div>{printerDetail?.priceMono}원</div>
          </div>
        </div>

        <div className="font-Suit mx-auto mt-4 w-10/12">
          <div className="font-Suit mb-3 text-xs font-bold text-gray-500">
            장소 소개
          </div>
          <div className="scrollbar-thin scrollbar-thumb-slate-300 scrollbar- max-h-40 overflow-y-scroll whitespace-normal text-gray-500 ">
            {printerDetail?.description}
          </div>
        </div>

        <div className="font-Suit mx-auto mt-4 w-10/12">
          <div className="text-xs font-bold text-gray-500">프린터 정보</div>
          <Image src={printerImage} width={256} height={161}></Image>
          <div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </main>
    </>
  );
}
