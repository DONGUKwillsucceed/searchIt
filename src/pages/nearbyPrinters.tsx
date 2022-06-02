import Header from "../common/components/header";
import { useEffect, useState } from "react";
import { INearPrinter } from "../common/types/interfaces";
import Image from "next/image";
import { useStoreState } from "../common/utils/globalState";
import PrinterList from "../common/components/printerList";
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
          <PrinterList nearbyPrinters={nearbyPrinter} />
        ) : (
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
