import HeaderEvent from "../../common/components/headerEvent";
import { useEffect, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { noticeService } from "../../backend/service/Notice.service";
import { INoticeEvent } from "../../common/types/interfaces";
import Link from "next/link";

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
        // console.log(noticeEvent.created_at.slice(0, 10));
      } else {
        setEventList((eventList) => [...eventList, noticeEvent]);
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <HeaderEvent
        title={"공지사항/이벤트"}
        isNotice={isNotice}
        setIsNotice={setIsNotice}
        isEvent={isEvent}
        setIsEvent={setIsEvent}
      ></HeaderEvent>
      <div className="mx-auto h-[calc(100vh-114px)] max-w-3xl bg-white">
        {isNotice ? (
          <div>
            {noticeList.map((notice: INoticeEvent) => (
              <Link key={notice.id} href={`/notice/${notice.id}`}>
                <button className="w-full items-start bg-white  py-4 px-5">
                  <div className="flex justify-start font-medium">
                    {notice.title}
                  </div>
                  <div className="flex justify-start text-sm text-gray-500">
                    {notice.created_at.slice(0, 10)}
                  </div>
                </button>
              </Link>
            ))}
          </div>
        ) : (
          <div>
            {eventList.map((event: INoticeEvent) => (
              <Link key={event.id} href={`notice/${event.id}`}>
                <button className="w-full items-start bg-white  py-4 px-5">
                  <div className="flex justify-start font-medium">
                    {event.title}
                  </div>
                  <div className="flex justify-start text-sm text-gray-500">
                    {event.created_at.slice(0, 10)}
                  </div>
                </button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await noticeService.findMany();
  return { props: { data: JSON.parse(JSON.stringify(data)) } };
};
