import Advertism from "../common/components/advertisment";
import PrinterList from "../common/components/printerList";
import FindPrinter from "../common/components/findPrinter";
import HeaderState from "../common/components/headerState";
import Menu from "../common/components/menu";
import Image from "next/image";
import axios from "axios";
import { INearPrinter } from "../common/types/interfaces";
import { useEffect, useState } from "react";
import { useStoreState } from "../common/utils/globalState";
import Link from "next/link";

export default function Index() {
  const nearbyDistance = useStoreState((state) => state.nearbyDistance);
  const [nearbyPrinter, setNearbyPrinter] = useState<INearPrinter[]>([]);
  const [hasGeoLoc, setHasGeoLoc] = useState<boolean>(true);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          axios
            .get(
              `/api/print-zones/nearest?lat=${position.coords.latitude}&lon=${position.coords.longitude}&km=${nearbyDistance}`
            )
            .then((res) => {
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
    <div className="font-Suit min-h-screen bg-gray-100">
      {openMenu ? <Menu setOpenMenu={setOpenMenu} /> : null}
      <HeaderState
        isImageTitle={true}
        imageTitleUrl={"/logo.svg"}
        stateChanger={setOpenMenu}
        rightButtonImage="/menu.svg"
      />
      <main className="mx-auto max-w-3xl">
        <div className=" flex w-full flex-col items-center sm:max-w-3xl ">
          <Advertism />

          {/* Find Printer */}
          <div className="my-2 flex w-full flex-col rounded-md bg-white p-4">
            <div className="mb-4 text-lg font-bold">프린터 찾기</div>
            <FindPrinter />
          </div>
          {/*PrinterList*/}
          <div className="my-2 h-fit w-full rounded-md bg-white p-4 text-lg">
            <div className="mb-3 flex w-full items-center justify-between">
              <div className="mr mb-1 text-xl font-bold">내 주변 프린터</div>
              <Link href={"/nearbyPrinters"}>
                <button className="flex text-xs font-bold text-gray-500">
                  <div className="mr-2">전체 보기</div>
                  <Image
                    src={"/return.svg"}
                    className="rotate-180"
                    width={6}
                    height={12}
                  ></Image>
                </button>
              </Link>
            </div>
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
          </div>

          <div className="mt-2 flex w-full justify-center rounded-md bg-white p-4 ">
            <button className="text-primary bg-primary/20 mr-4 rounded-md px-3 py-2 text-sm font-semibold">
              제휴문의
            </button>
            <Link href="/addPlace/address">
              <button className="rounded-md bg-gray-100 p-3 py-2 text-sm font-semibold text-gray-500">
                제보하기
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
