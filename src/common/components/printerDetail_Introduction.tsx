import { IPrinterDetail } from "../types/interfaces";

export default function PrinterDetail_Introduction(props: {
  printerDetail: IPrinterDetail;
  dropDownActive: boolean;
}) {
  return (
    <div className="font-Suit mx-auto mt-4 w-full">
      <div className="font-Suit mb-3 text-xs font-bold text-gray-500">
        장소 소개
      </div>
      <div
        className={` text-gray-500 ${
          props.dropDownActive ? "h-fit" : "max-h-40 overflow-y-hidden"
        }`}
      >
        {props.printerDetail.description?.split("\n").map((item, index) => {
          return (
            <div key={index} className="text-sm">
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}
