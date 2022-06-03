import { useRouter } from "next/router";
import { useState } from "react";
import { IPrinterDetail } from "../../../common/types/interfaces";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { printZoneService } from "../../../backend/service/PrintZone.service";
import { replyService } from "../../../backend/service/Reply.service";
import Review from "../../../common/components/review";
import Header from "../../../common/components/header";
import { IReply } from "../../../common/types/interfaces";
import Image from "next/image";

export default function (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  console.log(props);
  const router = useRouter();
  const [printerDetail] = useState<IPrinterDetail>(props.data);
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

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        hasBack={true}
        title={"리뷰"}
        hasRightButton={true}
        rightButtonLink={"/printers/" + printerDetail.id + "/addReview"}
        rightButtonImage={"/writeReview.svg"}
      />
      <div className="mx-auto flex min-h-[calc(100vh-56px)] max-w-3xl flex-col  bg-white p-4 text-xl font-semibold">
        <div className="font-Suit mb-4 w-full">{printerDetail.company}</div>
        <div className={`${reviews.length > 0 ? " " : "mt-14"}`}>
          {reviews.length > 0 ? (
            reviews
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <Image src={"/noReviews.svg"} width={136} height={102}></Image>
              <div className="font-Suit text-sm">
                아직 등록된 리뷰가 없습니다
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let data;
  let review;
  if (typeof context.query.printerId === "string") {
    data = await printZoneService.findUnique(context.query.printerId);
    review = await replyService.findManyByPrintZoneId(context.query.printerId);
  }
  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
      review: JSON.parse(JSON.stringify(review)),
    },
  };
};
