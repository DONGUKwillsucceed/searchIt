import { useRouter } from "next/router";
import { useState } from "react";
import { IPrinterDetail } from "../../../common/types/interfaces";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { printZoneService } from "../../../backend/service/PrintZone.service";
import Review from "../../../common/components/review";
import Header from "../../../common/components/header";
export default function (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();
  const [printerDetail] = useState<IPrinterDetail>(props.data);
  let reviews: JSX.IntrinsicAttributes[] = [];

  for (let i = 0; i < 15; i++) {
    reviews.push(
      <div key={i}>
        <Review
          name={"test " + i}
          content={"test"}
          date={"2022.05.03"}
          state={"test"}
        />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        hasBack={true}
        title={"리뷰"}
        hasRightButton={true}
        rightButtonLink={"/printers/" + printerDetail.id + "/addReview"}
        rightButtonImage={"/writeReview.svg"}
      />
      <div className="mx-auto max-w-3xl bg-white p-4 text-xl font-semibold">
        <div className="font-Suit mb-4 w-full">{printerDetail.company}</div>
        <div>{reviews}</div>
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
