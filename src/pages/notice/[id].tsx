import Header from "../../common/components/header";
import { useEffect, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { noticeService } from "../../backend/service/Notice.service";
import { INoticeEvent } from "../../common/types/interfaces";

type Notice = Awaited<ReturnType<typeof noticeService.findUnique>>
export default function (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [isNotice, setIsNotice] = useState(true);
  const [isEvent, setIsEvent] = useState(false);
  const [noticeEventList, setNoticeEventList] = useState<INoticeEvent[]>([]);
  const [noticeList, setNoticeList] = useState<INoticeEvent[]>([]);
  const [eventList, setEventList] = useState<INoticeEvent[]>([]);

  const notice = props.data as Notice;

  // useEffect(() => {
  //   props.data.map((noticeEvent: INoticeEvent) => {
  //     if (noticeEvent.type === "notice") {
  //       setNoticeList((noticeList) => [...noticeList, noticeEvent]);
  //     } else {
  //       setEventList((eventList) => [...eventList, noticeEvent]);
  //     }
  //   });
  // }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header hasBack={true} title={notice.title}></Header>
      <div className="mx-auto h-[calc(100vh-56px)] max-w-3xl bg-white">
        {notice.content_html}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let data;
  if (typeof context.query.id === "string") {
    data = await noticeService.findUnique(context.query.id);
  }
  return { props: { data } };
};
