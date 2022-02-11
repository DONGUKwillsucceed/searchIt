import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import Logo from "../Images/Logo.svg";

export default function Test() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  window.addEventListener("resize", () => {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  const [userLoc, setUserLoc] = React.useState({
    center: {
      lat: 37.566,
      lng: 126.9784,
    },
    errMsg: "",
    isLoading: true,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLoc((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            isLoading: false,
          }));
        },
        (err) => {
          setUserLoc((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      setUserLoc((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
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
          center={{ lat: 33.5563, lng: 126.79581 }}
          style={{ width: "100%", height: "calc(var(--vh, 1vh) * 100" }}
        >
          {!userLoc.isLoading && (
            <MapMarker
              position={userLoc.center}
              image={{
                options: {
                  className: "w-10 h-10 bg-red-500 rounded-full",
                },
              }}
            ></MapMarker>
          )}
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
