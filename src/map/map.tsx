import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import Logo from "../Images/Logo.svg";
import { IUserLoc } from "../Interfaces";
import UserMarker from "./UserMarker";
import { fetchData } from "../Data/PrinterInfo";

export default function PrinterMap() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  window.addEventListener("resize", () => {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  const [userLoc, setUserLoc] = React.useState<IUserLoc>({
    center: {
      lat: 37.566,
      lng: 126.978,
    },
  });

  fetchData();

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
  }, []);

  return (
    <div>
      <header>
        <nav className="absolute inset-x-0 top-0 z-10 flex h-9 w-full items-center justify-center bg-white shadow-md">
          <Link to="/" className="text-xl text-gray-800">
            <img src={Logo}></img>
          </Link>
        </nav>
      </header>
      <main>
        <Map
          center={userLoc.center}
          style={{ width: "100%", height: "calc(var(--vh, 1vh) * 100" }}
        >
          <UserMarker userLoc={userLoc} />
        </Map>
      </main>

      <footer className="absolute inset-x-0 bottom-0 z-10 flex h-12 w-full justify-evenly border-t-2 bg-white p-2">
        <Link to="/" className="text-gray-500">
          홈
        </Link>
        <Link to="/test" className="text-gray-500">
          지도
        </Link>
      </footer>
    </div>
  );
}
