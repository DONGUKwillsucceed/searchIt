import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Map, MapMarker, MapTypeControl } from "react-kakao-maps-sdk";
import Logo from "../Images/Logo.svg";
import { IPrinterData, IUserLoc } from "../Interfaces";
import UserMarker from "./UserMarker";
import { FetchPrinterData } from "../API/PrinterInfo";
import PrinterMarker from "./PrinterMarker";
import { MyLocationButton } from "./MyLocationButton";
import { KakaoMapContext } from "react-kakao-maps-sdk/lib/@types/components/Map";
import Header_logo from "../components/Header_Logo";
import Menu from "../components/Menu";

export default function PrinterMap() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  window.addEventListener("resize", () => {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  const [PrinterData, setPrinterData] = React.useState<
    IPrinterData[] | never[]
  >([]);
  const [userLoc, setUserLoc] = React.useState<IUserLoc>({
    center: {
      lat: 37.566,
      lng: 126.978,
    },
    changedCenter: false,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLoc((prev) => ({
          ...prev,
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        }));
      });
    }
    async function getPrinterData() {
      const res = await FetchPrinterData();
      setPrinterData(res);
    }
    getPrinterData();
  }, []);

  // console.log(userLoc);
  return (
    <div>
      <Header_logo />
      <main>
        <Map
          center={userLoc.center}
          style={{ width: "100%", height: "calc(var(--vh, 1vh) * 100" }}
          onCenterChanged={() => {
            setUserLoc(() => ({
              ...userLoc,
              changedCenter: true,
            }));
          }}
          onCreate={(map) => {
            console.log(map);
          }}
        >
          <MyLocationButton userLoc={userLoc} setUserLoc={setUserLoc} />
          <PrinterMarker printerData={PrinterData}></PrinterMarker>
          <UserMarker userLoc={userLoc} />
        </Map>
      </main>

      <Menu currentPage="Map" />
    </div>
  );
}
