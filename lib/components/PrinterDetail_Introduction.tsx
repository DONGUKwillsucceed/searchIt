import { IPrinterDetail } from "../../src/Interfaces";

export default function PrinterDetail_Introduction(props: {
  printerDetail: IPrinterDetail;
  dropDownActive: boolean;
}) {
  return (
    <div className="font-Suit mx-auto mt-4 w-10/12">
      <div className="font-Suit mb-3 text-xs font-bold text-gray-500">
        장소 소개
      </div>
      {props.dropDownActive ? (
        <div className="h-fit whitespace-normal text-gray-500 ">
          {props.printerDetail.description?.split("\n").map((item, index) => {
            return (
              <div key={index} className="text-sm">
                {item}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="max-h-40 overflow-y-hidden whitespace-normal text-gray-500 ">
          {props.printerDetail.description?.split("\n").map((item, index) => {
            return (
              <div key={index} className="text-sm">
                {item}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
