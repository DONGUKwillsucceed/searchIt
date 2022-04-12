import Advertism from "../common/components/advertisment";
import PrinterList from "../common/components/printerList";
import FindPrinter from "../common/components/findPrinter";
import HeaderLogo from "../common/components/headerLogo";
import Image from "next/image";
import { INearPrinter } from "../common/types/interfaces";
import { useEffect, useState } from "react";
import DistanceOptionButtons from "../common/components/distanceOptionButtons";
import getNearbyPrinter from "../common/api/getNearbyPrinter";
import { useStoreActions, useStoreState } from "../common/utils/globalState";

export default function Index() {
  const nearbyDistance = useStoreState((state) => state.nearbyDistance);
  const setNearbyDistance = useStoreActions(
    (action) => action.setNearbyDistance
  );
  const [nearbyPrinter, setNearbyPrinter] = useState<INearPrinter[]>([]);
  const [hasGeoLoc, setHasGeoLoc] = useState<boolean>(true);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getNearbyPrinter(
            position.coords.latitude,
            position.coords.longitude,
            nearbyDistance
          ).then((res) => {
            setNearbyPrinter(res);
          });
        },
        () => {
          setHasGeoLoc(false);
        }
      );
    }
  }, [nearbyDistance]);

  return (
    <>
      <HeaderLogo />
      <main className="font-Suit flex flex-col items-center overflow-y-auto">
        <div className=" flex w-full flex-col items-center sm:max-w-3xl ">
          {/* <Advertism /> */}

          {/* Find Printer */}
          <div className="mt-2 flex h-fit w-full flex-col justify-between rounded-md p-4 text-lg font-bold sm:w-full">
            <div className="pb-4">프린터 찾기</div>
            <FindPrinter />
          </div>
          {/*PrinterList*/}
          <div className="h-fit  w-full rounded-md p-4 text-lg">
            <div className="mb-3 flex w-full items-center justify-between">
              <div className="mb-1 text-xl font-bold">내 주변 프린터</div>
            </div>
            <DistanceOptionButtons
              nearbyDistance={nearbyDistance}
              setNearbyDistance={setNearbyDistance}
            />
            {hasGeoLoc ? (
              <PrinterList nearbyPrinters={nearbyPrinter} />
            ) : (
              <div className="my-auto mt-20 flex w-full flex-col justify-center">
                <Image src="/noGeoLocation.svg" width={140} height={103} />
                <div className="mt-10 mb-2 text-center font-bold">
                  위치 정보 동의 필요
                </div>
                <div className="text-center">내 주변 프린터를 보려면</div>
                <div className="text-center">위치 정보 동의가 필요해요!</div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
