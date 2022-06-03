import AddFixInfo from "../../common/components/addInfo";
import AddPrinterInfo from "../../common/components/addPrinterInfo";
import Header from "../../common/components/header";
import { PriceBox } from "../../common/components/PriceBox";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

export default function () {
  const [isDuplex, setIsDuplex] = useState(false);
  const [placeName, setPlaceName] = useState("");
  const [monoPrice, setMonoPrice] = useState("");
  const [colorPrice, setColorPrice] = useState("");
  const [duplexMonoPrice, setDuplexMonoPrice] = useState("");
  const [duplexColorPrice, setDuplexColorPrice] = useState("");

  const router = useRouter();

  console.log(monoPrice);
  // console.log(colorPrice);
  // console.log(duplexMonoPrice);
  // console.log(duplexColorPrice);
  return (
    <div className="min-h-screen bg-gray-100">
      <Header hasBack={true} isImageTitle={false} title={"제보하기"}></Header>
      <div className="mx-auto flex min-h-[calc(100vh-56px)] max-w-3xl flex-col justify-between bg-white p-4">
        <div>
          <div className="space-y-4">
            <div className="flex items-center space-x-2 font-semibold">
              <div>장소명</div>
              <div className="text-primary text-sm">필수</div>
            </div>
            <input
              className="w-full rounded-md bg-gray-100 px-4 py-2 text-sm "
              placeholder="업체의 명칭을 입력해주세요"
              onChange={(e) => setPlaceName(e.target.value)}
            ></input>
          </div>

          <div className="my-4">
            <div className="flex items-center space-x-2 font-semibold">
              <div>A4 인쇄 가격</div>
              <div className="text-sm text-gray-300">선택</div>
            </div>
            <div className="space-y-6">
              <AddPrinterInfo
                fixType="인쇄"
                setMonoPrice={setMonoPrice}
                setColorPrice={setColorPrice}
              ></AddPrinterInfo>
              <div className="flex items-center space-x-2 text-sm font-semibold text-gray-500">
                <button
                  className={`${
                    isDuplex ? "bg-primary" : "bg-gray-200"
                  } flex items-center rounded-sm p-1 `}
                  onClick={() => setIsDuplex(!isDuplex)}
                >
                  <Image src={"/check.svg"} width={10} height={10} />
                </button>
                <div>양단면 가격이 달라요</div>
              </div>
              {isDuplex && (
                <AddPrinterInfo
                  fixType="인쇄"
                  isDuplex={true}
                  setMonoPrice={setDuplexMonoPrice}
                  setColorPrice={setDuplexColorPrice}
                ></AddPrinterInfo>
              )}
            </div>
          </div>
        </div>
        <input
          className="bg-primary w-full rounded-md p-4 text-white hover:cursor-pointer"
          type="submit"
          value={"제출하기"}
          onClick={() => {
            if (!placeName) alert("장소명을 입력해주세요");
            else {
              router.push("/addPlace/submit");
            }
          }}
        ></input>
      </div>
    </div>
  );
}
