import { useRouter } from "next/router";
import { useState } from "react";
import { IPrinterDetail } from "../../../common/types/interfaces";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getPrinterDetail } from "../../../common/api/getPrinterDetail";

import HeaderReview from "../../../common/components/headerReview";
import Review from "../../../common/components/review";
export default function (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();
  const [printerDetail] = useState<IPrinterDetail>(props.data);
  let reviews: JSX.IntrinsicAttributes[] = [];

  for (let i = 0; i < 15; i++) {
    reviews.push(
      <div>
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
    <>
      <HeaderReview />
      <div className="p-4 text-xl font-semibold">
        <div className="font-Suit my-4 w-full">{printerDetail.name}</div>
        <div>{reviews}</div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await getPrinterDetail(context.query.printerId);

  return { props: { data } };
};
