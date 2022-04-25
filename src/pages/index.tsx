import Advertism from "../common/components/advertisment";
import PrinterList from "../common/components/printerList";
import FindPrinter from "../common/components/findPrinter";
import HeaderLogo from "../common/components/headerLogo";
import DistanceOptionButtons from "../common/components/distanceOptionButtons";
import Menu from "../common/components/menu";
import Image from "next/image";
import { INearPrinter } from "../common/types/interfaces";
import { useEffect, useState } from "react";
import getNearbyPrinter from "../common/api/getNearbyPrinter";
import { useStoreActions, useStoreState } from "../common/utils/globalState";

export default function Index() {
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

  console.log(openMenu);
  return (
    <div className="font-Suit min-h-screen bg-gray-100">
      {openMenu ? <Menu setOpenMenu={setOpenMenu} /> : null}
      <HeaderLogo setOpenMenu={setOpenMenu} />
      <main className="mx-auto max-w-3xl">
        <div className=" flex w-full flex-col items-center sm:max-w-3xl ">
          {/* <Advertism /> */}

          {/* Find Printer */}
          <div className="my-2 flex w-full flex-col rounded-md bg-white p-4">
            <div className="mb-4 text-lg font-bold">프린터 찾기</div>
            <FindPrinter />
          </div>
          {/*PrinterList*/}
          <div className="my-2 h-fit w-full rounded-md bg-white p-4 text-lg">
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
    </div>
  );
}
