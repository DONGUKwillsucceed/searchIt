import Header from "../common/components/header";
import getNearbyPrinter from "../common/api/getNearbyPrinter";
import { useEffect, useState } from "react";
import { INearPrinter } from "../common/types/interfaces";
import Image from "next/image";
import { useStoreState, useStoreActions } from "../common/utils/globalState";
import PrinterList from "../common/components/printerList";

export default function () {
  const nearbyDistance = useStoreState((state) => state.nearbyDistance);
  const setNearbyDistance = useStoreActions(
    (action) => action.setNearbyDistance
  );
  const [nearbyPrinter, setNearbyPrinter] = useState<INearPrinter[]>([]);
  const [hasGeoLoc, setHasGeoLoc] = useState<boolean>(true);
  const [openMenu, setOpenMenu] = useState(false);
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
    <div>
      <Header
        hasBack={true}
        isArrowBack={true}
        hasRightButton={true}
        rightButtonLink={"/map"}
        title={"내 주변 프린터"}
        rightButtonImage={"/map_black.svg"}
      ></Header>
      <div className="px-4">
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
  );
}
