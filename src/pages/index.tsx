import Advertism from "../common/components/advertisment";
import PrinterList from "../common/components/printerList";
import FindPrinter from "../common/components/findPrinter";
import Header_logo from "../common/components/header_Logo";
import { INearPrinter } from "../common/types/interfaces";
import { useEffect, useState } from "react";
import GetUserLocation from "../common/utils/getUserLocation";
import DistanceOptionButtons from "../common/components/distanceOptionButtons";
import GetNearbyPrinter from "../common/api/getNearbyPrinter";
import { useRouter } from "next/router";

export default function Index() {
  const [distance, setDistance] = useState<string>("300000");
  const [nearbyPrinter, setNearbyPrinter] = useState<INearPrinter[]>([]);
  const router = useRouter();
  const userLoc = GetUserLocation();

  useEffect(() => {
    if (userLoc) {
      GetNearbyPrinter(userLoc, distance).then((res) => {
        setNearbyPrinter(res);
      });
    }
  }, [distance, userLoc]);

  return (
    <>
      <Header_logo />
      <main className="font-Suit flex flex-col items-center overflow-y-auto">
        <div className=" flex w-full flex-col items-center sm:max-w-3xl ">
          <Advertism />
          {/* Find Printer */}
          <div className="mt-2 flex h-fit w-full flex-col justify-between rounded-md p-4 text-lg font-bold sm:w-full">
            <div className="pb-4">프린터 찾기</div>
            <FindPrinter />
          </div>
          {/*PrinterList*/}
          <div className="h-fit  w-full rounded-md p-4 text-lg font-bold">
            <div className="mb-3 flex w-full items-center justify-between">
              <div className="mb-1 text-xl font-bold">내 주변 프린터</div>
            </div>
            <DistanceOptionButtons
              distance={distance}
              setDistance={setDistance}
            />
            <PrinterList loc={userLoc} nearbyPrinters={nearbyPrinter} />
          </div>
        </div>
      </main>
    </>
  );
}
