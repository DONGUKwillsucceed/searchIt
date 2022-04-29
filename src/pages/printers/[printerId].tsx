import { useState } from "react";
import { IPrinterDetail } from "../../common/types/interfaces";
import Image from "next/image";
import Header_PrinterDetail from "../../common/components/headerPrinterDetail";
import PrinterDetail_Introduction from "../../common/components/printerDetail_Introduction";
import { getPrinterDetail } from "../../common/api/getPrinterDetail";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import PrinterDetail_Price from "../../common/components/printerDetail_Price";
import { useRouter } from "next/router";
import { useStoreActions, useStoreState } from "../../common/utils/globalState";

export default function (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [printerDetail] = useState<IPrinterDetail>(props.data);
  const [dropDownActive, setDropDownActive] = useState<boolean>(false);
  const router = useRouter();
  const setSearchPrinterOnMap = useStoreActions(
    (actions) => actions.setSearchPrinterOnMap
  );
  const searchPrinterOnMap = useStoreState((store) => store.searchPrinterOnMap);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header_PrinterDetail
        name={printerDetail?.name}
        color={printerDetail?.priceColor}
        mono={printerDetail?.priceMono}
      />
      <main className="mx-auto max-w-3xl">
        <div className="rounded-md bg-white p-4">
          <div className="mx-auto w-full rounded-md">
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
          <div className="font-Suit mt-4 w-full">
            <div
              className="border-primary text-primary mb-2 flex h-12 w-full items-center justify-center rounded-md border-2 bg-white hover:cursor-pointer"
              onClick={() => {
                setSearchPrinterOnMap({
                  ...searchPrinterOnMap,
                  center: {
                    lat: printerDetail?.coordinate?.latitude,
                    lng: printerDetail?.coordinate?.longitude,
                  },
                }),
                  router.push("/map");
              }}
            >
              <div className="mr-2">
                <Image src="/map_primary.svg" width={16} height={16}></Image>
              </div>
              <div className="text-xs">지도보기</div>
            </div>

            <div className="bg-secondary font-Suit mb-2 flex h-10 flex-row items-center justify-between rounded-md px-3 ">
              <div className="flex w-9/12 items-center justify-between">
                <div className="mr-2 w-8 text-xs">주소</div>
                <div className="scrollbar-none w-full overflow-scroll whitespace-nowrap text-sm">
                  {printerDetail?.address}
                </div>
              </div>
              <button
                className="ml-2 rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-500 active:bg-gray-300"
                onClick={() =>
                  navigator.clipboard.writeText(printerDetail?.address)
                }
              >
                주소 복사
              </button>
            </div>
            <div className="bg-secondary font-Suit mb-2 flex h-10 items-center justify-between rounded-md px-3 ">
              <div className="flex">
                <div className=" pr-3 text-xs">전화번호</div>
                <div className="text-sm">
                  {printerDetail?.maintainer?.phoneNumber}
                </div>
              </div>
              <button
                className="ml-2 rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-500 active:bg-gray-300"
                onClick={() =>
                  window.open(`tel:${printerDetail?.maintainer?.phoneNumber}`)
                }
              >
                전화걸기
              </button>
            </div>
          </div>

          {/*Price*/}
          <PrinterDetail_Price printerDetail={printerDetail} />

          {/*Introduction*/}
          <PrinterDetail_Introduction
            printerDetail={printerDetail}
            dropDownActive={dropDownActive}
          />
          <button
            onClick={() => setDropDownActive(!dropDownActive)}
            className="font-Suit mt-2 flex w-full justify-center p-2 text-sm text-gray-500"
          >
            <div className="flex ">
              <div className="mr-2">{dropDownActive ? "접기" : "더보기"}</div>
              <Image
                src="/dropDownArrow.svg"
                width={12}
                height={8}
                className={`${dropDownActive ? "" : "rotate-180"}`}
              />
            </div>
          </button>

          <div>
            <div className="flex w-full items-center justify-between">
              <div className="text-sm font-semibold text-gray-500">리뷰</div>
              <button className="bg-primary/20 text-primary rounded-md px-3 py-2 text-xs ">
                리뷰 작성
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await getPrinterDetail(context.query.printerId);

  return { props: { data } };
};
