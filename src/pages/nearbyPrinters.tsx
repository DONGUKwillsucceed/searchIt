import Header from "../common/components/header";
import { useEffect, useState } from "react";
import { INearPrinter } from "../common/types/interfaces";
import Image from "next/image";
import { useStoreState } from "../common/utils/globalState";
import PrinterList from "../common/components/nearbyPrinterList";
import axios from "axios";
import AddNewPlace from "../common/components/addNewPlace";

export default function () {
  const nearbyDistance = useStoreState((state) => state.nearbyDistance);
  const [nearbyPrinter, setNearbyPrinter] = useState<INearPrinter[]>([]);
  const [hasGeoLoc, setHasGeoLoc] = useState<boolean>(true);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          axios
            .get(
              `/api/print-zones/nearest?lat=${position.coords.latitude}&lon=${position.coords.longitude}&km=${nearbyDistance}`
            )
            .then((res) => {
              console.log(res.data);
              setNearbyPrinter(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        },
        () => {
          setHasGeoLoc(false);
        }
      );
    }
  }, [nearbyDistance]);

  console.log(nearbyPrinter.length);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        hasBack={true}
        isArrowBack={true}
        hasRightButton={true}
        rightButtonLink={"/map"}
        title={"내 주변 프린터"}
        rightButtonImage={"/map_black.svg"}
      ></Header>
      <div className="mx-auto flex h-[calc(100vh-56px)] max-w-3xl flex-col justify-between rounded-b-md bg-white p-4">
        {hasGeoLoc ? (
          <div className={`${nearbyPrinter.length > 0 ? "" : "my-auto"}`}>
            {nearbyPrinter.length > 0 ? (
              <div
                className={` max-h-printerList flex flex-col overflow-hidden hover:cursor-pointer  md:max-h-96`}
              >
                {nearbyPrinter.map((printer) => (
                  <PrinterList printer={printer} key={printer.id} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Image src={"/noResult.svg"} width={140} height={104}></Image>
                <div className="text-center">주변에 프린터가 없습니다</div>
              </div>
            )}
          </div>
        ) : (
          // <PrinterList nearbyPrinters={nearbyPrinter} />
          <div className="my-auto mt-20 flex w-full flex-col justify-center">
            <Image src="/noResult.svg" width={140} height={103} />
            <div className="mt-10 mb-2 text-center font-bold">
              위치 정보 동의 필요
            </div>
            <div className="text-center">내 주변 프린터를 보려면</div>
            <div className="text-center">위치 정보 동의가 필요해요!</div>
          </div>
        )}
        <AddNewPlace></AddNewPlace>
      </div>
    </div>
  );
}
