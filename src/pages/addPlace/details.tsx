import AddFixInfo from "../../common/components/addInfo";
import AddPrinterInfo from "../../common/components/addPrinterInfo";
import Header from "../../common/components/header";
import { PriceBox } from "../../common/components/priceBox";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import {
  A4_PAPER_SIZE_ID,
  OFFICE_PAPER_TYPE_ID,
  PRINT_JOB_TYPE_ID,
} from "../../backend/const";
import { ColorType } from "../../backend/types/ColorType";
import { ReporterTypes } from "../../backend/types/ReporterTypes";

type UserLocation = {
  locationAddress: string;
  pinCoord: {
      lat: number;
      lng: number;
  };
  areacode: string;
};

export default function () {
  const [isDuplex, setIsDuplex] = useState(false);
  const [placeName, setPlaceName] = useState("");
  const [monoPrice, setMonoPrice] = useState("");
  const [colorPrice, setColorPrice] = useState("");
  const [duplexMonoPrice, setDuplexMonoPrice] = useState("");
  const [duplexColorPrice, setDuplexColorPrice] = useState("");

  const router = useRouter();

  console.log(router.query);

  const queryData = router.query.d;

  let userLocation: UserLocation;
  try {
    userLocation = JSON.parse((queryData as string) ?? "") as UserLocation;
    console.log("π ~ file: details.tsx ~ line 46 ~ userLocation", userLocation)
  } catch (e) {
    console.error(e);
  }

  console.log(monoPrice);
  // console.log(colorPrice);
  // console.log(duplexMonoPrice);
  // console.log(duplexColorPrice);
  return (
    <div className="min-h-screen bg-gray-100">
      <Header hasBack={true} isImageTitle={false} title={"μ λ³΄νκΈ°"}></Header>
      <div className="mx-auto flex min-h-[calc(100vh-56px)] max-w-3xl flex-col justify-between bg-white p-4">
        <div>
          <div className="space-y-4">
            <div className="flex items-center space-x-2 font-semibold">
              <div>μ₯μλͺ</div>
              <div className="text-primary text-sm">νμ</div>
            </div>
            <input
              className="w-full rounded-md bg-gray-100 px-4 py-2 text-sm "
              placeholder="μμ²΄μ λͺμΉ­μ μλ ₯ν΄μ£ΌμΈμ"
              onChange={(e) => setPlaceName(e.target.value)}
            ></input>
          </div>

          <div className="my-4">
            <div className="flex items-center space-x-2 font-semibold">
              <div>A4 μΈμ κ°κ²©</div>
              <div className="text-sm text-gray-300">μ ν</div>
            </div>
            <div className="space-y-6">
              <AddPrinterInfo
                fixType="μΈμ"
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
                <div>μλ¨λ©΄ κ°κ²©μ΄ λ¬λΌμ</div>
              </div>
              {isDuplex && (
                <AddPrinterInfo
                  fixType="μΈμ"
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
          value={"μ μΆνκΈ°"}
          onClick={async () => {
            if (!placeName) alert("μ₯μλͺμ μλ ₯ν΄μ£ΌμΈμ");
            else {
              const id = uuidv4();
              const company = placeName;
              const latitude = userLocation.pinCoord.lat;
              const longitude = userLocation.pinCoord.lng;
              const area_code = userLocation.areacode;
              const address_detail = userLocation.locationAddress
                .split(" ")
                .slice(3)
                .join(" ");
              const description = "";
              const tags: string[] = [];
              const services = [];
              if (monoPrice !== "") {
                const svc = {
                  id: uuidv4(),
                  paperSizeId: A4_PAPER_SIZE_ID,
                  paperTypeId: OFFICE_PAPER_TYPE_ID,
                  serviceTypeId: PRINT_JOB_TYPE_ID,
                  printZoneId: id,
                  color_type: ColorType.Mono,
                  price: parseInt(monoPrice),
                  price_duplex_explicit:
                    duplexMonoPrice !== "" ? duplexMonoPrice : undefined,
                };
                services.push(svc);
              }
              if (colorPrice !== "") {
                const svc = {
                  id: uuidv4(),
                  paperSizeId: A4_PAPER_SIZE_ID,
                  paperTypeId: OFFICE_PAPER_TYPE_ID,
                  serviceTypeId: PRINT_JOB_TYPE_ID,
                  printZoneId: id,
                  color_type: ColorType.Color,
                  price: parseInt(colorPrice),
                  price_duplex_explicit:
                    duplexColorPrice !== "" ? duplexColorPrice : undefined,
                };
                services.push(svc);
              }
              const reportedBy = ReporterTypes.User;

              await axios.post("/api/print-zones", {
                id,
                company,
                latitude,
                longitude,
                area_code,
                address_detail,
                description,
                tags,
                services,
                reportedBy,
              });

              router.push("/addPlace/submit");
            }
          }}
        ></input>
      </div>
    </div>
  );
}
