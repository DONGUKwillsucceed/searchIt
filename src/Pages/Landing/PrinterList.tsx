import { Link } from "react-router-dom";
import Printer from "../../Images/Printer.svg";

export default function PrinterList() {
  let test: JSX.IntrinsicAttributes[] = [];

  for (let i = 0; i < 10; i++) {
    test.push(
      <div key={i}>
        <div className="mr-2 mb-2 h-full snap-start justify-center rounded-sm border-b-2 py-2">
          <div className="flex">
            <div className="my-5 ml-1 mr-6 flex w-6 items-center justify-center rounded-md">
              <img src={Printer} />
            </div>
            <div className="flex w-full flex-row items-center justify-between ">
              <div className="ml-2 flex h-full flex-col justify-between py-2">
                <div>장소 이름</div>
                <div className="text-xs">거리</div>
              </div>
              <div>color</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className=" font-Suit h-fit w-full rounded-md p-4 text-lg font-bold">
        <div className="mb-3 flex w-full items-center justify-between">
          <div className="mb-1 font-bold">내 주변 프린터</div>
          <div className="bg-primary-light text-primary rounded-md py-1 px-3 text-sm hover:bg-blue-200">
            <Link to="/test">전체 보기</Link>
          </div>
        </div>
        <div
          className="scrollbar-thin sm:scrollbar-thumb-gray-400 flex h-auto snap-x snap-normal flex-col hover:cursor-pointer"
          id="slider"
        >
          {test}
        </div>
      </div>
    </>
  );
}
