import { useState } from "react";
import { IPrinterDetail, IReply } from "../../../common/types/interfaces";
import Image from "next/image";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import {
  useStoreActions,
  useStoreState,
} from "../../../common/utils/globalState";
import { printZoneService } from "../../../backend/service/PrintZone.service";
import { replyService } from "../../../backend/service/Reply.service";
import PrinterDetail_Introduction from "../../../common/components/printerDetail_Introduction";
import Link from "next/link";
import PrinterDetail_Price from "../../../common/components/printerDetail_Price";
import PaperSizeDropDown from "../../../common/components/paperSizeDropDown";
import Review from "../../../common/components/review";
import Header from "../../../common/components/header";
import Tags from "../../../common/components/tags";

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
  const [hasMono, setHasMono] = useState<boolean>(false);
  const [hasColor, setHasColor] = useState<boolean>(false);
  const [isDropDown, setIsDropDown] = useState(false);
  const [showPaperSizeId, setShowPaperSizeId] = useState<string>(
    "9c0394a8-f1a6-469b-be12-324f10e63e1e"
  );
  const [showPaperSize, setShowPaperSize] = useState<string>("A4");
  const tags = printerDetail.tags.map((tag) => (
    <Tags key={tag.id} tagName={tag.value} />
  ));

  const reviews = props.review.map((review: IReply) => (
    <div key={review.id}>
      <Review
        name={review.writer_name}
        content={review.comment}
        date={review.created_at}
        state={review.status}
      />
    </div>
  ));

  // console.log(printerDetail.images);
  console.log(printerDetail);

  useState(() => {
    printerDetail.services.forEach((service) => {
      if (service.color_type === "mono") {
        setHasMono(true);
      } else if (service.color_type === "color") {
        setHasColor(true);
      }
    });
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {isDropDown && (
        <PaperSizeDropDown
          services={printerDetail.services}
          setShowPaperSize={setShowPaperSize}
          showPaperSizeId={showPaperSizeId}
          setShowPaperSizeId={setShowPaperSizeId}
          isDropDown={isDropDown}
          setIsDropDown={setIsDropDown}
        />
      )}

      <Header
        hasBack={true}
        hasRightButton={true}
        rightButtonImage={"/share.svg"}
      />

      <main className="mx-auto max-w-3xl">
        <div className="min-h-[calc(100vh-56px)] rounded-b-md bg-white px-4">
          <div className="font-Suit mb-2 w-full text-lg font-bold">
            {printerDetail.company}
          </div>
          <div className="flex w-full">
            <ColorType hasColor={hasColor} hasMono={hasMono} />
            <div className="font-Suit pl-2 text-sm text-gray-500">
              {props.color === 0 ? "??????" : "?????? ??????"}
              {" ?????? ??????"}
            </div>
          </div>
          <div className="mt-2 flex w-full space-x-2">{tags}</div>
          <div className="mx-auto w-full rounded-md">
            <div className="bg-secondary flex justify-center">
              {/* {printerDetail.images.length > 0 ? (
                <Image
                  alt="printer"
                  src={printerDetail.images}
                  width={292}
                  height={194}
                  className="rounded-md "
                ></Image>
              ) : null} */}
            </div>
          </div>
          {/*Address / PhoneNum */}
          <div className="font-Suit my-4 w-full">
            <div
              className="border-primary text-primary mb-2 flex h-12 w-full items-center justify-center rounded-md border-2 bg-white hover:cursor-pointer"
              onClick={() => {
                setSearchPrinterOnMap({
                  ...searchPrinterOnMap,
                  center: {
                    lat: printerDetail.latitude,
                    lng: printerDetail.longitude,
                  },
                }),
                  router.push("/map");
              }}
            >
              <div className="mr-2">
                <Image src="/map_primary.svg" width={16} height={16}></Image>
              </div>
              <div className="text-xs">????????????</div>
            </div>

            <div className="bg-secondary font-Suit mb-2 flex h-10 flex-row items-center justify-between rounded-md px-3 ">
              <div className="flex w-9/12 items-center justify-between">
                <div className="mr-2 w-8 text-xs">??????</div>
                <div className="scrollbar-none w-full overflow-scroll whitespace-nowrap text-sm">
                  {printerDetail.address}
                </div>
              </div>
              <button
                className="ml-2 rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-500 active:bg-gray-300"
                onClick={() =>
                  navigator.clipboard.writeText(printerDetail.address)
                }
              >
                ?????? ??????
              </button>
            </div>
            <div className="bg-secondary font-Suit mb-2 flex h-10 items-center justify-between rounded-md px-3 ">
              <div className="flex">
                <div className=" flex items-center pr-3 text-xs">????????????</div>
                <div className="text-sm">{printerDetail.phone_number}</div>
              </div>
              <Link href={`tel:${printerDetail.phone_number}`}>
                <button className="ml-2 rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-500 active:bg-gray-300">
                  ????????????
                </button>
              </Link>
            </div>
          </div>

          {/*Price*/}

          <div className="flex w-full items-center justify-between space-x-4 text-xs">
            <div className="font-semibold text-gray-500">?????? ?????????</div>
            <button
              className="flex items-center rounded-md border-2 px-3 py-2"
              onClick={() => setIsDropDown(!isDropDown)}
            >
              <div className="mr-2">{showPaperSize}</div>
              <Image
                src="/dropDownArrow.svg"
                className="rotate-180"
                width={12}
                height={8}
              ></Image>
            </button>
          </div>
          <PrinterDetail_Price
            services={printerDetail.services}
            serviceType={"??????"}
            showPaperSizeId={showPaperSizeId}
            hasColor={hasColor}
            hasMono={hasMono}
          />
          <PrinterDetail_Price
            services={printerDetail.services}
            serviceType={"??????"}
            showPaperSizeId={showPaperSizeId}
            hasColor={hasColor}
            hasMono={hasMono}
          />
          <PrinterDetail_Price
            services={printerDetail.services}
            serviceType={"??????"}
            showPaperSizeId={showPaperSizeId}
            hasColor={hasColor}
            hasMono={hasMono}
          />
          <div className="my-4 flex w-full flex-row-reverse">
            <Link href={`/printers/${printerDetail.id}/fixDetails`}>
              <button className=" flex items-center  rounded-md border-2 border-gray-300 px-3 py-2 text-xs ">
                <Image src="/info.svg" width={12} height={12} />
                <div className="ml-1 text-gray-400"> ?????? ?????? ??????</div>
              </button>
            </Link>
          </div>

          {/* banner */}
          {printerDetail.banner_html ? (
            <div className="bg-primary flex h-40 w-full items-center justify-center font-bold text-white">
              ???????????? ????????? ??????
            </div>
          ) : null}

          {/*Introduction*/}
          <PrinterDetail_Introduction
            printerDetail={printerDetail}
            dropDownActive={dropDownActive}
          />
          <button
            onClick={() => setDropDownActive(!dropDownActive)}
            className="font-Suit my-4 flex w-full justify-center text-sm text-gray-500"
          >
            <div className="flex ">
              <div className="mr-2">{dropDownActive ? "??????" : "?????????"}</div>
              <Image
                src="/dropDownArrow.svg"
                width={12}
                height={8}
                className={`${dropDownActive ? "" : "rotate-180"}`}
              />
            </div>
          </button>
          <div className="my-4">
            <div className="mb-3 flex w-full items-center justify-between">
              <div className="text-sm font-semibold text-gray-500">??????</div>
              <Link href={`${printerDetail.id}/addReview`}>
                <button className="bg-primary/20 text-primary rounded-md px-3 py-2 text-xs font-semibold ">
                  ?????? ??????
                </button>
              </Link>
            </div>
            <div>
              {reviews.length > 0 ? (
                reviews
              ) : (
                <div className="font-Suit mb-4 flex flex-col rounded-md p-4 text-sm">
                  <div className="flex justify-center text-xs ">
                    ?????? ????????? ????????? ????????????
                  </div>
                </div>
              )}
            </div>

            <Link href={`/printers/${printerDetail?.id}/reviews`}>
              <button className="my-4 flex w-full items-center justify-center">
                <div className="font-Suit mr-2 text-sm text-gray-500">
                  ?????????
                </div>
                <Image
                  src="/dropDownArrow.svg"
                  width={12}
                  height={12}
                  className="rotate-90"
                ></Image>
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export function ColorType(props: { hasMono: boolean; hasColor: boolean }) {
  if (props.hasMono && props.hasColor) {
    return <Image src="/bothColor.svg" width={16} height={16}></Image>;
  } else {
    return (
      <Image
        src={props.hasMono ? "/mono.svg" : "/color.svg"}
        width={16}
        height={16}
      ></Image>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let data;
  let review;
  if (typeof context.query.printerId === "string") {
    data = await printZoneService.findUnique(context.query.printerId);
    review = await replyService.findManyByPrintZoneId(
      context.query.printerId,
      0,
      3
    );
  }
  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
      review: JSON.parse(JSON.stringify(review)),
    },
  };
};
