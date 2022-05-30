import Header from "../../common/components/header";
import { useEffect, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { noticeService } from "../../backend/service/Notice.service";
import { INoticeEvent } from "../../common/types/interfaces";

export default function (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [isNotice, setIsNotice] = useState(true);
  const [isEvent, setIsEvent] = useState(false);
  const [noticeEventList, setNoticeEventList] = useState<INoticeEvent[]>([]);
  const [noticeList, setNoticeList] = useState<INoticeEvent[]>([]);
  const [eventList, setEventList] = useState<INoticeEvent[]>([]);

  useEffect(() => {
    props.data.map((noticeEvent: INoticeEvent) => {
      if (noticeEvent.type === "notice") {
        setNoticeList((noticeList) => [...noticeList, noticeEvent]);
      } else {
        setEventList((eventList) => [...eventList, noticeEvent]);
      }
    });
  }, []);

  console.log(JSON.parse(props.data));

  return (
    <div className="min-h-screen bg-gray-100">
      <Header hasBack={true}></Header>
      <div className="mx-auto h-[calc(100vh-56px)] max-w-3xl bg-white">
        test
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let data;
  if (typeof context.query.id === "string") {
    data = await noticeService.findUnique(context.query.id);
  }
  console.log(data);
  return { props: { data: JSON.parse(JSON.stringify(data)) } };
};
